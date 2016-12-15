var currentFolder = "Inbox";
var currentFilter = null;
var currentSearch = null;
var selectedEmails = [];
var filters = [];

function init() {
	setCurrentFolder("Inbox");
	loadEmail(JSON.parse(localStorage.getItem("email_data"))[99].id) // TODO: change email displayed
}

function loadCurrentList() {
	if (currentFolder) {
		setCurrentFolder(currentFolder);
	} else if (currentFilter) {
		setCurrentFilter(currentFilter);
	} else if (currentSearch) {
		setCurrentSearch();
	}
}

function setCurrentFolder(folder) {
	currentFolder = folder;
	currentFilter = null;
	currentSearch = null;
	loadEmailList(folder, false, false);
}

function setCurrentFilter(filter) {
	currentFolder = null;
	currentFilter = filter;
	currentSearch = null;
	loadEmailList(filter, true, false);
}

function setCurrentSearch() {
	let keyword = document.getElementById("search-bar-input").value;
	currentFolder = null;
	currentFilter = null;
	currentSearch = keyword;
	loadEmailList(keyword, false, true)
}

function loadEmailList(value, isFilter, isSearch) {
	let parent = document.getElementById("email-list");

	var content = null;

	if (isFilter) {
		content = getFilterContent(value);
	} else if (isSearch) {
		content = getSearchContent(value);
	} else {
		content = getFolderContent(value);
	}

	parent.innerHTML = content.innerHTML;
}

function getFolderContent(folderName) {
	let content = document.createElement("div");
	let emails = JSON.parse(localStorage.getItem("email_data"));
	emails.sort(function(a,b) {return (b.datetime > a.datetime) ? 1 : ((a.datetime > b.datetime) ? -1 : 0);} );
	for (var i = 0; i < emails.length; i++) {
		if (emails[i].folder.indexOf(folderName) > -1) {
			var email = createEmailPreview(emails[i]);
			content.appendChild(email);
		}
	}

	return content;
}

function getFilterContent(filterName) {
	var filter = filters.filter(function(obj) {
	    return obj.name === filterName; // Filter out the appropriate one
	})[0];

	let content = document.createElement("div");
	let emails = JSON.parse(localStorage.getItem("email_data"));
	emails.sort(function(a,b) {return (b.datetime > a.datetime) ? 1 : ((a.datetime > b.datetime) ? -1 : 0);} );
	for (var i = 0; i < emails.length; i++) {
		var inFilter = true;
		for (var j = 0; j < filter.filterBy.length; j++) {
			var filterBy = filter.filterBy[j];
			var current = emails[i];
			var type = filterBy.type;
			if (!current[type].includes(filterBy.keyword)) inFilter = false;
		}

		if (!inFilter) continue;

		var email = createEmailPreview(emails[i]);
		content.appendChild(email);
	}

	return content;
}

function getSearchContent(keyword) {
	let content = document.createElement("div");

	var keywords = keyword.split(" ");
	let emails = JSON.parse(localStorage.getItem("email_data"));
	emails.sort(function(a,b) {return (b.datetime > a.datetime) ? 1 : ((a.datetime > b.datetime) ? -1 : 0);} );

	for (var i = 0; i < emails.length; i++) {
		var inSearch = false;
		for (var j = 0; j < keywords.length; j++) {
			var word = keywords[j];
			var email = JSON.stringify(emails[i]);
			if (email.includes(word)) inSearch = true;
		}

		if (!inSearch) continue;

		var email = createEmailPreview(emails[i]);
		content.appendChild(email);
	}

	return content;

}

function createEmailPreview(email) {
	let preview = document.createElement("div");
	let container = document.createElement("div");
	let date = document.createElement("span");
	let name = document.createElement("span");
	let subject = document.createElement("span");
	let content = document.createElement("span");

	let checkbox = document.createElement("span");
	checkbox.className = "message-preview-select";
	checkbox.setAttribute("onchange", "toggleCheckbox(" + email.id + ")");

	let input = document.createElement("input");
	input.setAttribute("type", "checkbox")
	checkbox.appendChild(input);

	date.innerHTML = email.datetime;
	name.innerHTML = email.first_name_from + " " + email.last_name_from;
	subject.innerHTML = email.subject;
	content.innerHTML = email.content;

	container.className = (email.read) ? "message-preview":"message-preview unread";
	container.setAttribute("onclick", "loadEmail(" + email.id + ")");
	date.className = "message-preview-date";
	name.className = "message-preview-name";
	subject.className = "message-preview-subject";
	content.className = "message-preview-content";

	container.appendChild(date);
	container.appendChild(name);
	container.appendChild(subject);

	if (email.flagged) {
		let flagged = document.createElement("span");
		flagged.className = "message-preview-flagged";
		flagged.innerHTML = "<i class=\"fa fa-flag message-preview-icon\"></i>"
		container.appendChild(flagged);
	}

	container.appendChild(content);

	preview.appendChild(checkbox);
	preview.appendChild(container);

	return preview;
}

function toggleCheckbox(id) {
	var index = selectedEmails.indexOf(id);

	if (index > -1) {
		selectedEmails.splice(index, 1);
	} else {
		selectedEmails.push(id);
	}

	toggleIcons();
}

function loadEmail(id) {
	var email = getEmail(id);
	if (!email.read) markAsRead(id, email);
	let flag = document.getElementById("content-message-flagged");
	flag.setAttribute("onclick", "toggleFlagged(" + email.id + ")");
	if (email.flagged) {
		flag.classList.remove("fa-flag-o");
		flag.classList.add("fa-flag");
	} else {
		flag.classList.remove("fa-flag");
		flag.classList.add("fa-flag-o");
	}

	let subject = document.querySelector("#content-panel .content-message-subject");
	let name = document.querySelector("#content-panel .content-message-sender");
	let date = document.querySelector("#content-panel .content-message-date");
	let temail = document.querySelector("#content-panel .content-message-email");
	let content = document.querySelector("#content-panel .content-message-content");

	subject.innerHTML = email.subject;
	subject.title = email.subject;
	name.innerHTML = email.first_name_from + " " + email.last_name_from + " "
	+ "<span class='content-message-sender-email'>" + email.from + "</span>";
	date.innerHTML = email.datetime;
	temail.innerHTML = "To: " + email.to;
	content.innerHTML = email.content;
}

function getEmail(id) {
	let emails = JSON.parse(localStorage.getItem("email_data"));
	let email;
	for (var i = 0; i < emails.length; i++) {
		if (emails[i].id == id) {
			email = emails[i];
			break;
		}
	}

	return email;
}

function setEmail(id, email) {
	let emails = JSON.parse(localStorage.getItem("email_data"));
	var result = emails.filter(function(obj) {
	    return obj.id === id; // Filter out the appropriate one
	})[0];
	var index = emails.indexOf(result);

	emails[index] = email;
	localStorage.setItem("email_data", JSON.stringify(emails));
	loadCurrentList();
}

function createFilter() {
	var filter = {
		name: null,
		filterBy: []
	}

	filter.name = document.getElementById('create-filter-name').value;
	if (document.getElementById('create-filter-by-subject').checked) {
		filter.filterBy.push({
			type: 'subject',
			keyword: document.getElementById('create-filter-subject').value
		})
	}

	if (document.getElementById('create-filter-by-message').checked) {
		filter.filterBy.push({
			type: 'content',
			keyword: document.getElementById('create-filter-message').value
		})
	}

	if (document.getElementById('create-filter-by-sender').checked) {
		filter.filterBy.push({
			type: 'from',
			keyword: document.getElementById('create-filter-sender').value
		})
	}

	filters.push(filter);

	let parent = document.getElementById('folder-panel-filters-items');

	let div = document.createElement('div');
	div.classList.add('folder-panel-list-item');
	let span = document.createElement('span');
	span.classList.add("folder-panel-list-item-nav");
	span.innerHTML = filter.name;
	span.setAttribute("onclick", "setCurrentFilter('" + filter.name + "')");

	div.appendChild(span);
	parent.appendChild(div);

	closeModal('modal-create-filter');
}

function markSelectedAsUnread() {
	var emails = JSON.parse(localStorage.getItem("email_data"));
	for (var i = 0; i < selectedEmails.length; i++) {
		for (var j = 0; j < emails.length; j++) {
			if(selectedEmails[i] === emails[j].id) {
				emails[j].read = false;
				break;
			}
		}
	}

	localStorage.setItem("email_data", JSON.stringify(emails));
	selectedEmails = [];
	toggleIcons();
	loadCurrentList();
}

function markSelectedAsRead() {
	var emails = JSON.parse(localStorage.getItem("email_data"));
	for (var i = 0; i < selectedEmails.length; i++) {
		for (var j = 0; j < emails.length; j++) {
			if(selectedEmails[i] === emails[j].id) {
				emails[j].read = true;
				break;
			}
		}
	}

	localStorage.setItem("email_data", JSON.stringify(emails));
	selectedEmails = [];
	toggleIcons();
	loadCurrentList();
}

function markAsRead(id, email) {
	var emails = JSON.parse(localStorage.getItem("email_data"));
	var result = emails.filter(function(obj) {
	    return obj.id === id; // Filter out the appropriate one
	})[0];
	var index = emails.indexOf(result);
	emails[index].read = true;

	localStorage.setItem("email_data", JSON.stringify(emails));

	loadCurrentList();
}

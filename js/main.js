var selectedEmails = [];
var filters = [];

function init() {
	loadEmailList("Inbox", false);
	loadEmail(JSON.parse(localStorage.getItem("email_data"))[0].id) // TODO: change email displayed
}

function setCurrentFolder(folder) {
	loadEmailList(folder, false);
}

function setCurrentFilter(filter) {
	loadEmailList(filter, true);
}

function loadEmailList(name, isFilter) {
	let parent = document.getElementById("email-list");

	var content = null;

	if (isFilter) {
		content = getFilterContent(name);
	} else {
		content = getFolderContent(name);
	}

	parent.innerHTML = content.innerHTML;
}

function getFolderContent(folder) {
	let content = document.createElement("div");
	let emails = JSON.parse(localStorage.getItem("email_data"));
	emails.sort(function(a,b) {return (b.datetime > a.datetime) ? 1 : ((a.datetime > b.datetime) ? -1 : 0);} );
	for (var i = 0; i < emails.length; i++) {
		if (emails[i].folder.indexOf(folder) > -1) {
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
			console.log(current)
			var type = filterBy.type;
			if (!current[type].includes(filterBy.keyword)) inFilter = false;
		}

		if (!inFilter) continue;

		var email = createEmailPreview(emails[i]);
		content.appendChild(email);
	}

	return content;
}

function createEmailPreview(email) {
	let preview = document.createElement("div");
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

	preview.className = "message-preview";
	preview.setAttribute("onclick", "loadEmail(" + email.id + ")");
	date.className = "message-preview-date";
	name.className = "message-preview-name";
	subject.className = "message-preview-subject";
	content.className = "message-preview-content";

	preview.appendChild(checkbox);
	preview.appendChild(date);
	preview.appendChild(name);
	preview.appendChild(subject);
	preview.appendChild(content);

	return preview;
}

function toggleCheckbox(id) {
	var index = selectedEmails.indexOf(id);

	if (index > -1) {
		selectedEmails.splice(index, 1);
	} else {
		selectedEmails.push(id);
	}

	if (selectedEmails.length > 0) {
		document.getElementById("folder-panel-move").classList.remove("disabled");
		document.getElementById("folder-panel-mark-unread").classList.remove("disabled");
		document.getElementById("folder-panel-mark-read").classList.remove("disabled");
		document.getElementById("folder-panel-delete").classList.remove("disabled");
	} else {
		document.getElementById("folder-panel-move").classList.add("disabled");
		document.getElementById("folder-panel-mark-unread").classList.add("disabled");
		document.getElementById("folder-panel-mark-read").classList.add("disabled");
		document.getElementById("folder-panel-delete").classList.add("disabled");
	}
}

function loadEmail(id) {
	var email = getCurrentEmail(id);
	// if (!email.read) markAsRead(id, email);

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

function getCurrentEmail(id) {
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

// function markAsRead(id, email) {
// 	emails = JSON.parse(localStorage.getItem("email_data"));
// 	var result = emails.filter(function(obj) {
// 	    return obj.id === id; // Filter out the appropriate one
// 	})[0];
// 	var index = emails.indexOf(result);

// 	result.read = true;
// 	loadEmailList();
// }

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
	selectedEmails = [];
	toggleIcons();

	if (currentFolder) {
		setCurrentFolder(currentFolder);
	} else if (currentFilter) {
		setCurrentFilter(currentFilter);
	} else if (currentSearch) {
		setCurrentSearch();
	}
}

function setFolderName(value) {
	var folder = document.getElementById("current-folder");
	folder.innerHTML = value;
}

function setCurrentFolder(folder) {
	currentFolder = folder;
	currentFilter = null;
	currentSearch = null;
	loadEmailList(folder, false, false);
	setFolderName(folder);
}

function setCurrentFilter(filter) {
	currentFolder = null;
	currentFilter = filter;
	currentSearch = null;
	loadEmailList(filter, true, false);
	setFolderName("Filter: " + filter);
}

function setCurrentSearch() {
	let keyword = document.getElementById("search-bar-input").value;
	currentFolder = null;
	currentFilter = null;
	currentSearch = keyword;
	loadEmailList(keyword, false, true)
	setFolderName("Search: " + keyword)
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
	updateCounts(emails);

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
	updateCounts(emails);
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
	updateCounts(emails);
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
	// save the email id in the content message header.
	subject.setAttribute("email_id", email.id);
	name.innerHTML = email.first_name_from + " " + email.last_name_from + " "
	+ "<span class='content-message-sender-email'>" + email.from + "</span>";
	date.innerHTML = email.datetime;
	temail.innerHTML = "To: " + email.to;
	content.innerHTML = email.content;
}


function forward() {
	var email_id = document.querySelector("#content-panel .content-message-subject").getAttribute("email_id");
	var email = getEmail(email_id);
	var composeState = "Forward";
	showCompose(composeState);
	formatForward(email);
}


function formatForward(email) {
	var subject = document.getElementById("compose-subject");
	var content = document.getElementById("compose-content");

	subject.value = "FW: " + email.subject;

	var prevDate = new Date(email.datetime);
	content.value = "\r\r\r----------------\r"
		+ "FORWARDED MESSAGE\r"
		+ "From: " + email.first_name_from + " " + email.last_name_from + "<" + email.from +">" +"\r"
		+ "Date: " + prevDate + "\r"
		+ "Subject: " + email.subject + "\r"
		+ "To: " + email.to
		+ "\r----------------"
		+  "\r\r\r"
		+ email.content;
	// console.log()

}

// functions for reply, reply-all, forward buttons
function reply(replyAll=false) {
	var email_id = document.querySelector("#content-panel .content-message-subject").getAttribute("email_id");
	var email = getEmail(email_id);
	var composeState = "Reply";
	if(replyAll) {
		composeState = "Reply-All";
	}
	showCompose(composeState);
	formatReply(email, replyAll, false);
}

function formatReply(email, replyAll) {
	var temail = document.getElementById("compose-to");
	var subject = document.getElementById("compose-subject");
	var cc = document.getElementById("compose-cc");
	var bcc = document.getElementById("compose-bcc");
	var content = document.getElementById("compose-content");

	if(replyAll) {
		cc.value = email.cc;
		bcc.value = email.bcc;
	}

	temail.value = email.from;
	subject.value = "RE: " + email.subject;

	var prevDate = new Date(email.datetime);
	content.value = "\r\r\r----------------\r"
		+ "On "
		+ prevDate
		+ " "
		+ email.first_name_from + " " + email.last_name_from + "<" + email.from + "> wrote:"
		+ "\r----------------"
		+  "\r\r\r"
		+ email.content;
	// console.log()

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

function setEmail(id, email, notification) {
	let emails = JSON.parse(localStorage.getItem("email_data"));
	var result = emails.filter(function(obj) {
	    return obj.id == id; // Filter out the appropriate one
	})[0];
	var index = emails.indexOf(result);

	emails[index] = email;
	localStorage.setItem("email_data", JSON.stringify(emails));
	loadCurrentList();

	if (notification) showNotification(notification);
}

function createFilter() {
	var error = document.getElementById('modal-create-filter-error');
	error.classList.add("hidden");

	var filter = {
		name: null,
		filterBy: []
	}

	var filterName = document.getElementById('create-filter-name').value
	var existingFilter = filters.filter(function(obj) {
	    return obj.name === filterName; // Filter out the appropriate one
	})[0];


	if (filterName && !existingFilter) {
		var filterBySubject = document.getElementById('create-filter-by-subject');
		var filterByMessage = document.getElementById('create-filter-by-message');
		var filterBySender = document.getElementById('create-filter-by-sender');

		filter.name = filterName;
		if (filterBySubject.checked) {
			var filterSubject = document.getElementById('create-filter-subject').value;
			if (filterSubject != "") {
				filter.filterBy.push({
					type: 'subject',
					keyword: filterSubject
				})
			} else {
				error.classList.remove("hidden");
				document.getElementById('modal-create-filter-error-value').innerHTML = "Error: Please enter a keyword for subject."
				return;
			}
		}
		if (filterByMessage.checked) {
			var filterMessage = document.getElementById('create-filter-message').value;
			if (filterMessage != "") {
				filter.filterBy.push({
					type: 'content',
					keyword: filterMessage
				})
			} else {
				error.classList.remove("hidden");
				document.getElementById('modal-create-filter-error-value').innerHTML = "Error: Please enter a keyword for message."
				return;
			}
		}

		if (!filterBySubject.checked && !filterByMessage.checked && !filterBySender.checked) {
			error.classList.remove("hidden");
			document.getElementById('modal-create-filter-error-value').innerHTML = "Error: Please select a method of filtering."
			return;
		}

		if (filterBySender.checked) {
			var filterSender = document.getElementById('create-filter-sender').value;
			if (filterSender != "") {
				filter.filterBy.push({
					type: 'from',
					keyword: filterSender
				})
			} else {
				error.classList.remove("hidden");
				document.getElementById('modal-create-filter-error-value').innerHTML = "Error: Please enter a keyword for sender."
				return;
			}
		}

		filters.push(filter);

		let parent = document.getElementById('folder-panel-filters-items');

		let div = document.createElement('div');
		div.classList.add('folder-panel-list-item');
		div.id = "filter-" + filter.name;
		let span = document.createElement('span');
		span.classList.add("folder-panel-list-item-nav");
		span.innerHTML = filter.name;
		span.setAttribute("onclick", "setCurrentFilter('" + filter.name + "')");
		let remove = document.createElement('span');
		remove.classList.add("right");
		remove.setAttribute("onclick", "removeFilter('" + filter.name + "')");
		remove.innerHTML = "<i class=\"fa fa-lg fa-times\"></i>"

		div.appendChild(span);
		div.appendChild(remove);
		parent.appendChild(div);

		closeModal('modal-create-filter');
	} else if (existingFilter) {
		error.classList.remove("hidden");
		document.getElementById('modal-create-filter-error-value').innerHTML = "Error: Please select a unique name for your filter."
	} else {
		error.classList.remove("hidden");
		document.getElementById('modal-create-filter-error-value').innerHTML = "Error: Please select a name for your filter."
	}

}

function removeFilter(filter) {
	for(var i = 0; i < filters.length; i++) {
	    if(filters[i].name === filter) {
	        filters.splice(i, 1);
	        break;
	    }
	}

	document.getElementById("filter-"+filter).remove();
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

function updateCounts(emails) {
	var inbox = 0;
	var drafts = 0;
	var flagged = 0;
	var deleted = 0;
	var spam = 0;

	for (var i = emails.length - 1; i >= 0; i--) {
		var folders = emails[i].folder
		for (var j = folders.length - 1; j >= 0; j--) {
			if(folders[j] == "Inbox") inbox++;
			else if(folders[j] == "Drafts") drafts++;
			else if(folders[j] == "Flagged") flagged++;
			else if(folders[j] == "Deleted") deleted++;
			else if(folders[j] == "Spam") spam++;
		}
	}

	document.getElementById("inbox-count").innerHTML = inbox;
	document.getElementById("drafts-count").innerHTML = drafts;
	document.getElementById("flagged-count").innerHTML = flagged;
	document.getElementById("deleted-count").innerHTML = deleted;
	document.getElementById("spam-count").innerHTML = spam;
}

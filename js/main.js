function loadEmailList() {
	let parent = document.getElementById("email-list");
	let emails = JSON.parse(localStorage.getItem("email_data"));
	for (var i = 0; i < emails.length; i++) {
		let email = document.createElement("div");
		let date = document.createElement("span");
		let name = document.createElement("span");
		let subject = document.createElement("span");
		let content = document.createElement("span");

		date.innerHTML = emails[i].datetime;
		name.innerHTML = emails[i].first_name_from + " " + emails[i].last_name_from;
		subject.innerHTML = emails[i].subject;
		content.innerHTML = emails[i].content;

		email.className = "message-preview";
		email.setAttribute("onclick", "loadEmail(" + emails[i].id + ")");
		date.className = "message-preview-date";
		name.className = "message-preview-name";
		subject.className = "message-preview-subject";
		content.className = "message-preview-content";

		email.appendChild(date);
		email.appendChild(name);
		email.appendChild(subject);
		email.appendChild(content);

		parent.appendChild(email);
	}
}

function loadEmail(id) {
	let emails = JSON.parse(localStorage.getItem("email_data"));
	let email;
	for (var i = 0; i < emails.length; i++) {
		if (emails[i].id == id) {
			email = emails[i];
			break;
		}
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

function composeEmail() {
	let datetime = new Date();
	datetime = datetime.toLocaleString();

	let emails = JSON.parse(localStorage.getItem("email_data"));
	let id = emails[emails.length - 1].id;
	id = id + 1;

	let email = {
		id: id,
		to: document.getElementById("to").value,
		from: document.getElementById("from").value,
		subject: document.getElementById("subject").value,
		content: document.getElementById("content").value,
		datetime: datetime,
		folder: ["Sent"]
	};

	emails.push(email);
	localstorage.setItem("email_data", JSON.stringify(emails));
}

loadEmailList();
loadEmail(JSON.parse(localStorage.getItem("email_data"))[0].id)

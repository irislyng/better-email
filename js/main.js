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
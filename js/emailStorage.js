// isSent is a boolean to say whether sent or if in drafts
function store(isSent){
	var email = {
		id: null,
		first_name: null,
		last_name: null,
		to: null,
		first_name_from: "Bob",
		last_name_from: "Smith",
		from: "bob_smith@mcmaster.ca",
		subject: null,
		content: null,
		datetime: null,
		folder: [],
		read: true,
		deleted: false,

	}

	var current = JSON.parse(localStorage.getItem("email_data"));

	var new_id = current[current.length-1].id + 1;
	email.id = new_id;
  	email.to = document.getElementById("compose-to").value;
  	email.subject = document.getElementById("compose-subject").value;
  	email.content = document.getElementById("compose-content").value;

	// 2016-02-17 22:05:45
	var DateTime = new Date();
	var year = DateTime.getFullYear();
	var month = DateTime.getMonth() + 1;
	var day = DateTime.getDate();
	var hour = DateTime.getHours();
	var dd = "AM";

	if (hour >= 12) {
        hour = hour - 12;
        hour = "0" + hour;
        dd = "PM";
    } else if (hour == 0) {
        hour = 12;
    }

	email.datetime =  year + "-" +
				month + "-" +
				day + " " +
				hour + ":" +
				DateTime.getMinutes() + " " + dd;

	if(isSent){
		email.folder.push("Sent");
	} else {
		email.folder.push("Drafts");
	}

	current.unshift(email);
	console.log(email);

	localStorage.setItem("email_data", JSON.stringify(current));
	loadEmailList();
	hideCompose();
}

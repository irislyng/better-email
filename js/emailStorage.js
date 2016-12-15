// isSent is a boolean to say whether sent or if in drafts
function store(isSent){
	var notificationValue = null;

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
	var minutes = DateTime.getMinutes();
	var dd = "AM";

	if (hour >= 12) {
        hour = hour - 12;
        if (hour < 10) hour = "0" + hour;
        dd = "PM";
    } else if (hour == 0) {
        hour = 12;
    }

    if (minutes < 10) {
    	minutes = "0" + minutes;
    }

	email.datetime =  year + "-" +
				month + "-" +
				day + " " +
				hour + ":" +
				minutes + " "+ dd;

	if(isSent){
		email.folder.push("Sent");
		notificationValue = "Your email has been successfully sent!"
	} else {
		email.folder.push("Drafts");
		notificationValue = "Your email has been saved in \"Drafts\"!"
	}

	current.push(email);
	console.log(email);

	localStorage.setItem("email_data", JSON.stringify(current));
	setCurrentFolder("Inbox");
	showNotification(notificationValue);
	hideCompose();
}

function showNotification(value) {
	var notification = document.getElementById("notification");
	notification.classList.remove("hidden");

	var content = document.getElementById("notification-content");
	content.innerHTML = value;

	setInterval(function(){
		notification.classList.add("hidden");
	}, 1500);
}

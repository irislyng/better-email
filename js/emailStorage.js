function store(){
	var newHash = {};
	var current = JSON.parse(localStorage.getItem("email_data"));
	
	var new_id = current.length+1;
	newHash["id"] = new_id;
	
	var FirstName = null;
	newHash["first_name"] = FirstName;
	
	var LastName = null;
	newHash["last_name"] = LastName;
	
    var EmailTo = document.getElementById("compose-to");
    newHash["to"] = EmailTo;
	
	var FirstNameFrom = null;
	newHash["first_name_from"] = FirstNameFrom;
	
	var LastNameFrom = null;
	newHash["last_name_from"] = LastNameFrom;
	
    var EmailFrom = null;
    newHash["from"] = EmailFrom;
	
	var EmailSubject = document.getElementById("compose-subject");
    newHash["subject"] = EmailSubject;
	
	var EmailContent = document.getElementById("compose-content");
	newHash["content"] = EmailContent;
	
	var DateTime = null;
	newHash["datetime"] = DateTime;
	
	newHash["folder"] = "Sent";
	
	current.append(newHash);
	console.log(newHash);
	
	localStorage.setItem("email_data", JSON.stringify(current));
	
    }
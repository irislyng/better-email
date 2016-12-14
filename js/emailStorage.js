// send is a boolean to say whether sent or if in drafts
function store(send){
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
  newHash["from"] = "bob_smith@mcmaster.ca";
	
	var EmailSubject = document.getElementById("compose-subject");
  newHash["subject"] = EmailSubject;
	
	var EmailContent = document.getElementById("compose-content");
	newHash["content"] = EmailContent;
	

	// 2016-02-17 22:05:45
	var DateTime = new Date();
	DateTime = DateTime.getFullYear()+"-"+DateTime.getMonth()+1+"-"+DateTime.getDate()+" "+DateTime.getHours()+":"+DateTime.getMinutes()+":"+DateTime.getSeconds();
	newHash["datetime"] = DateTime;
	
	if(send){ 
		newHash["folder"] = ["Sent"];
	} else {
		newHash["folder"] = ["Drafts"];
	}
	
	current.push(newHash);
	console.log(newHash);
	
	localStorage.setItem("email_data", JSON.stringify(current));
	
}
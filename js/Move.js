function MoveToSpam() {
	
	var current = JSON.parse(localStorage.getItem("email_data"));
	
	if(selectedEmails.length > 0){
		for(var i = 0; i < selectedEmails.length; i++){
			var temp = current[selectedEmails[i]-1][folder];
			if(temp[0] == "Inbox"){
				temp[0] = "Spam";
			}
		}
	}
}

function MoveToInbox() {
	
	var current = JSON.parse(localStorage.getItem("email_data"));
	
	if(selectedEmails.length > 0){
		for(var i = 0; i < selectedEmails.length; i++){
			var temp = current[selectedEmails[i]-1][folder];
			if(temp[0] == "Spam"){
				temp[0] = "Inbox";
			}
		}
	}
}

function MoveToDeleted() {
	
	var current = JSON.parse(localStorage.getItem("email_data"));
	
	if(selectedEmails.length > 0){
		for(var i = 0; i < selectedEmails.length; i++){
			var temp = current[selectedEmails[i]-1][folder];
			if(temp[0] == "Inbox"){
				temp[0] = "Deleted";
			}
		}
	}
}
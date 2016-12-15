function MoveToSpam() {
	
	var current = JSON.parse(localStorage.getItem("email_data"));
	
	if(selectedEmails.length > 0){
		for(var i = 0; i < selectedEmails.length; i++){
			var temp = current[selectedEmails[i]-1]["folder"];
			
			if(temp[0] == "Inbox"){
				current[selectedEmails[i]-1]["folder"] = ["Spam"];
			}
		}
	}
	
	localStorage.setItem("email_data", JSON.stringify(current));
	
	loadCurrentList();
	
}

function MoveToInbox() {
	
	var current = JSON.parse(localStorage.getItem("email_data"));
	
	if(selectedEmails.length > 0){
		for(var i = 0; i < selectedEmails.length; i++){
			var temp = current[selectedEmails[i]-1]["folder"];
			
			if(temp[0] == "Spam"){
				current[selectedEmails[i]-1]["folder"] = ["Inbox"];
			}
		}
	}
	
	localStorage.setItem("email_data", JSON.stringify(current));
	
	loadCurrentList();
	
}


function deleteCurrent() {
	var email_id = document.querySelector("#content-panel .content-message-subject").getAttribute("email_id");
	console.log(email_id);
	MoveToDeleted(email_id);
}


function MoveToDeleted(email_id=0) {
	
	if(email_id != 0) {
		selectedEmails.push(email_id);
		console.log(email_id);
	}
	
	var current = JSON.parse(localStorage.getItem("email_data"));
	
	if(selectedEmails.length > 0){
		for(var i = 0; i < selectedEmails.length; i++){
			var temp = current[selectedEmails[i]-1]["folder"];

			if(temp == "Inbox"){
				current[selectedEmails[i]-1]["folder"] = ["Deleted"];
				current[selectedEmails[i]-1]["deleted"] = true;
			}
		}
	}
	
	localStorage.setItem("email_data", JSON.stringify(current));
	
	loadCurrentList();
	
}

function MoveDecision() {
	
	var option = document.getElementById("move-to-folder");
	
	if(option.value == "inbox"){
		MoveToInbox();
	} else {
		MoveToSpam();
	}
	
}
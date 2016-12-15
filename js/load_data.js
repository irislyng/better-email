
function loadTestData() {
		localStorage.setItem("email_data", JSON.stringify(email_data));
}

loadTestData();



function addBccCc() {
	email_data.forEach(function(element) {
		element["cc"] = "";
		element["bcc"] = ""
	});
}
function moveEmails() {
    var e = document.getElementById("modal-move-select");
    var folder = e.options[e.selectedIndex].text;

    var emails = JSON.parse(localStorage.getItem("email_data"));
    for (var i = 0; i < selectedEmails.length; i++) {
        for (var j = 0; j < emails.length; j++) {
            if(selectedEmails[i] === emails[j].id) {
                var currentIndex = emails[j].folder.indexOf(currentFolder);
                emails[j].folder.splice(currentIndex, 1);
                emails[j].folder.push(folder);

                if (folder == "Deleted") {
                    emails[j].deleted = true;
                }
            }
        }
    }

    localStorage.setItem("email_data", JSON.stringify(emails));
    closeModal('modal-move');

    selectedEmails = [];
    toggleIcons();

    loadCurrentList();

    showNotification("Your emails have been moved to " + folder + "!");
}

function deleteEmail() {
    var email_id = document.querySelector("#content-panel .content-message-subject").getAttribute("email_id");
    console.log(email_id)
    var email = getEmail(email_id);
    console.log(email)

    email.deleted = true;
    if (email.flagged) {
        email.folder = ['Flagged', 'Deleted']
    } else {
        email.folder = ['Deleted']
    }

    setEmail(email_id, email);

    showNotification("Your email has been moved to \"Deleted\"!");
}

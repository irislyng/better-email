function showCompose() {
    var message = document.getElementById('content-panel');
    message.classList.add("hidden");
    var compose = document.getElementById('content-panel-compose');
    compose.classList.remove("hidden");
}

function hideCompose() {
    var message = document.getElementById('content-panel');
    message.classList.remove("hidden");

    var compose = document.getElementById('content-panel-compose');
    compose.classList.add("hidden");

    document.getElementById('compose-to').value = "";
    document.getElementById('compose-cc').value = "";
    document.getElementById('compose-bcc').value = "";
    document.getElementById('compose-subject').value = "";
    document.getElementById('compose-content').value = "";
}

function toggleFlagged(id) {
    var email = getCurrentEmail(id);
    var flag = document.getElementById("content-message-flagged");
    var flagged = null;

    if (flag.classList.contains("fa-flag")) {
        flag.classList.add("fa-flag-o");
        flag.classList.remove("fa-flag");
        flagged = false;
    } else if (flag.classList.contains("fa-flag-o")) {
        flag.classList.add("fa-flag");
        flag.classList.remove("fa-flag-o");
        flagged = true;
    }

    if (flagged) {
        email.folder.push("Flagged");
    } else {
        var index = email.folder.indexOf("Flagged");
        if (index > -1) email.folder.splice(index, 1);
    }

    email.flagged = flagged;

    setCurrentEmail(id, email);
}

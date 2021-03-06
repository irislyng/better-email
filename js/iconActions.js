function showCompose(messageState) {
    // messageState is just a string to say whether it is composing,
    // replying or forwarding
    var message = document.getElementById('content-panel');
    message.classList.add("hidden");
    var compose = document.getElementById('content-panel-compose');
    compose.classList.remove("hidden");

    var title = document.querySelector('#content-panel-compose .compose-title');
    title.innerHTML = messageState + " Email"
}

function hideCompose() {
    var message = document.getElementById('content-panel');
    message.classList.remove("hidden");

    var compose = document.getElementById('content-panel-compose');
    compose.classList.add("hidden");

    var error = document.getElementById('compose-error');
    error.classList.add("hidden");

    document.getElementById('compose-to').value = "";
    document.getElementById('compose-cc').value = "";
    document.getElementById('compose-bcc').value = "";
    document.getElementById('compose-subject').value = "";
    document.getElementById('compose-content').value = "";
}

function toggleFlagged(id) {
    var email = getEmail(id);
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

    setEmail(id, email, false);
}

function toggleIcons() {
    if (selectedEmails.length > 0) {
        var moveIcon = document.getElementById("folder-panel-move");
        moveIcon.classList.remove("disabled");
        moveIcon.setAttribute("onclick", "showModal('modal-move');");
        document.getElementById("folder-panel-mark-unread").classList.remove("disabled");
        document.getElementById("folder-panel-mark-read").classList.remove("disabled");
        var deleteIcon = document.getElementById("folder-panel-delete");
        deleteIcon.classList.remove("disabled");
        deleteIcon.setAttribute("onclick", "deleteEmail();");
    } else {
        var moveIcon = document.getElementById("folder-panel-move");
        moveIcon.classList.add("disabled");
        moveIcon.removeAttribute("onclick");
        document.getElementById("folder-panel-mark-unread").classList.add("disabled");
        document.getElementById("folder-panel-mark-read").classList.add("disabled");
        var deleteIcon = document.getElementById("folder-panel-delete");
        deleteIcon.classList.add("disabled");
        deleteIcon.removeAttribute("onclick");
    }
}

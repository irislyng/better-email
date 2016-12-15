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

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

    document.getElementById('compose-email').reset();
}

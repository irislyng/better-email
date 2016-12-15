function showModal(id) {
    var modal = document.getElementById(id);
    modal.classList.remove("hidden");
}

function closeModal(id) {
    var modal = document.getElementById(id);
    modal.classList.add("hidden");

    var inputs = modal.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i += 1) {
        inputs[i].value = '';
        inputs[i].checked = false;
    }

    var error = modal.getElementsByClassName('modal-error')[0];
    error.classList.add("hidden");
}

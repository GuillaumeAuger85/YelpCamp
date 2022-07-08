const alertSuccess = document.querySelector('.alert-success');
if (alertSuccess) {
    alertSuccess.addEventListener('animationend', () => {
        alertSuccess.remove()
    })
}
const burgerButton = document.querySelector('.dropdown-btn-container');
const sideBar = document.querySelector('.side-bar');

export function initializeMobileMenuListeners() {
    burgerButton.addEventListener('click', () => {
        changeSidebarVisibility();
    })
}

function changeSidebarVisibility() {

    sideBar.classList.contains('open')
    ? sideBar.classList.remove('open')
    : sideBar.classList.add('open');
}
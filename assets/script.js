// responsive navigation menu

const MENU_BTN = document.querySelector(".menu-btn");
const NAVIGATION = document.querySelector(".navigation");

MENU_BTN.addEventListener("click", () => {
    MENU_BTN.classList.toggle("active");
    NAVIGATION.classList.toggle("active");
});
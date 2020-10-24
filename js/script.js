// Popup //

const contactsLink = document.querySelector(".contacts-button");
const contactsClose = document.querySelector(".close");
const popup = document.querySelector(".popup");
const contactForm = document.querySelector(".contact-form");
const userName = document.querySelector(".name-user");
const userMail = document.querySelector(".email-user");
const userMassage = document.querySelector(".message-textarea");

let isStorageSupport = true;
let storageName = "";
let storageMail = "";

try {
    storageName = localStorage.getItem("name");
    storageMail = localStorage.getItem("mail");
} catch (err) {
    isStorageSupport = false;
}

contactsLink.addEventListener("click", function(evt) {
    evt.preventDefault();
    popup.classList.add("popup-show");
    if (storageName && storageMail) {
        userName.value = storageName;
        userMail.value = storageMail;
        userMassage.focus();
    } else {
        userName.focus();
    }
});

contactsClose.addEventListener("click", function() {
    popup.classList.remove("popup-show");
    popup.classList.remove("popup-error");
});

contactForm.addEventListener("submit", function(evt) {
    if (!userName.value || !userMail.value || !userMassage.value) {
        evt.preventDefault();
        popup.classList.remove("popup-error");
        popup.offsetWidth = popup.offsetWidth;
        popup.classList.add("popup-error");
    } else {
        if (isStorageSupport) {
            localStorage.setItem("name", userName.value);
            localStorage.setItem("mail", userMail.value);
        }
    }
});

window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
        if (popup.classList.contains("popup-show")) {
            evt.preventDefault();
            popup.classList.remove("popup-show");
            popup.classList.remove("popup-error");
        }
    }
});
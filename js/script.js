// Popup //

const contactsLink = document.querySelector(".contacts-button");
const contactsClose = document.querySelector(".close");
const popup = document.querySelector(".popup");
const contactForm = document.querySelector(".contact-form");
const contactButton = document.querySelector(".send-button");
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

contactsLink.addEventListener('click', function(evt) {
    evt.preventDefault();
    popup.classList.remove('popup-hidden');
    popup.classList.add('popup-show');
    if (storageName && storageMail) {
        userName.value = storageName;
        userMail.value = storageMail;
        userMassage.focus();
    } else {
        userName.focus();
    }

    setTimeout(function() {
        popup.classList.remove('popup-show');
    }, 1000);

});

contactsClose.addEventListener('click', function(evt) {
    evt.preventDefault();
    popup.classList.add('popup-close');

    setTimeout(function() {
        popup.classList.add('popup-hidden');
        popup.classList.remove('popup-close');
        popup.classList.remove("popup-error");
    }, 600);
});

contactForm.addEventListener("submit", function(evt) {
    if (!userName.value || !userMail.value || !userMassage.value) {
        evt.preventDefault();
        popup.classList.remove("popup-error");
        popup.offsetWidth = popup.offsetWidth;
        popup.classList.add("popup-error");

        setTimeout(function() {
            popup.classList.remove("popup-error");
        }, 600);
    } else {
        if (isStorageSupport) {
            localStorage.setItem("name", userName.value);
            localStorage.setItem("mail", userMail.value);
        }
    }
});

contactButton.addEventListener("click", function(evt) {
    if (!userName.checkValidity() || !userMail.checkValidity()) {
        popup.classList.remove("popup-error");
        popup.offsetWidth = popup.offsetWidth;
        popup.classList.add("popup-error");
        setTimeout(function() {
            popup.classList.remove("popup-error");
        }, 600);
    }
});

window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
        if (!popup.classList.contains("popup-hidden")) {
            evt.preventDefault();
            popup.classList.add('popup-close');

            setTimeout(function() {
                popup.classList.add('popup-hidden');
                popup.classList.remove('popup-close');
                popup.classList.remove("popup-error");
            }, 600);
        }
    }
});
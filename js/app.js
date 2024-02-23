(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function addLoadedClass() {
        window.addEventListener("load", (function() {
            setTimeout((function() {
                document.documentElement.classList.add("loaded");
            }), 0);
        }));
    }
    let bodyLockStatus = true;
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) document.documentElement.classList.toggle("menu-open");
        }));
    }
    const popupLinks = document.querySelectorAll(".popup-button");
    const body = document.querySelector("body");
    const lockPadding = document.querySelectorAll(".lock-padding");
    let unlock = true;
    const timeout = 300;
    if (popupLinks.length > 0) for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", (function(e) {
            const popupName = popupLink.getAttribute("href").replace("#", "");
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        }));
    }
    const popupCloseIcon = document.querySelectorAll(".popup-close");
    if (popupCloseIcon.length > 0) for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener("click", (function(e) {
            popupClose(el.closest(".popup"));
            e.preventDefault();
        }));
    }
    function popupOpen(curentPopup) {
        if (curentPopup && unlock) {
            const popupActive = document.querySelector(".popup-open");
            if (popupActive) popupClose(popupActive, false); else script_bodyLock();
            curentPopup.classList.add("open");
            curentPopup.addEventListener("click", (function(e) {
                if (!e.target.closest(".popup__content")) popupClose(e.target.closest(".popup"));
            }));
        }
    }
    function popupClose(popupActive, doUnlock = true) {
        if (unlock) {
            popupActive.classList.remove("open");
            if (doUnlock) script_bodyUnlock();
        }
    }
    function script_bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
        if (lockPadding.length > 0) for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add("lock");
        unlock = false;
        setTimeout((function() {
            unlock = true;
        }), timeout);
    }
    function script_bodyUnlock() {
        setTimeout((function() {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = "0px";
            }
            body.style.paddingRight = "0px";
            body.classList.remove("lock");
        }), timeout);
        unlock = false;
        setTimeout((function() {
            unlock = true;
        }), timeout);
    }
    document.addEventListener("DOMContentLoaded", (function() {
        const form = document.getElementById("form");
        form.addEventListener("submit", formSend);
        async function formSend(e) {
            e.preventDefault();
            let formData = new FormData(form);
            let response = await fetch("sendmail.php", {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
            } else alert("Помилка");
        }
    }));
    const menuLinks = document.querySelectorAll(".menu-link");
    for (let i = 0; i < menuLinks.length; i++) {
        const menuLink = menuLinks[i];
        menuLink.addEventListener("click", (function(e) {
            document.documentElement.classList.remove("menu-open");
        }));
    }
    window["FLS"] = true;
    isWebp();
    addLoadedClass();
    menuInit();
})();
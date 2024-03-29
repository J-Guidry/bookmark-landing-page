const navMenu = document.querySelector(".mobile-nav");
const overlay = document.querySelector(".mobile-overlay");
const navButton = document.querySelector(".mobile-nav-icon");
const body = document.querySelector("body");
const logo = document.querySelector("#logo");
const header = document.querySelector("header");
const tablinks = document.querySelector(".tab-links");
const tabs = tablinks.querySelectorAll("a");
const panels = document.querySelectorAll(".panel");
const accordionBtns = document.querySelectorAll(".accordion-btn");
const errorBg = document.querySelector(".error");
const form = document.querySelector("form");

function toggleMobileNav() {
    navMenu.classList.toggle("is-active");
    overlay.classList.toggle("is-active");
    body.classList.toggle("mobile-nav-active");
    header.classList.toggle("inner-background");
    
    if(navMenu.classList.contains("is-active")){
        navButton.removeAttribute("src");
        navButton.setAttribute("src","images/icon-close.svg");
        navButton.classList.toggle("logo-nav-mobile");
        logo.classList.toggle("logo-nav-mobile");
        logo.firstChild.firstChild.classList.toggle("fill-white"); 
        logo.firstChild.firstChild.nextSibling.firstChild.classList.toggle("fill-white"); 
        logo.firstChild.firstChild.nextSibling.firstChild.nextSibling.classList.toggle("inner-background");//setAttribute("fill", "#252b46");
    } else {
        navButton.removeAttribute("src");
        navButton.setAttribute("src","images/icon-hamburger.svg");
        navButton.classList.toggle("logo-nav-mobile");
        logo.classList.toggle("logo-nav-mobile");
        logo.firstChild.firstChild.classList.toggle("fill-white"); 
        logo.firstChild.firstChild.nextSibling.firstChild.classList.toggle("fill-white"); 
        logo.firstChild.firstChild.nextSibling.firstChild.nextSibling.classList.toggle("inner-background");

    }
 }

navButton.addEventListener("click", toggleMobileNav);

// activate panels and change aria attributes when switching tabs
function switchTab(oldTab, chosenTab) {
    chosenTab.focus();
    chosenTab.setAttribute("aria-selected", "true");
    chosenTab.removeAttribute("tabindex");
    chosenTab.classList.toggle("active");
    oldTab.setAttribute("aria-selected", 'false');
    oldTab.setAttribute("tabindex", "-1");
    oldTab.classList.toggle("active");
    let index = Array.prototype.indexOf.call(tabs,chosenTab);
    let oldIndex = Array.prototype.indexOf.call(tabs,oldTab);
    panels[oldIndex].classList.toggle("active");
    panels[oldIndex].setAttribute("aria-hidden", "true");
    panels[index].classList.toggle("active");
    panels[index].setAttribute("aria-hidden", "false");
}

// add click and keyboard event listeners to tabs
tabs.forEach(function(tab, i) {
    tab.addEventListener("click", function(event) {
        event.preventDefault();
        const currentlySelectedTab = document.querySelector('[aria-selected="true"]');
        const newlySelectedTab = event.currentTarget;
        if (currentlySelectedTab !== newlySelectedTab) {
            switchTab(currentlySelectedTab, newlySelectedTab);
        }
    });
    
    tab.addEventListener('keydown', e => {  
        let index = Array.prototype.indexOf.call(tabs, e.currentTarget);
        let dir = e.which === 37 ? index - 1 
                : e.which === 39 ? index + 1 
                : e.which === 40 ? 'down' : null;

        if (dir !== null) {
            e.preventDefault();
            dir === 'down' ? panels[i].focus() 
                : tabs[dir] ? switchTab(e.currentTarget, tabs[dir]) 
                : void 0;
        }
    });

});

accordionBtns.forEach(function(btn) {
    let content = btn.nextElementSibling;
    btn.onclick = () => {
        let expandedBtn = btn.getAttribute("aria-expanded") === 'true';
        let hidden = btn.getAttribute("aria-hidden") === 'false';
        btn.setAttribute('aria-expanded', !expandedBtn);
        content.setAttribute("aria-hidden", !hidden);
        btn.firstElementChild.classList.toggle("icon-span");
        btn.firstElementChild.firstElementChild.classList.toggle("close-icon");
        btn.firstElementChild.firstElementChild.firstElementChild.classList.toggle("color-icon");
        content.hidden = expandedBtn;
    }
});

// supress default error popup bubbles
form.addEventListener("invalid", function(event){
    event.preventDefault();
}, true);

form.addEventListener("submit", function(event) {
    if (!this.checkValidity()){
        event.preventDefault();
    }
});

const invalid = (e) => {
    e.target.oninvalid = (event) => {
        //clear field before testing validity
        event.target.setCustomValidity("");
        
        // if input is invalid, toggle error styles
        if(!event.target.validity.valid) {
            errorBg.classList.toggle("error-bg");
            errorBg.firstElementChild.nextElementSibling.classList.toggle("error-display");
            errorBg.firstElementChild.nextElementSibling.nextElementSibling.classList.toggle("error-display");
        }
    }

    e.target.oninput = (event) => {
        //clear field after
        event.target.setCustomValidity("");
    }

}
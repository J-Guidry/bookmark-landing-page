const navMenu = document.querySelector(".mobile-nav");
const overlay = document.querySelector(".mobile-overlay");
const navButton = document.querySelector(".mobile-nav-icon");
const body = document.querySelector("body");
const logo = document.querySelector("#logo");
const header = document.querySelector("header");

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
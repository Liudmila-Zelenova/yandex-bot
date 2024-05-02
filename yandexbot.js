  
// ==UserScript==
// @name         My Yandex bot
// @namespace    http://tampermonkey.net/
// @version      1.00
// @description  Bot for google
// @author       Zelenova Liudmila
// @match        https://ya.ru/*
// @match        https://auto.ru/*
// @grant        none
// ==/UserScript==

let yandexInput = document.getElementsByName("text")[0];
let yandexBtn = document.getElementsByClassName("search3__button mini-suggest__button")[0];
let links = document.links;
let keywords = ["автомобили с пробегом в Москве", "купить машину в москве", "купить авто от хозяина", "китайские электромобили", "купить авто от хозяина с пробегом"];
let keyword = keywords[getRandom(0, keywords.length)];
let mouseClick = new MouseEvent("click");

//Работаем на главной странице
if (yandexBtn !== undefined) {
    let i = 0;
    yandexInput.focus();
    yandexInput.dispatchEvent(mouseClick);

    let timerId = setInterval(() => {
        yandexInput.value += keyword[i];
        i++;
        if (i == keyword.length) {
            clearInterval(timerId);
            yandexBtn.click();
        }
    },130)

    //Работаем на целевом сайте
    } else if (location.hostname == "auto.ru") {
        setInterval(() => {
            let linkIndex = getRandom(0, links.length);
            let localLink = links[linkIndex];

            if (getRandom(0, 101) > 70) {
                location.href = "https://ya.ru/";
            }
            if (links.length == 0) {
                location.href = "auto.ru";
            }
            if (localLink.href.includes("auto.ru")) {
                localLink.removeAttribute('target');
                localLink.click();
            }
        }, getRandom(3000, 5000))
        console.log("мы на месте");

        //Работаем на странице поисковой выдачи

    } else if (document.getElementsByClassName("HeaderDesktopNavigation HeaderDesktop-Navigation") !== null) {
        for (let i = 0; i < links.length; i++) {
            let nextPage = true;
            if (links[i].href.indexOf("auto.ru") != -1) {
                let link = links[i];
                let nextPage = false;
                console.log("Нашел строку " + link);
                link.removeAttribute('target');
                setTimeout(() => {
                    link.click();
                }, getRandom(500, 1000));
                break;
            }

            if (nextPage = true) {
                setTimeout(() => {
                    document.querySelector(".Pager-Item_type_next").click();
                }, getRandom(2500, 3500))
                if (document.querySelector(".Pager-Item_current").innerText === "4") {
                    let nextPage = false;
                    location.href = "https://ya.ru/";
                }
            }

        }
    }
function getRandom(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
}

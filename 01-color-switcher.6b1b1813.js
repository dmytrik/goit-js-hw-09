!function(){var t={start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]"),id:null};function e(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}t.start.addEventListener("click",(function(){t.id=setInterval(e,1e3),t.start.disabled=!0,t.stop.disabled=!1})),t.stop.addEventListener("click",(function(){t.stop.disabled=!0,t.start.disabled=!1,clearInterval(t.id)}))}();
//# sourceMappingURL=01-color-switcher.6b1b1813.js.map

!function(){var t={start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]")},e=null;function a(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}t.start.addEventListener("click",(function(){e=setInterval(a,1e3),t.start.disabled=!0,t.stop.disabled=!1})),t.stop.addEventListener("click",(function(){t.stop.disabled=!0,t.start.disabled=!1,clearInterval(e)}))}();
//# sourceMappingURL=01-color-switcher.0c310cc2.js.map

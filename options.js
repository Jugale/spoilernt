function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        duringShow: document.querySelector("#duringShow").checked,
        whileBrowsing: document.querySelector("#whileBrowsing").checked
    });
}

function restoreOptions() {

    function setCurrentChoice(settings) {
        
        if (settings.duringShow == null) {
            settings.duringShow = true;
        }
        if (settings.whileBrowsing == null) {
            settings.whileBrowsing = false;
        }

        document.querySelector("#duringShow").checked = settings.duringShow;
        document.querySelector("#whileBrowsing").checked = settings.whileBrowsing;
    }

    function onError(error) {
        console.error(`Spoilern't: ${error}`);
    }

    var getting = browser.storage.sync.get();
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#duringShow").addEventListener("change", saveOptions);
document.querySelector("#whileBrowsing").addEventListener("change", saveOptions);

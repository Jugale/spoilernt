const spoilerClasses = [
    // The main spoiler when the show is paused
    "nfa-fs-1-6-em nfa-c-gray-80 nfa-m-0 nfa-w-60",

    // The spoiler when using the episode switcher during the show (there are two of these)
    // Also this class is again used on the main detail page of the show
    "synopsis",
    "episodeSynopsis",
    "WatchNext-episode-synopsis"
];

const hideFilterEffect = "brightness(1.75) blur(4px)";
var settings = {}

function pathContains(string) {
    return window.location.pathname.includes(string)
}

var observer = new MutationObserver( function(mutations) {

    // We need to do this check here because... the page loading seems fancy
    if (!shouldBlur(settings)) { return; }

    for (const spoilerClass of spoilerClasses) {

        // Try to find the paragraph with the spoiler in it
        const spoilerElements = document.getElementsByClassName(spoilerClass);

        for (const spoiler of spoilerElements) {
            spoiler.style.filter = hideFilterEffect;
        }
    }
});

function beginWatching() {
    // Watch everything under 'appMountPoint'... it seems the most viable way to do this semi-nicely
    observer.observe(
        document.getElementById("appMountPoint"),
        { childList: true, subtree: true }
    );
}

function shouldBlur(settings) {

    if (settings.duringShow == null) {
        settings.duringShow = true;
    }
    if (settings.whileBrowsing == null) {
        settings.whileBrowsing = false;
    }

    const isWatch = pathContains("watch")
    if (settings.duringShow && isWatch) {
        return true;
    }

    const isBrowse = pathContains("browse") || pathContains("title")
    if (settings.whileBrowsing && isBrowse) {
        return true;
    }

    return false;
}

browser.storage.sync.get()
    .then(
        function (val) {
            settings = val;
            beginWatching();
        },
        function (error) {
            console.error(`Spoilern't: ${error}`)
            beginWatching();
        }
    );


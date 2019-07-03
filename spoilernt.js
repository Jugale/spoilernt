const spoilerClasses = [
    // The main spoiler when the show is paused
    "nfa-fs-1-6-em nfa-c-gray-80 nfa-m-0 nfa-w-60",

    // The spoiler when using the episode switcher during the show (there are two of these)
    // Also this class is again used on the main detail page of the show
    "synopsis"
];

const hideFilterEffect = "brightness(1.75) blur(4px)";

var observer = new MutationObserver( function(mutations) {

    for (const spoilerClass of spoilerClasses) {
        console.log(`Searching for ${spoilerClass}`);
        // Try to find the paragraph with the spoiler in it
        const spoilerElements = document.getElementsByClassName(spoilerClass);

        for (const spoiler of spoilerElements) {
            console.log(`    Found ${spoiler}`);
            spoiler.style.filter = hideFilterEffect;
        }
    }
});

// Watch everything under 'appMountPoint'... it seems the most viable way to do this semi-nicely
observer.observe(
    document.getElementById("appMountPoint"), 
    { childList: true, subtree: true }
);

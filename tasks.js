async function scrollPage(page) {
    console.log("Task: Page scroll");
    // Get the page height
    const pageHeight = await page.evaluate(() => {
        return document.body.scrollHeight;
    });

    // Define the duration of scrolling in milliseconds (e.g., 5 seconds)
    const scrollDuration = 5000;

    // Calculate the number of steps and interval between each step
    const numSteps = 100;
    const scrollInterval = scrollDuration / numSteps;

    // Start scrolling gradually
    let currentScroll = 0;
    for (let i = 0; i < numSteps; i++) {
        // Calculate the next scroll position
        const nextScroll = Math.min(currentScroll + (pageHeight / numSteps), pageHeight);

        // Scroll to the next position slowly
        await page.evaluate((scrollPosition) => {
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth' // Make the scrolling motion smooth
            });
        }, nextScroll);

        // Update the current scroll position
        currentScroll = nextScroll;

        // Wait for the interval before scrolling to the next position
        await sleep(Math.floor(Math.random() * (100 - 10 + 1)) + 10);
    }
    return;
}

const sleep = ms => new Promise(res => setTimeout(res, ms));


async function clickAd(page) {
    console.log('clickAd.start')

    try {
        try {
            await page.waitForSelector('#container-02ce77151336319f00f10df06fbf6794');
            console.log('Ad element found');
        } catch (error) {
            console.error('element not found:', error);
        }
        await page.evaluate(() => {
            const containerDiv = document.querySelector('#container-02ce77151336319f00f10df06fbf6794');
            // Check if the div element is found
            if (containerDiv) {
                // Select all <a> elements under the div
                const adLinks = containerDiv.querySelectorAll('a');
                console.log(adLinks)
                const index = Math.floor(Math.random() * adLinks.length)
                const adLink = adLinks[index]
                adLink.click()
            } else {
                console.log('Container div not found.');
            }
        })
        console.log('Ad was clicked')
    } catch (error) {
        console.log(error.message)
    }
    console.log('clickAd.end')
}

async function tasks(page, task) {
    if (task === 'scroll') {
        await scrollPage(page)
    }
    if (task === 'clickAd') {
        await clickAd(page);
    }
    return;
}

module.exports = tasks
const log_path = "log.txt"

async function googleSearchAndBack(page) {
    try {
        await sleep(page)
        await page.goto("https://google.com")
        const searchElement = 'input[aria-label="Search"]';
        await page.waitForSelector(searchElement);
        await page.type(searchElement, `site:"strender.vercel.app"`, { delay: 100 })
        await page.keyboard.press('Enter');

        console.log("searched")
        await page.waitForNavigation()

        await page.waitForSelector(".LC20lb", { visible: true });
        const searchResults = await page.$$eval(".LC20lb", els =>
            els.map(e => ({ title: e.innerText, link: e.parentNode.href }))
        );
        console.log(searchResults);

        await sleep(page)
        await scrollPage(page)
        await sleep(page)
        await historyBack(page)
        await historyBack(page)
    } catch (e) {
        console.log(e)
    }
}

async function screenShot(page) {
    await sleep(page)
}

async function googleSearch(page) {
    await sleep(page)
}

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
        await page.waitForTimeout(scrollInterval);
    }
    return;
}

async function click(page) {
    console.log("Task: Click random link");

    // Wait for links to appear
    await page.waitForSelector('.site_postLinks');

    // Get all links
    const links = await page.evaluate(() => {
        const linkElements = document.querySelectorAll('.site_postLinks');
        return Array.from(linkElements).map(link => link.href);
    });

    // Check if there are any links
    if (!links.length) {
        console.warn("No links found to click!");
        return;
    }

    // Choose a random link index
    const randomIndex = Math.floor(Math.random() * links.length);
    console.log("Click on " + links[randomIndex]);
    // Click the randomly chosen link
    await page.goto(links[randomIndex], { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000);
    return
}

async function click2(page) {
    console.log("Task: Click2 random link");

    // Wait for links to appear
    await page.waitForSelector('a');

    // Get all links
    const links = await page.evaluate(() => {
        const linkElements = document.querySelectorAll('a');
        const links = Array.from(linkElements).map(link => link.href);
        const index = Math.floor(Math.random() * links.length);
        const link = links[index];
        link.click()
    });
}


async function historyBack(page) {
    console.log("Task: Window history back")
    await page.evaluate(() => {
        try {
            window.history.back();
        } catch (e) {
            console.log(e)
        }
    })
    return;
}

async function reload(page) {
    console.log("Task: reload")
    await page.evaluate(() => {
        window.location.reload()
    })
    await sleep(page)
    await sleep(page)
}

async function historyForward(page) {
    console.log("Task: Window history forward")
    await page.evaluate(() => {
        try {
            window.history.forward();
        } catch (e) {
            console.log(e);
        }
    })
    return;
}

async function sleep(page) {
    const time = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;
    console.log("Task: Sleep for " + time)
    await page.waitForTimeout(5000);
}

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
    if (task === 'click') {
        await click(page)
    }
    if (task === 'click2') {
        await click2(page)
    }
    if (task === 'history.back') {
        // await historyBack(page);
    }
    if (task === 'history.forward') {
        // await historyForward(page);
    }
    if (task === 'sleep') {
        await sleep(page)
    }
    if (task === 'clickAd') {
        await clickAd(page);
    } if (task === 'testLog') {
    } if (task === 'screenShot') {
        await screenShot(page);
    } if (task === 'googleSearch') {
        await googleSearch(page);
    } if (task === 'googleSearchAndBack') {
        await googleSearchAndBack(page);
    } if (task === 'reload') {
        await sleep(page)
        await reload(page)
    }

    return;
}

module.exports = tasks
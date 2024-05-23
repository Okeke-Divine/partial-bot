const puppeteer = require("puppeteer-extra")
const StealthPlugin = require("puppeteer-extra-plugin-stealth")
const userAgents = require("./UA.json")
const tasks = require("./tasks.js")
const dotenv = require("dotenv");
dotenv.config();

// const server_timezone = process.env.TIME_ZONE
// console.log(server_timezone)
// return;

async function getRandomItem(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error('The input should be a non-empty array.');
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

puppeteer.use(StealthPlugin())


function newConsoleLine() {
    console.log("--------------")
}

async function runBot() {

    try {
        const url = "https://partial-test.vercel.app/";
        newConsoleLine()

        const UA = await getRandomItem(userAgents);
        console.log("User Agent: " + UA.ua)
        newConsoleLine()

        const browser = await puppeteer.launch(
            {
                headless: false,
                ignoreHTTPSErrors: true,
                //   defaultViewport: this.Device.resolution,
                args: [`--disable-infobars`,
                    `--window-size=${UA.width},${UA.height}`,
                    '--disable-web-security',
                    '--no-sandbox', '--disable-setuid-sandbox', '--disable-features=WebRtcHideLocalIpsWithMdns',
                    '--disable-webrtc-encryption',
                    '--disable-webrtc-multiple-routes'
                ],
                ignoreDefaultArgs: ['--enable-automation']
            });

        console.log("Browser Launched");
        newConsoleLine()

        const page = await browser.newPage();
        console.log("New page opending");
        newConsoleLine()

        //set the user agent
        await page.setUserAgent(UA.ua)

        // Set screen width and height
        await page.setViewport({
            width: UA.width,
            height: UA.height,
            isMobile: true,
            hasTouch: true,
            deviceScaleFactor: 2
        });

        // configure the timezone
        // await page.emulateTimezone(server_timezone);

        // Navigate to the website
        console.log("Loading url");
        newConsoleLine()
        await page.goto(url, { timeout: 0 });
        console.log(`${url} has been opened`)
        newConsoleLine()





        ////////ACTION
        await tasks(page,'sleep');
        await tasks(page,'scroll');
        await tasks(page,'sleep');
        await tasks(page,'clickAd');
        await tasks(page,'sleep');
        await tasks(page,'switchTab');
        await tasks(page,'sleep');
        await tasks(page,'scroll');
        await tasks(page,'randomClick');
        await tasks(page,'switchBack');
        await tasks(page,'sleep');
        await tasks(page,'scroll');
        await tasks(page,'switchTab');
        await tasks(page,'closeTab');
        await tasks(page,'switchBack');
        await tasks(page,'scroll');


        ////////ACTION















        console.log("Closing browser")
        newConsoleLine()

        // await browser.close();

        console.log("Browser Closed")
        newConsoleLine()
        console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
        // runBot();
    } catch (e) {
        console.log(e);
    }
}

runBot();
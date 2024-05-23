const puppeteer = require("puppeteer-extra")
const StealthPlugin = require("puppeteer-extra-plugin-stealth")
const userAgents = require("./UA.json")
puppeteer.use(StealthPlugin())

const tasks = require("./tasks.js")
const dotenv = require("dotenv");
dotenv.config();

const server_timezone = process.env.TIME_ZONE

async function getRandomItem(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error('The input should be a non-empty array.');
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}


function newConsoleLine() {
    console.log("--------------")
}


const sleep = ms => new Promise(res => setTimeout(res, ms));
let i = 1;

async function runBot() {
    console.log(server_timezone)
    try {
        const url = "https://partial-test.vercel.app/";
        newConsoleLine()
        console.log(i);
        newConsoleLine()

        const UA = await getRandomItem(userAgents);
        console.log("User Agent: " + UA.ua)
        newConsoleLine()

        const browser = await puppeteer.launch(
            {
                headless: 'new',
                ignoreHTTPSErrors: true,
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
        await page.emulateTimezone(server_timezone);

        // Navigate to the website
        console.log("Loading url");
        newConsoleLine()
        await page.goto(url, { timeout: 0 });
        console.log(`${url} has been opened`)
        newConsoleLine()

        ////////ACTION
        var ms = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
        console.log("Sleep for "+ms);
        await sleep(ms);

        await tasks(page, 'scroll');
        
        var ms = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
        console.log("Sleep for "+ms);
        await sleep(ms);

        await tasks(page, 'scroll');
        
        var ms = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
        console.log("Sleep for "+ms);
        await sleep(ms);

        await tasks(page, 'clickAd');
        await tasks(page, 'scroll');
        
        var ms = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
        console.log("Sleep for "+ms);
        await sleep(ms);

        // await tasks(page, 'switchTab');
        // await tasks(page, 'sleep');
        // await tasks(page, 'scroll');
        // await tasks(page, 'randomClick');
        // await tasks(page, 'switchBack');
        // await tasks(page, 'sleep');
        // await tasks(page, 'scroll');
        // await tasks(page, 'switchTab');
        // await tasks(page, 'closeTab');
        // await tasks(page, 'switchBack');
        // await tasks(page, 'scroll');


        ////////ACTION


        console.log("Closing browser")
        newConsoleLine()

        await browser.close();

        console.log("Browser Closed")
        newConsoleLine()
        console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
        i++;
        runBot();
    } catch (e) {
        console.log(e);
    }
}

runBot();
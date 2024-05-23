const puppeteer = require("puppeteer-extra")
const StealthPlugin = require("puppeteer-extra-plugin-stealth")
const userAgents = require("./UA.json")

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

        const proxy = await getRandomItem(proxies);
        console.log(`Proxy: http://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.port}`);
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
            hasTouch: UAtrue,
            deviceScaleFactor: 2
        });

        // Navigate to the website
        console.log("Loading url");
        newConsoleLine()
        await page.goto(url, { timeout: 0 });
        console.log(`${url} has been opened`)
        newConsoleLine()
        // return

        console.log("Closing browser")
        newConsoleLine()
        
        await browser.close();

        console.log("Browser Closed")
        newConsoleLine()
        console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
        runBot();
    } catch (e) {
        console.log(e);
    }
}

runBot();
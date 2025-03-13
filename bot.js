const { Telegraf } = require('telegraf');
const puppeteer = require('puppeteer');

// Token بۆ بوتی تێلیگرام
const bot = new Telegraf('2036348448:AAFJc-pLAdoOgO3eEg5CxvwpUCUfAH2BZp4');

// کۆدی لۆگین و داگرتن بە Puppeteer
async function downloadInstagramVideo(url, username, password) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // لۆگین بە username و password
    await page.goto('https://www.instagram.com/accounts/login/');
    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', username);
    await page.type('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // ڤیدیۆ دابگرە
    await page.goto(url);
    const videoUrl = await page.$eval('video', (video) => video.src);

    await browser.close();
    return videoUrl;
}

// فەرمی داواکاری تێلیگرام
bot.on('text', async (ctx) => {
    const url = ctx.message.text;
    const user = 'waleedbarwary';
    const pass = 'WALEED123@&W';

    try {
        if (url.includes('instagram.com')) {
            // ڤیدیۆ دابگرێ
            const videoUrl = await downloadInstagramVideo(url, user, pass);
            ctx.reply(`ڤیدیۆ بەسەرکەوتویی دابرا: ${videoUrl}`);
        } else {
            ctx.reply('لطفاً لینک ڤیدیۆی ئینستاگرام بنێرە.');
        }
    } catch (error) {
        console.error(error);
        ctx.reply('هەڵەیەک ڕوویدا، تکایە دووبارە هەوڵبدە.');
    }
});

bot.launch();

const { Telegraf } = require('telegraf');
const puppeteer = require('puppeteer');

const bot = new Telegraf('2036348448:AAFJc-pLAdoOgO3eEg5CxvwpUCUfAH2BZp4');

bot.start((ctx) => ctx.reply('سڵاو! تکایە لینکەکانی ڤیدیۆی ئینستاگرام بنێرە'));

bot.on('text', async (ctx) => {
  const url = ctx.message.text;
  
  if (url.includes('instagram.com')) {
    try {
      // لۆگین بە username/password بۆ ڤیدیۆی پرایڤەیت
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // لۆگین کردن
      await page.goto('https://www.instagram.com/accounts/login/');
      await page.type('input[name="username"]', 'YOUR_USERNAME');
      await page.type('input[name="password"]', 'YOUR_PASSWORD');
      await page.click('button[type="submit"]');
      await page.waitForNavigation();

      // گەڕان بۆ لینک و دابگرن
      await page.goto(url);
      const videoUrl = await page.$eval('video', el => el.src);

      // ڤیدیۆی دابگرە و بە تێلیگرام بفرێنە
      await ctx.replyWithVideo(videoUrl);
      await browser.close();
    } catch (error) {
      console.error(error);
      await ctx.reply('هەڵەیەک ڕوویدا. تکایە دوبارە هەوڵبدە');
    }
  } else {
    await ctx.reply('تکایە لینکەکانی ڤیدیۆی ئینستاگرام بنێرە');
  }
});

bot.launch();

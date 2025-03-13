const { Telegraf } = require('telegraf');
const axios = require('axios');

// تۆکن بۆ بوتی تێلیگرام
const bot = new Telegraf('2036348448:AAFJc-pLAdoOgO3eEg5CxvwpUCUfAH2BZp4');

// فەرمی API تایبەتی بۆ داگرتنی ڤیدیۆی رێلز
const downloadInstagramReels = async (url) => {
    try {
        // پەیوەندیدانی URL بە API ی snapinsta.app
        const response = await axios.get(`https://snapinsta.app/api/v1/download`, {
            params: {
                url: url, // لینک رێل
            }
        });

        // ئەگەر API وەڵامە بە شێوەی دروست بەدەست هێنرابێت
        if (response.data && response.data.success) {
            const videoUrl = response.data.download_url;
            return videoUrl;
        } else {
            return 'هەڵەیەک ڕوویدا';
        }
    } catch (error) {
        console.error('Error:', error);
        return 'هەڵەیەک ڕوویدا';
    }
};

// فەرمی داواکاری تێلیگرام
bot.on('text', async (ctx) => {
    const url = ctx.message.text;

    if (url.includes('instagram.com/reel/')) {
        const videoUrl = await downloadInstagramReels(url);
        ctx.reply(`ڤیدیۆ بەسەرکەوتویی دابرا: ${videoUrl}`);
    } else {
        ctx.reply('لطفاً لینک ڤیدیۆی رێلز ئینستاگرام بنێرە.');
    }
});

// چێککردنی هەڵەکان و چاکسازی launch
bot.launch().catch((err) => {
    console.error('Bot Error:', err);
});

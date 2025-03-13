const { Telegraf } = require('telegraf');
const axios = require('axios');

// تۆکن بۆ بوتی تێلیگرام
const bot = new Telegraf('2036348448:AAFJc-pLAdoOgO3eEg5CxvwpUCUfAH2BZp4');

// فەرمی API تایبەتی بۆ داگرتنی ڤیدیۆی رێلز
const downloadInstagramReels = async (url) => {
    try {
        // پەیوەندیدانی URL بە API ی reelsaver.net
        const response = await axios.get(`https://reelsaver.net/api/instagram`, {
            params: {
                url: url, // لینک رێل
            }
        });

        // ئەگەر API وەڵامە بە شێوەی دروست بەدەست هێنرابێت
        if (response.data && response.data.status === 'success') {
            const videoUrl = response.data.data.url;
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

bot.launch();

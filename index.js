const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
  // `who-to-greet` input defined in action metadata file
  const telegramBotToken = core.getInput('telegramBotToken', {required: true, trimWhitespace: true});
  const telegramUserID = core.getInput('telegramUserID', {required: true, trimWhitespace: true});
  const telegramChatID = core.getInput("telegramChatID", {required: false, trimWhitespace: true});

  if(telegramChatID.length == 0){
    console.log("No telegramChatID provided, searching for Chat with User ID");
    const telegramChatID = await getTelegramChatID(telegramUserID, telegramBotToken);
  }
} catch (error) {
  core.setFailed(error.message);
}

async function getTelegramChatID(telegramChatID, telegramBotToken){
  const res = await axios
    .get(`https://api.telegram.org/bot${telegramBotToken}/getUpdates`)
    .catch(error => {
      console.error(error)
    });

    const resultJSON = JSON.parse(res);
    resultJSON.result.forEach(element => {
      console.log(element);
    });

    return null;


}
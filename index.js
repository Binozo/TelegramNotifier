const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');
const fs = require("fs");

try {
  start();
} catch (error) {
  core.setFailed(error.message);
}

async function start(){
  const telegramBotToken = core.getInput('telegram-bot-token', {required: true, trimWhitespace: true});
  const telegramUserID = core.getInput('telegram-user-id', {required: true, trimWhitespace: true});
  var telegramChatID = core.getInput("telegram-chat-id", {required: false, trimWhitespace: true});
  var targetFilePath = core.getInput("file-path", {required: false});

  if(telegramChatID.length == 0){
    console.log("No telegram-chat-id provided, searching for Chat with User ID");
    telegramChatID = await getTelegramChatID(telegramUserID, telegramBotToken);

    if(telegramChatID == null){
      core.setFailed("No Chat found with User ID");
      return;
    }

    console.log("Found Chat with User ID");
  }

  var message = core.getInput('message', {required: false, trimWhitespace: false});

  if(message.length === 0){
    message = "GitHub Workflow completed";
  }

  await sendTelegramMessage(telegramChatID, message, telegramBotToken);
  if(targetFilePath.length != 0) {
    // Send a file too
    await sendFile(telegramChatID, targetFilePath, telegramBotToken);
  }

}

async function sendTelegramMessage(chatID, content, telegramBotToken) {
  const res = await axios
    .post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      chat_id: chatID,
      text: content
    })
    .catch(error => {
      core.setFailed(error)
    });
}

async function sendFile(chatID, filePath, telegramBotToken) {
  const res = await axios
      .post(`https://api.telegram.org/bot${telegramBotToken}/sendDocument`, {
        chat_id: chatID,
        document: fs.createReadStream(filePath)
      })
      .catch(error => {
        core.setFailed(error)
      });
}

async function getTelegramChatID(telegramUserID, telegramBotToken){
  const res = await axios
    .get(`https://api.telegram.org/bot${telegramBotToken}/getUpdates`)
    .catch(error => {
      console.error(error)
    });

    var chatIDResult = null;
    res.data.result.forEach(element => {
      if(chatIDResult != null) return;
      
      const messageFromUserID = element.message.from.id;
      if(messageFromUserID == telegramUserID){
        chatIDResult = element.message.chat.id;
      }
    });

    return chatIDResult;
}
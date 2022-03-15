# Telegram Messenger

This action sends you messages you through Telegram.

## Inputs

## `telegram-bot-token`
**Required** Your Telegram Bot Token

## `telegram-user-id`
**Required** Your Telegram User ID

## `telegram-chat-id`
Chat ID between you and your Telegram Bot. If empty the Bot will search for the Chat itself.\
**Attention:** You have to send at least one Message to your Telegram Bot through Telegram. https://t.me/yourBotUsername

## `message`
The message you want the bot to send. Default is "GitHub Workflow completed".

## Example usage
```
- name: Hello world action step
  uses: binozo/telegramnotifier@v1.0
  with:
    telegram-bot-token: ${{secrets.TELEGRAM_BOT_TOKEN}}
    telegram-user-id: ${{secrets.TELEGRAM_TARGET_USER_ID}}
    message: "Hello World!"
```
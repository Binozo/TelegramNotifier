# Telegram Messenger

This action sends you messages you through Telegram.

## Inputs

- `telegram-bot-token`®️ Your Telegram Bot Token
- `telegram-user-id`®️ Your Telegram User ID
- `message` The message you want the bot to send. Default is "GitHub Workflow completed"
- `file-path` Pass an absolute filepath to send a file
- `telegram-chat-id` Chat ID between you and your Telegram Bot. If empty the Bot will search for the Chat itself.

##### ®️ required attributes

**Attention:** You have to send at least one Message to your Telegram Bot through Telegram. https://t.me/yourBotUsername

## Example usage
```
- name: Hello world action step
  uses: binozo/telegramnotifier@v1.3
  with:
    telegram-bot-token: ${{secrets.TELEGRAM_BOT_TOKEN}}
    telegram-user-id: ${{secrets.TELEGRAM_TARGET_USER_ID}}
    message: "Hello World!"
    file-path: ${{ github.workspace }}/build/app/outputs/flutter-apk/app-release.apk
```
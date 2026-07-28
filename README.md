# 🤖 Flapjack Kipper AI

## Everything You Need to Know

Flapjack Kipper AI is an open-source Discord AI assistant originally developed for **Grimwood Forest Creative & Operations**.

Unlike a traditional Discord bot, Flapjack Kipper AI integrates with **Google's Gemini AI** to provide intelligent conversations, answer questions, assist users, and perform AI-powered tasks directly within a Discord server.

Originally created as an internal assistant for the Grimwood Forest community, the project has been released as open source so developers, communities, and organizations can customize it for their own Discord servers.

This repository contains the complete source code required to create and operate your own version of Flapjack Kipper AI.

> **Important:** This repository only contains the source code. It does **not** include the original Discord server, Discord bot account, Bot Token, Gemini API Key, Replit Secrets, private configuration files, conversation history, or internal organizational data.

To use this project, you must create your own Discord Application, create your own Discord Bot, obtain your own Gemini API Key, configure your own Discord server, and supply your own private environment variables.

Originally developed and maintained by **officialdarkevilpark**.

---

# 📋 Table of Contents

- What Flapjack Kipper AI Does
- Features
- Important Security Information
- What You Need
- Creating a Discord Application
- Creating the Discord Bot
- Finding the Bot Token
- Finding the Client ID
- Configuring the Bot
- Inviting the Bot
- Discord Gateway Intents
- Recommended Discord Permissions
- Enable Discord Developer Mode
- Creating the Required Discord Channels
- Creating Leadership Permissions
- Environment Variables
- Environment Variable Explanations
- Project Files Explained
- Creating a Google AI Studio Project
- Obtaining a Gemini API Key
- Choosing a Gemini Model
- Importing into Replit
- Adding Replit Secrets
- Running the Bot
- Running Locally with Node.js
- Installing Dependencies
- AI Conversation Workflow
- Leadership Permissions
- AI Logging
- Troubleshooting
- Testing Checklist
- Privacy
- Customization
- Credits
- Disclaimer
- Official Resources

---

# What Flapjack Kipper AI Does

Flapjack Kipper AI is an AI-powered Discord assistant that combines Discord with Google's Gemini large language model.

Depending on the version of the source code included in this repository, the bot may support:

- AI conversations
- Question answering
- Intelligent responses
- Leadership tools
- AI request logging
- Dedicated AI discussion channels
- Administrative permissions
- Discord slash commands
- Private logging
- Organization-specific prompts
- Community assistance
- Knowledge-based conversations
- Future AI integrations

The exact features available depend on the current version of `index.js`.

---

# Features

Depending on the included source code, Flapjack Kipper AI may provide:

- 🤖 AI-powered conversations
- 💬 Natural language responses
- 🧠 Google Gemini integration
- 📝 AI conversation logging
- 🔒 Leadership permission controls
- 📂 Dedicated AI Hub channel
- 📜 Administrative logs
- ⚙️ Easy configuration using environment variables
- 🌐 Replit compatibility
- 💻 Local Node.js support
- 🛡️ Open-source customization

---

# Important Security Information

Never publicly share:

- Discord Bot Token
- Gemini API Key
- Private `.env` file
- Replit Secrets
- Private Discord IDs
- Internal logs
- Organization-specific prompts
- Private AI conversations

Your Discord Bot Token and Gemini API Key should always remain private.

Anyone who gains access to either credential may be able to operate your bot or consume your AI usage quota.

Never place your credentials:

- Inside this README
- Inside `index.js`
- Inside GitHub commits
- In screenshots
- Inside Discord messages
- Inside public repositories

If your Bot Token becomes exposed:

1. Open the Discord Developer Portal.
2. Open your application.
3. Select **Bot**.
4. Reset the Bot Token.
5. Update your private `.env` file or Replit Secrets.
6. Restart the bot.

If your Gemini API Key becomes exposed:

1. Open Google AI Studio.
2. Generate a new API Key.
3. Replace the old key in your environment variables.
4. Delete the compromised key if it is no longer needed.

---

# What You Need

Before running Flapjack Kipper AI you will need:

- A Discord account
- A Discord server
- Administrator permissions
- A Discord Application
- A Discord Bot
- A Google AI Studio account
- A Gemini API Key
- Node.js
- npm
- Internet access
- The source code from this repository

Recommended hosting options include:

- Replit
- Visual Studio Code
- Your own computer
- VPS hosting
- Any Node.js-compatible hosting provider

Replit is recommended for beginners because it provides project files, package management, environment variables, and a built-in console in one workspace.

---

# Useful Resources

Discord Developer Portal

https://discord.com/developers/applications

Google AI Studio

https://aistudio.google.com/

Google Gemini Documentation

https://ai.google.dev/

GitHub

https://github.com

Replit

https://replit.com

Node.js

https://nodejs.org

---

# Create a Discord Application

Before using Flapjack Kipper AI, create a Discord Application.

1. Visit the Discord Developer Portal.
2. Sign in with your Discord account.
3. Select **New Application**.
4. Enter an application name.

Recommended:

```
Flapjack Kipper AI
```

5. Select **Create**.

Your Discord Application will contain:

- Bot Account
- Application ID
- OAuth2 Configuration
- Slash Commands
- Installation Settings
- Gateway Intents

---

# Create the Discord Bot

After creating the application:

1. Open your application.
2. Select **Bot**.
3. Select **Add Bot**.
4. Confirm the action.
5. Give your bot a name.
6. Upload a bot icon if desired.
7. Save your changes.

The application and the bot account are connected, but they are not the same thing.

- The application stores configuration.
- The bot account appears inside Discord.
- The Bot Token allows the source code to log in.

---

# Find the Bot Token

Inside the **Bot** page:

Locate the **Token** section.

Copy or reset the token.

Store it privately.

Your environment variable should look like:

```env
DISCORD_TOKEN=YOUR_BOT_TOKEN
```

Correct:

```env
DISCORD_TOKEN=YOUR_BOT_TOKEN
```

Incorrect:

```env
DISCORD_TOKEN=DISCORD_TOKEN=YOUR_BOT_TOKEN
```

---

# Find the Client ID

Open:

**General Information**

Locate:

**Application ID**

Copy the number.

Store it as:

```env
CLIENT_ID=YOUR_CLIENT_ID
```

The Client ID should belong to the same Discord Application as your Bot Token.

---

# Configure the Bot

Depending on the source code, Flapjack Kipper AI may require the following Gateway Intents:

- Server Members Intent
- Message Content Intent

Only enable the intents required by your version of the bot.

Remember to save your changes before leaving the Developer Portal.

---

# Invite the Bot

Open the **Installation** page.

Use the following scopes:

- bot
- applications.commands

Invite the bot to your Discord server.

The bot will remain offline until the source code is running.

---

# Discord Gateway Intents

Many AI bots require Gateway Intents to properly function.

Common intents include:

- Server Members Intent
- Message Content Intent

These allow the bot to:

- Identify server members
- Read messages when required
- Respond appropriately
- Process AI requests

Only enable the intents that your version of the project actually uses.

---

# Recommended Discord Permissions

Recommended permissions include:

- View Channels
- Send Messages
- Read Message History
- Embed Links
- Attach Files
- Use Slash Commands
- Add Reactions

Administrator permission may be useful while testing.

For production servers, grant only the permissions required by the bot.

---

# Enable Discord Developer Mode

Developer Mode allows you to copy Discord IDs.

Enable it through:

User Settings → Advanced → Developer Mode

Once enabled you can copy:

- Server IDs
- Channel IDs
- User IDs
- Role IDs
- Message IDs

These IDs are required when configuring your environment variables.

---

# Create the Required Discord Channels

The original project used two primary channels.

## AI Hub

Suggested channel name:

```
ai-hub
```

This is where members interact with Flapjack Kipper AI.

Store the Channel ID in:

```env
AI_HUB_CHANNEL_ID=YOUR_AI_HUB_CHANNEL_ID
```

---

## AI Logs

Suggested channel name:

```
ai-logs
```

This private channel stores AI-related logs and administrative events.

Store the Channel ID in:

```env
AI_LOGS_CHANNEL_ID=YOUR_AI_LOGS_CHANNEL_ID
```

Only trusted leadership members should have access to this channel.

---

# Create Leadership Permissions

The original project used both Discord roles and approved User IDs to control administrative access.

Create a leadership role.

Copy its Role ID.

Store it as:

```env
LEADERSHIP_ROLE_ID=YOUR_LEADERSHIP_ROLE_ID
```

Administrator overrides can also be configured using approved Discord User IDs.

Those IDs are stored inside:

```env
LEADERSHIP_USER_IDS=YOUR_DISCORD_USER_ID
```
---

# Creating a Google AI Studio Project

Flapjack Kipper AI uses **Google Gemini** as its AI provider.

Before the bot can generate responses, you must create a Google AI Studio project and obtain a Gemini API Key.

Google AI Studio is Google's official platform for testing and integrating Gemini into applications.

Visit:

https://aistudio.google.com/

Sign in using your Google Account.

If prompted, accept Google's terms of service.

Once signed in, you will have access to the AI Studio dashboard.

---

# Creating a Gemini API Key

Inside Google AI Studio:

1. Select **Get API Key**.
2. Select **Create API Key**.
3. Choose an existing Google Cloud project or allow AI Studio to create one.
4. Generate the key.
5. Copy the API Key immediately.

Store the key somewhere safe.

Once you leave the page, you should always be able to generate a new key if necessary, but you should avoid sharing your existing one.

---

# Protecting Your API Key

Your Gemini API Key is private.

Treat it exactly like a password.

Never upload it to:

- GitHub
- Discord
- Screenshots
- README files
- Public repositories
- Videos
- Livestreams

Always store it in:

- `.env`
- Replit Secrets
- Other secure environment variable systems

Correct:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Incorrect:

```env
GEMINI_API_KEY=AIzaSyExampleRealKey123456789
```

If you believe your API Key has been exposed:

1. Return to Google AI Studio.
2. Generate a new API Key.
3. Replace the old key in your environment variables.
4. Delete or revoke the exposed key if it is no longer needed.
5. Restart the bot.

---

# Choosing a Gemini Model

Gemini is available in multiple models.

Your version of Flapjack Kipper AI uses the model specified by:

```env
GEMINI_MODEL=
```

For example:

```env
GEMINI_MODEL=gemini-2.5-flash
```

Different Gemini models may offer different capabilities, response speeds, context lengths, and pricing.

Refer to the Google AI documentation for the latest list of supported models.

If Google retires or renames a model, update the value in your environment variables accordingly.

---

# Environment Variables

Example:

```env
DISCORD_TOKEN=YOUR_BOT_TOKEN
CLIENT_ID=YOUR_CLIENT_ID
GUILD_ID=YOUR_SERVER_ID

AI_HUB_CHANNEL_ID=YOUR_AI_HUB_CHANNEL_ID
AI_LOGS_CHANNEL_ID=YOUR_AI_LOGS_CHANNEL_ID

LEADERSHIP_ROLE_ID=YOUR_LEADERSHIP_ROLE_ID
LEADERSHIP_USER_IDS=YOUR_DISCORD_USER_ID

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
GEMINI_MODEL=gemini-2.5-flash
```

The file must be named:

```
.env
```

Never upload your real `.env` file to GitHub.

---

# Environment Variable Explanations

## DISCORD_TOKEN

```env
DISCORD_TOKEN=YOUR_BOT_TOKEN
```

The Bot Token allows the source code to authenticate with Discord.

Without this value, the bot cannot connect to Discord.

Keep this value private.

---

## CLIENT_ID

```env
CLIENT_ID=YOUR_CLIENT_ID
```

This is your Discord Application ID.

The bot uses this value when registering slash commands and identifying the application.

To obtain it:

1. Open the Discord Developer Portal.
2. Open your application.
3. Copy the **Application ID**.

---

## GUILD_ID

```env
GUILD_ID=YOUR_SERVER_ID
```

This is your Discord Server ID.

Discord internally refers to servers as **Guilds**.

The bot uses this value to know which server it should operate within.

Enable Developer Mode to copy this ID.

---

## AI_HUB_CHANNEL_ID

```env
AI_HUB_CHANNEL_ID=YOUR_AI_HUB_CHANNEL_ID
```

This is the primary channel where users interact with Flapjack Kipper AI.

Depending on the version of the project, the AI may:

- Answer questions
- Respond to prompts
- Assist members
- Participate in AI conversations
- Provide organization-specific responses

Only users with permission to access this channel will be able to interact with the AI.

---

## AI_LOGS_CHANNEL_ID

```env
AI_LOGS_CHANNEL_ID=YOUR_AI_LOGS_CHANNEL_ID
```

This identifies the private logging channel.

Depending on the source code, it may store:

- AI requests
- AI responses
- Administrative actions
- Startup events
- Error messages
- System diagnostics

This channel should normally remain private and only be accessible to trusted leadership.

---

## LEADERSHIP_ROLE_ID

```env
LEADERSHIP_ROLE_ID=YOUR_LEADERSHIP_ROLE_ID
```

This Discord Role ID identifies members who have elevated permissions.

Leadership members may receive access to administrative AI commands, configuration tools, or moderation features depending on the version of the bot.

---

## LEADERSHIP_USER_IDS

```env
LEADERSHIP_USER_IDS=YOUR_DISCORD_USER_ID
```

This variable stores one or more approved Discord User IDs.

These users may receive administrative access even if Discord role permissions change.

If multiple IDs are supported, separate them with commas.

Example:

```env
LEADERSHIP_USER_IDS=111111111111111111,222222222222222222
```

Refer to `index.js` to verify the supported format.

---

## GEMINI_API_KEY

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

This is the credential used to communicate with Google's Gemini AI service.

Every AI request made by the bot is authenticated using this API Key.

If the key is missing, invalid, expired, or revoked, the bot will not be able to generate AI responses.

---

## GEMINI_MODEL

```env
GEMINI_MODEL=gemini-2.5-flash
```

This specifies which Gemini model the bot should use.

Changing this value may affect:

- Response speed
- AI capabilities
- Context window
- Availability
- Usage costs (if applicable)

Use a model that is supported by your Google AI account and compatible with the version of the Google AI SDK used by this project.

---

# Correct .env Example

```env
DISCORD_TOKEN=YOUR_BOT_TOKEN
CLIENT_ID=YOUR_CLIENT_ID
GUILD_ID=YOUR_SERVER_ID

AI_HUB_CHANNEL_ID=YOUR_AI_HUB_CHANNEL_ID
AI_LOGS_CHANNEL_ID=YOUR_AI_LOGS_CHANNEL_ID

LEADERSHIP_ROLE_ID=YOUR_LEADERSHIP_ROLE_ID
LEADERSHIP_USER_IDS=YOUR_DISCORD_USER_ID

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
GEMINI_MODEL=gemini-2.5-flash
```

Never include spaces around the equals sign.

Correct:

```env
CLIENT_ID=123456789012345678
```

Incorrect:

```env
CLIENT_ID = 123456789012345678
```
---

# Project Files Explained

Understanding the project structure will make it easier to customize, troubleshoot, and maintain Flapjack Kipper AI.

Below are the most common files included in this repository.

---

## index.js

The `index.js` file is the heart of the project.

This file contains the primary source code that controls how Flapjack Kipper AI operates.

Depending on the version of the project, `index.js` may handle:

- Logging into Discord
- Connecting to Google's Gemini AI
- Registering slash commands
- Processing AI prompts
- Sending prompts to Gemini
- Receiving AI responses
- Posting replies back into Discord
- Leadership permission checks
- Logging AI activity
- Error handling
- Startup events
- Configuration loading
- Channel validation

Most users will never need to modify this file unless they want to add new features or customize the bot's behavior.

---

## package.json

The `package.json` file contains information about the project itself.

It includes:

- Project name
- Version
- Description
- Author
- Required dependencies
- Start scripts
- npm configuration

It also tells npm which packages need to be installed before the bot can run.

Do not delete or rename this file.

---

## package-lock.json

This file is automatically generated by npm.

It records the exact versions of every installed dependency.

Keeping this file helps ensure that other users install the same versions of packages that were used during development.

Normally, you should leave this file unchanged unless dependencies are intentionally updated.

---

## .env

The `.env` file stores all private configuration values used by the bot.

Examples include:

- Discord Bot Token
- Client ID
- Server ID
- AI Hub Channel ID
- AI Logs Channel ID
- Leadership Role ID
- Leadership User IDs
- Gemini API Key
- Gemini Model

This file should **never** be uploaded to a public GitHub repository.

---

## .env.example

The `.env.example` file contains placeholder values instead of real credentials.

Example:

```env
DISCORD_TOKEN=YOUR_BOT_TOKEN
CLIENT_ID=YOUR_CLIENT_ID
GUILD_ID=YOUR_SERVER_ID

AI_HUB_CHANNEL_ID=YOUR_AI_HUB_CHANNEL_ID
AI_LOGS_CHANNEL_ID=YOUR_AI_LOGS_CHANNEL_ID

LEADERSHIP_ROLE_ID=YOUR_LEADERSHIP_ROLE_ID
LEADERSHIP_USER_IDS=YOUR_DISCORD_USER_ID

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
GEMINI_MODEL=gemini-2.5-flash
```

When downloading this repository:

1. Copy `.env.example`.
2. Rename the copy to `.env`.
3. Replace every placeholder with your own values.

---

## .gitignore

The `.gitignore` file tells Git which files should never be uploaded.

Recommended entries include:

```gitignore
.env
node_modules/
```

This helps prevent sensitive credentials from being published accidentally.

If your Bot Token or Gemini API Key is ever committed to GitHub, revoke and replace those credentials immediately.

---

## README.md

This document.

It explains how to install, configure, operate, and customize Flapjack Kipper AI.

---

# Importing the Project into Replit

Replit provides an easy way to run Node.js projects without installing software locally.

To import the repository:

1. Visit:

https://replit.com/import

2. Sign in to your Replit account.

3. Connect your GitHub account if prompted.

4. Select your Flapjack Kipper AI repository.

5. Import the project.

6. Wait for Replit to finish creating the workspace.

Once imported, verify that important files are present, including:

- `index.js`
- `package.json`
- `package-lock.json`
- `.gitignore`
- `.env.example`
- `README.md`

---

# Adding Replit Secrets

Instead of storing sensitive information inside the repository, Replit provides **Secrets**, which function as secure environment variables.

Inside your Replit project:

1. Open **Tools**.
2. Select **Secrets**.
3. Add each required environment variable individually.

Create the following keys:

- DISCORD_TOKEN
- CLIENT_ID
- GUILD_ID
- AI_HUB_CHANNEL_ID
- AI_LOGS_CHANNEL_ID
- LEADERSHIP_ROLE_ID
- LEADERSHIP_USER_IDS
- GEMINI_API_KEY
- GEMINI_MODEL

Example:

Key:

```
CLIENT_ID
```

Value:

```
123456789012345678
```

Do **not** include the variable name in the value field.

Incorrect:

```
CLIENT_ID=123456789012345678
```

---

# Running the Bot in Replit

After configuring your Secrets:

1. Confirm all required variables have been added.
2. Verify that all dependencies are installed.
3. Click the **Run** button.
4. Wait for the console to initialize.
5. Watch for any startup errors.
6. Confirm that the bot connects to Discord.
7. Verify that the bot appears online in your server.

If Replit asks which file to execute, select:

```
index.js
```

---

# Running the Bot Locally

Flapjack Kipper AI can also run on your own computer.

Recommended editors include:

- Visual Studio Code
- Cursor
- WebStorm
- Any Node.js-compatible IDE

Before running locally:

- Install Node.js.
- Download the project.
- Create a `.env` file.
- Install all required dependencies.

---

# Installing Node.js

Download the latest **LTS (Long-Term Support)** version of Node.js.

Official website:

https://nodejs.org

After installation, open a terminal or command prompt.

Verify the installation:

```bash
node -v
```

You should see a version number.

Also verify npm:

```bash
npm -v
```

If both commands return version numbers, Node.js has been installed successfully.

---

# Installing Dependencies

Navigate to the project folder.

Run:

```bash
npm install
```

This command downloads every dependency listed in `package.json`.

A new folder named:

```
node_modules
```

will be created automatically.

Do not create this folder manually.

---

# Starting the Bot

Once everything has been configured, start the bot.

Option 1:

```bash
node index.js
```

Option 2 (if configured in `package.json`):

```bash
npm start
```

The console should display startup messages indicating that the bot is connecting to Discord.

If the connection is successful:

- The bot will appear online.
- Slash commands (if applicable) will become available.
- The AI service will initialize.
- The bot will be ready to receive requests.

---

# Registering Slash Commands

Some versions of Flapjack Kipper AI automatically register slash commands when the bot starts.

Others may use a separate command registration script.

If your version includes a dedicated command registration file (such as `deploy-commands.js`), run that script before starting the bot.

If your version registers commands automatically through `index.js`, no additional action is required.

Refer to the files included in your version of the repository to determine which method is used.

---

# Verifying Startup

Before using Flapjack Kipper AI, confirm the following:

- The bot is online in Discord.
- No errors appear in the console.
- The Gemini API initializes successfully.
- Slash commands are available (if supported).
- The AI Hub channel is configured correctly.
- The AI Logs channel is configured correctly.
- Leadership permissions are functioning as expected.

Once these checks are complete, Flapjack Kipper AI is ready to begin responding to AI requests.

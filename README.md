# 📅 Grimwood Schedule Board

## Everything You Need to Know

Grimwood Schedule Board is a Discord scheduling and staff-management bot originally created for Grimwood Forest Creative & Operations.

It allows authorized leadership members to organize staff schedules, assign shifts, mark staff members as off, review daily and monthly schedules, receive schedule requests, and maintain a clear record of scheduling changes.

This repository contains the source code needed to create and operate your own version of Grimwood Schedule Board.

> **Important:** This repository provides the source code only. It does not provide access to the original Grimwood Forest Discord server, private staff information, original Discord bot account, original bot token, private channels, hosting account, or private environment variables.

You must create your own Discord application, invite your own bot, configure your own server roles and channels, and provide your own private environment variables.

---

# 📋 Table of Contents

- [What Grimwood Schedule Board Does](#what-grimwood-schedule-board-does)
- [Important Security Information](#important-security-information)
- [What You Need](#what-you-need)
- [Create a Discord Application](#create-a-discord-application)
- [Create the Bot Account](#create-the-bot-account)
- [Find the Bot Token](#find-the-bot-token)
- [Find the Application ID](#find-the-application-id)
- [Configure the Bot](#configure-the-bot)
- [Invite the Bot](#invite-the-bot)
- [Recommended Discord Permissions](#recommended-discord-permissions)
- [Enable Discord Developer Mode](#enable-discord-developer-mode)
- [Create the Required Discord Roles](#create-the-required-discord-roles)
- [Create the Required Discord Channels](#create-the-required-discord-channels)
- [Environment Variables](#environment-variables)
- [Environment Variable Explanations](#environment-variable-explanations)
- [Project Files Explained](#project-files-explained)
- [Importing the Project Into Replit](#importing-the-project-into-replit)
- [Adding Secrets in Replit](#adding-secrets-in-replit)
- [Running the Bot in Replit](#running-the-bot-in-replit)
- [Using Another Code Editor](#using-another-code-editor)
- [Installing Dependencies](#installing-dependencies)
- [Starting the Bot](#starting-the-bot)
- [Scheduling Commands](#scheduling-commands)
- [Leadership Permissions](#leadership-permissions)
- [Schedule Channels](#schedule-channels)
- [Date and Time Format](#date-and-time-format)
- [How Schedule Data Works](#how-schedule-data-works)
- [Updating the Bot](#updating-the-bot)
- [Troubleshooting](#troubleshooting)
- [Testing Checklist](#testing-checklist)
- [Privacy and Staff Information](#privacy-and-staff-information)
- [Credits](#credits)
- [Disclaimer](#disclaimer)
- [Official Resources](#official-resources)

---

# What Grimwood Schedule Board Does

Grimwood Schedule Board is designed to organize staff scheduling inside a Discord server.

Depending on the version of the source code included in this repository, the bot may support:

- Adding staff members to the scheduling system
- Removing staff members from the scheduling system
- Viewing the current staff list
- Assigning work shifts
- Marking staff members as off
- Removing scheduled shifts
- Viewing one day's schedule
- Viewing an entire month's schedule
- Posting the daily schedule
- Posting today's schedule automatically or manually
- Posting a monthly schedule
- Recording scheduling changes
- Receiving schedule requests
- Restricting commands to leadership
- Recognizing leadership through Discord roles
- Recognizing approved users through direct Discord User IDs
- Operating in one selected Discord server
- Displaying schedules in organized Discord embeds
- Using Eastern Time or another configured timezone
- Running a small web service for hosting or uptime monitoring

The exact behavior and available commands depend on the current version of `index.js`.

---

# Important Security Information

Never publicly share:

- Your Discord bot token
- Your private `.env` file
- Your Replit Secrets
- Private staff schedules
- Private Discord User IDs when you do not intend to publish them
- Private channel IDs
- Private organizational information

Your Discord bot token works like a password.

Anyone who obtains the token may be able to log in as your bot.

Never place your real token:

- In this README
- Directly inside `index.js`
- In a public Discord message
- In a screenshot
- In a public GitHub repository
- In a support request
- In a public `.env` file

If your token is accidentally exposed:

1. Open the Discord Developer Portal.
2. Select your Discord application.
3. Open the **Bot** section.
4. Reset the token.
5. Copy the new token.
6. Replace the old token in Replit Secrets or your private `.env`.
7. Restart the bot.

---

# What You Need

Before using Grimwood Schedule Board, you need:

- A Discord account
- A Discord server
- Permission to add bots to the server
- Permission to create roles and channels
- A Discord application
- A Discord bot account
- The files from this repository
- A Node.js-compatible environment
- Internet access
- A place to keep the bot running

You may run the bot using:

- Replit
- Visual Studio Code
- Another Node.js editor
- A hosting provider
- Your own computer
- Your own server

Replit is recommended for beginners because the project files, console, packages, Secrets, and Run button are available in one place.

---

# Useful Links

Discord Developer Portal:

https://discord.com/developers/home

Discord Applications:

https://discord.com/developers/applications

Replit:

https://replit.com/

Replit Import:

https://replit.com/import

GitHub:

https://github.com/

Node.js:

https://nodejs.org/

---

# Create a Discord Application

The first step is creating a Discord application.

1. Visit:

   https://discord.com/developers/home

2. Sign in with your Discord account.

3. Open the **Applications** page.

4. Select **New Application**, **Create Application**, or the current application-creation option.

5. Enter the application name.

The recommended name is:

```text
Grimwood Schedule Board
```

You may use another name if you are creating your own customized version.

6. Accept Discord's required terms or confirmation checkbox.

7. Select **Create**.

The Discord application is the main container for:

- The bot account
- The bot token
- The Application ID
- Installation settings
- OAuth2 settings
- Slash commands
- Gateway Intents
- Bot permissions

---

# Create the Bot Account

After creating the application:

1. Open the application.
2. Select **Bot** from the left menu.
3. Select **Add Bot**, **Build a Bot**, or the current equivalent.
4. Confirm the action.
5. Enter the bot's display name.
6. Upload a bot icon if desired.
7. Save the changes.

The application and bot account are connected, but they are not exactly the same thing.

- The **application** holds the settings.
- The **bot account** appears in your Discord server.
- The **token** allows the source code to log in as the bot.

---

# Find the Bot Token

Inside the Discord Developer Portal:

1. Open your Grimwood Schedule Board application.
2. Select **Bot**.
3. Locate the Token section.
4. Select **Reset Token**, **View Token**, or **Copy Token**.
5. Complete any required verification.
6. Copy the token.
7. Store it privately.

The environment variable is:

```env
SCHEDULE_BOARD_TOKEN=YOUR_BOT_TOKEN
```

Do not enter the variable name twice.

Incorrect:

```env
SCHEDULE_BOARD_TOKEN=SCHEDULE_BOARD_TOKEN=YOUR_BOT_TOKEN
```

Correct:

```env
SCHEDULE_BOARD_TOKEN=YOUR_BOT_TOKEN
```

---

# Find the Application ID

The Application ID is also called the Client ID.

To find it:

1. Open your application.
2. Select **General Information**.
3. Locate **Application ID**.
4. Copy the number.

Place it in:

```env
SCHEDULE_BOARD_CLIENT_ID=YOUR_CLIENT_ID
```

Example format:

```env
SCHEDULE_BOARD_CLIENT_ID=123456789012345678
```

The Application ID must belong to the same Discord application as the bot token.

---

# Configure the Bot

Open the **Bot** section of the Discord Developer Portal.

Depending on the included code, Grimwood Schedule Board may require Gateway Intents.

Possible intents include:

- Server Members Intent
- Message Content Intent
- Presence Intent

A scheduling bot may require **Server Members Intent** if it searches for staff members, reads member information, or verifies member roles.

A slash-command-only bot may not require Message Content Intent unless it also reads normal messages.

Only enable the intents required by the source code.

Remember to save your changes.

---

# Invite the Bot

Discord applications commonly use the **Installation** page to generate an installation link.

1. Open the Discord application.
2. Select **Installation**.
3. Enable installation to a Discord server.
4. Add the required scopes.

The bot normally needs:

```text
bot
applications.commands
```

The `bot` scope adds the bot to your server.

The `applications.commands` scope allows Discord slash commands to appear.

5. Choose the necessary permissions.
6. Copy the installation link.
7. Open the link.
8. Select your server.
9. Review the permissions.
10. Select **Authorize**.
11. Complete the verification challenge if Discord displays one.

The bot may remain offline until its code is running.

---

# Recommended Discord Permissions

The exact permissions depend on the version of the source code.

Grimwood Schedule Board may require:

- View Channels
- Send Messages
- Embed Links
- Read Message History
- Use Application Commands
- Add Reactions
- Attach Files
- Manage Messages, if the bot removes or updates messages
- Manage Threads, if scheduling requests use threads
- Create Public Threads, if supported
- Create Private Threads, if supported
- Send Messages in Threads
- Manage Roles, only if the bot changes staff roles
- Manage Nicknames, only if the code changes nicknames

Administrator permission may be used during testing, but it gives the bot complete access to nearly all server permissions.

For a permanent public or production server, grant only the permissions the bot genuinely requires.

---

# Enable Discord Developer Mode

Developer Mode allows you to copy Discord IDs.

In Discord:

1. Open **User Settings**.
2. Select **Advanced**.
3. Enable **Developer Mode**.

After enabling Developer Mode, you can copy:

- Server IDs
- Channel IDs
- User IDs
- Role IDs
- Message IDs

Discord IDs are long numbers similar to:

```text
123456789012345678
```

---

# Create the Required Discord Roles

Grimwood Schedule Board uses leadership roles to control restricted commands.

The original role structure included:

```text
Chairman
Vice Chairman
Chief Administrative Officer
```

You may create the same roles or adapt the bot for your own organization.

## Chairman Role

Create a Discord role named:

```text
Chairman
```

To copy the Role ID:

1. Open **Server Settings**.
2. Select **Roles**.
3. Locate the Chairman role.
4. Right-click the role.
5. Select **Copy Role ID**.

Add it to:

```env
CHAIRMAN_ROLE_ID=YOUR_CHAIRMAN_ROLE_ID
```

## Vice Chairman Role

Create a role named:

```text
Vice Chairman
```

Copy its Role ID and add it to:

```env
VICE_CHAIRMAN_ROLE_ID=YOUR_VICE_CHAIRMAN_ROLE_ID
```

## Chief Administrative Officer Role

Create a role named:

```text
Chief Administrative Officer
```

Copy its Role ID and add it to:

```env
CHIEF_ADMINISTRATIVE_OFFICER_ROLE_ID=YOUR_CHIEF_ADMINISTRATIVE_OFFICER_ROLE_ID
```

The exact role names shown in Discord may be changed, but the IDs in the environment variables must point to the correct roles.

---

# Create the Required Discord Channels

The original Grimwood Schedule Board system used three primary channels.

## Schedule Board Channel

Suggested channel name:

```text
schedule-board
```

This channel is used to display:

- Daily schedules
- Monthly schedules
- Staff assignments
- Schedule updates
- Official schedule board messages

Copy the Channel ID and place it in:

```env
SCHEDULE_BOARD_CHANNEL_ID=YOUR_SCHEDULE_BOARD_CHANNEL_ID
```

## Schedule Log Channel

Suggested channel name:

```text
schedule-log
```

This channel records administrative activity such as:

- Staff added
- Staff removed
- Shift assigned
- Shift removed
- Staff marked off
- Schedule changed
- Schedule posted
- Leadership actions
- System events

This channel should normally be private and visible only to authorized leadership.

Copy the Channel ID and place it in:

```env
SCHEDULE_LOG_CHANNEL_ID=YOUR_SCHEDULE_LOG_CHANNEL_ID
```

## Schedule Requests Channel

Suggested channel name:

```text
schedule-requests
```

This channel may be used for:

- Availability requests
- Time-off requests
- Shift-change requests
- Schedule questions
- Rescheduling requests
- Leadership responses

Copy the Channel ID and place it in:

```env
SCHEDULE_REQUESTS_CHANNEL_ID=YOUR_SCHEDULE_REQUESTS_CHANNEL_ID
```

---

# Environment Variables

Grimwood Schedule Board requires the following environment variables:

```env
SCHEDULE_BOARD_TOKEN=YOUR_BOT_TOKEN
SCHEDULE_BOARD_CLIENT_ID=YOUR_CLIENT_ID
GUILD_ID=YOUR_SERVER_ID

LEADERSHIP_USER_IDS=YOUR_DISCORD_USER_ID

CHAIRMAN_ROLE_ID=YOUR_CHAIRMAN_ROLE_ID
VICE_CHAIRMAN_ROLE_ID=YOUR_VICE_CHAIRMAN_ROLE_ID
CHIEF_ADMINISTRATIVE_OFFICER_ROLE_ID=YOUR_CHIEF_ADMINISTRATIVE_OFFICER_ROLE_ID

SCHEDULE_BOARD_CHANNEL_ID=YOUR_SCHEDULE_BOARD_CHANNEL_ID
SCHEDULE_LOG_CHANNEL_ID=YOUR_SCHEDULE_LOG_CHANNEL_ID
SCHEDULE_REQUESTS_CHANNEL_ID=YOUR_SCHEDULE_REQUESTS_CHANNEL_ID

PORT=3000
```

The private file must be named exactly:

```text
.env
```

Do not name it:

```text
folder.env
folder.evn
env.txt
.env.txt
```

A misspelled filename may prevent the bot from loading its settings.

---

# Environment Variable Explanations

## `SCHEDULE_BOARD_TOKEN`

```env
SCHEDULE_BOARD_TOKEN=YOUR_BOT_TOKEN
```

This is the private token for the Grimwood Schedule Board Discord bot.

The code uses it to log in to Discord.

Never publish it.

---

## `SCHEDULE_BOARD_CLIENT_ID`

```env
SCHEDULE_BOARD_CLIENT_ID=YOUR_CLIENT_ID
```

This is the Discord Application ID.

The bot may use it to register slash commands for the correct Discord application.

---

## `GUILD_ID`

```env
GUILD_ID=YOUR_SERVER_ID
```

This is the Discord Server ID.

Discord internally calls a server a **guild**.

The code may use this ID to:

- Register commands in one server
- Find server members
- Locate roles
- Locate channels
- Restrict the bot to a selected server

To obtain it:

1. Enable Developer Mode.
2. Right-click your Discord server.
3. Select **Copy Server ID**.

---

## `LEADERSHIP_USER_IDS`

```env
LEADERSHIP_USER_IDS=YOUR_DISCORD_USER_ID
```

This identifies one or more Discord users who always have leadership access.

This acts as a direct permission override.

It may allow an authorized owner or administrator to use leadership commands even if:

- Their role is changed
- Their leadership role is temporarily removed
- The Discord role system is misconfigured
- A permission problem occurs

For multiple users, the bot may support comma-separated IDs:

```env
LEADERSHIP_USER_IDS=111111111111111111,222222222222222222
```

Check `index.js` to confirm the expected format.

---

## `CHAIRMAN_ROLE_ID`

```env
CHAIRMAN_ROLE_ID=YOUR_CHAIRMAN_ROLE_ID
```

This identifies the Discord Chairman role.

Members with this role may receive access to restricted scheduling commands.

---

## `VICE_CHAIRMAN_ROLE_ID`

```env
VICE_CHAIRMAN_ROLE_ID=YOUR_VICE_CHAIRMAN_ROLE_ID
```

This identifies the Discord Vice Chairman role.

Members with this role may receive access to restricted scheduling commands.

---

## `CHIEF_ADMINISTRATIVE_OFFICER_ROLE_ID`

```env
CHIEF_ADMINISTRATIVE_OFFICER_ROLE_ID=YOUR_CHIEF_ADMINISTRATIVE_OFFICER_ROLE_ID
```

This identifies the Chief Administrative Officer role.

Members with this role may receive access to restricted scheduling commands.

---

## `SCHEDULE_BOARD_CHANNEL_ID`

```env
SCHEDULE_BOARD_CHANNEL_ID=YOUR_SCHEDULE_BOARD_CHANNEL_ID
```

This identifies the official Discord channel where schedule-board posts are sent.

---

## `SCHEDULE_LOG_CHANNEL_ID`

```env
SCHEDULE_LOG_CHANNEL_ID=YOUR_SCHEDULE_LOG_CHANNEL_ID
```

This identifies the private channel used to record schedule changes and administrative actions.

---

## `SCHEDULE_REQUESTS_CHANNEL_ID`

```env
SCHEDULE_REQUESTS_CHANNEL_ID=YOUR_SCHEDULE_REQUESTS_CHANNEL_ID
```

This identifies the channel used for staff scheduling requests and related communication.

---

## `PORT`

```env
PORT=3000
```

This is the port used by the bot's small web server.

A web server may be included so that:

- A hosting provider can detect that the application is running
- An uptime service can open a web address
- Replit can expose a public application URL
- The project can respond to basic health checks

Unless your hosting provider tells you to change it, leave it as:

```env
PORT=3000
```

Some hosting services automatically provide a port through their own environment variables. The source code may use the hosting provider's assigned port before falling back to `3000`.

---

# Correct `.env` Example

```env
SCHEDULE_BOARD_TOKEN=YOUR_PRIVATE_BOT_TOKEN
SCHEDULE_BOARD_CLIENT_ID=YOUR_APPLICATION_ID
GUILD_ID=YOUR_DISCORD_SERVER_ID

LEADERSHIP_USER_IDS=YOUR_DISCORD_USER_ID

CHAIRMAN_ROLE_ID=YOUR_CHAIRMAN_ROLE_ID
VICE_CHAIRMAN_ROLE_ID=YOUR_VICE_CHAIRMAN_ROLE_ID
CHIEF_ADMINISTRATIVE_OFFICER_ROLE_ID=YOUR_CHIEF_ADMINISTRATIVE_OFFICER_ROLE_ID

SCHEDULE_BOARD_CHANNEL_ID=YOUR_SCHEDULE_BOARD_CHANNEL_ID
SCHEDULE_LOG_CHANNEL_ID=YOUR_SCHEDULE_LOG_CHANNEL_ID
SCHEDULE_REQUESTS_CHANNEL_ID=YOUR_SCHEDULE_REQUESTS_CHANNEL_ID

PORT=3000
```

Do not include spaces around the equals signs.

Recommended:

```env
GUILD_ID=123456789012345678
```

Avoid:

```env
GUILD_ID = 123456789012345678
```

---

# Project Files Explained

## `index.js`

```text
index.js
```

This is the main source-code file.

It may contain:

- Discord client configuration
- Bot login
- Slash-command registration
- Staff management
- Schedule assignment
- Schedule removal
- Days-off management
- Schedule posting
- Permission checks
- Role checks
- User-ID overrides
- Channel checks
- Schedule logs
- Date formatting
- Data storage
- Web server code
- Error handling

This is normally the main file that Node.js runs.

---

## `package.json`

```text
package.json
```

This file describes the Node.js project.

It may include:

- Project name
- Project version
- Required npm packages
- Start commands
- Runtime information
- Project metadata

Do not delete this file.

---

## `package-lock.json`

```text
package-lock.json
```

This records the exact package versions installed by npm.

It helps keep installations consistent.

Do not manually edit it unless you understand npm package management.

---

## `.env`

```text
.env
```

This is the private configuration file.

It stores:

- Bot token
- Application ID
- Server ID
- Leadership IDs
- Role IDs
- Channel IDs
- Port setting

Never upload a real `.env` file publicly.

---

## `.gitignore`

```text
.gitignore
```

This tells Git which files should not be uploaded.

It should normally include:

```gitignore
.env
node_modules/
```

If a secret was already uploaded before `.gitignore` was added, adding `.gitignore` does not make the old secret safe.

Reset any exposed bot token.

---

## `.replit`

```text
.replit
```

This contains Replit-specific project settings.

It may define:

- The run command
- The main file
- The runtime
- Replit workspace behavior

---

## Data Files

The repository may contain JSON files or a data folder.

These may store:

- Staff members
- Staff Discord IDs
- Scheduled dates
- Shift start times
- Shift end times
- Days off
- Availability
- Notes
- Schedule-post information
- Previous board-message IDs

Do not remove data files without checking `index.js`.

Search the source code for the filename before deleting or renaming it.

---

# Importing the Project Into Replit

Replit can import a public GitHub repository.

1. Visit:

   https://replit.com/import

2. Select the GitHub import option.

3. Paste the repository URL or connect your GitHub account.

4. Select the Grimwood Schedule Board repository.

5. Allow Replit to create the project.

6. Wait for the files to load.

7. Confirm that you can see files such as:

```text
index.js
package.json
package-lock.json
.replit
.gitignore
```

8. Do not expect private Secrets or environment variables to import automatically.

You must add those separately.

---

# Adding Secrets in Replit

Replit allows environment variables to be stored using its Secrets tool.

This is safer than placing a real token in a publicly visible file.

1. Open the imported Replit project.
2. Open **Tools**.
3. Find **Secrets** or the environment-variable tool.
4. Select **New Secret**.
5. Add each key and value separately.

Add these keys:

```text
SCHEDULE_BOARD_TOKEN
SCHEDULE_BOARD_CLIENT_ID
GUILD_ID
LEADERSHIP_USER_IDS
CHAIRMAN_ROLE_ID
VICE_CHAIRMAN_ROLE_ID
CHIEF_ADMINISTRATIVE_OFFICER_ROLE_ID
SCHEDULE_BOARD_CHANNEL_ID
SCHEDULE_LOG_CHANNEL_ID
SCHEDULE_REQUESTS_CHANNEL_ID
PORT
```

Example:

Key:

```text
GUILD_ID
```

Value:

```text
123456789012345678
```

Do not enter this entire line as the value:

```text
GUILD_ID=123456789012345678
```

The key and value are entered into separate boxes in Replit.

For the port:

Key:

```text
PORT
```

Value:

```text
3000
```

Replit imports project files, but private secrets and API keys must be added separately. :contentReference[oaicite:0]{index=0}

---

# Running the Bot in Replit

After importing the project and adding the Secrets:

1. Confirm that `index.js` exists.
2. Confirm that `package.json` exists.
3. Install the packages if Replit has not already done so.
4. Press **Run**.
5. Watch the Console.
6. Wait for the bot-ready message.
7. Open Discord.
8. Confirm that the correct bot account appears online.
9. Type `/` in the server.
10. Confirm that the schedule commands appear.

If Replit asks which file to run, select:

```text
index.js
```

If the project includes a web server, Replit may also display an application preview or public URL.

---

# Using Another Code Editor

You may also use Visual Studio Code or another Node.js-compatible editor.

1. Download Node.js:

   https://nodejs.org/

2. Download the repository.
3. Extract the ZIP.
4. Open the project folder in your code editor.
5. Create a private `.env` file.
6. Add the environment variables.
7. Open a terminal in the project folder.
8. Install the dependencies.
9. Start the bot.
10. Keep the terminal open while the bot is running.

Node.js is the runtime that executes the JavaScript bot code. :contentReference[oaicite:1]{index=1}

---

# Installing Dependencies

Open a terminal or Replit Shell and run:

```bash
npm install
```

This reads `package.json` and installs the required npm packages.

The packages may include:

- `discord.js`
- `dotenv`
- `express`
- Date or timezone packages
- Other packages required by the code

Do not manually create the `node_modules` folder.

npm creates it automatically.

---

# Starting the Bot

Start the project with:

```bash
node index.js
```

The project may also support:

```bash
npm start
```

Check the `scripts` section inside `package.json`.

Example:

```json
"scripts": {
  "start": "node index.js"
}
```

If that exists, `npm start` should work.

---

# Scheduling Commands

The included version may contain commands similar to the following.

## Staff Management

```text
/staffadd
```

Adds a staff member to the scheduling system.

```text
/staffremove
```

Removes a staff member from the scheduling system.

```text
/stafflist
```

Displays the current staff list.

## Schedule Management

```text
/scheduleassign
```

Assigns a shift to a staff member.

The command may request:

- Staff member
- Date
- Start time
- End time
- Notes
- Status

```text
/scheduleoff
```

Marks a staff member as off on a selected date.

```text
/scheduleremove
```

Removes an existing schedule entry.

## Schedule Viewing

```text
/scheduleviewday
```

Displays the schedule for one selected date.

```text
/scheduleviewmonth
```

Displays the schedule for a selected month.

## Schedule Posting

```text
/schedulepostday
```

Posts the schedule for a selected day.

```text
/scheduleposttoday
```

Posts the current day's schedule.

```text
/schedulepostmonth
```

Posts the schedule for a selected month.

The exact command names and required options are controlled by `index.js`.

If a listed command is not available, inspect the current source code or type `/` in Discord to view the registered commands.

---

# Leadership Permissions

Restricted schedule commands may be available to users who meet at least one leadership requirement.

The bot may check for:

- Chairman role
- Vice Chairman role
- Chief Administrative Officer role
- Direct User ID inside `LEADERSHIP_USER_IDS`

This provides two forms of authorization:

## Role-Based Authorization

A member receives access because they hold an approved Discord role.

## Direct User Authorization

A member receives access because their Discord User ID is listed directly.

The direct User ID option may protect the primary owner from being locked out if a role is accidentally removed.

Regular staff members should not receive access to restricted management commands unless the source code explicitly allows it.

---

# Schedule Channels

## Schedule Board

Used for official schedule posts.

Recommended permissions:

- Staff can view
- Leadership can manage
- Bot can send messages
- Bot can embed links
- Bot can read message history

## Schedule Log

Used for private administrative records.

Recommended permissions:

- Leadership can view
- Regular staff cannot view
- Bot can send messages
- Bot can embed links
- Bot can read message history

## Schedule Requests

Used for schedule-related requests.

Recommended permissions depend on your organization.

Possible setup:

- Staff can view
- Staff can send messages
- Leadership can respond
- Bot can send messages
- Bot can create or manage threads if supported

---

# Date and Time Format

The original Schedule Board may use a date format similar to:

```text
YYYY-MM-DD
```

Example:

```text
2026-03-07
```

This means:

```text
Year-Month-Day
```

Month number reference:

```text
January   = 01
February  = 02
March     = 03
April     = 04
May       = 05
June      = 06
July      = 07
August    = 08
September = 09
October   = 10
November  = 11
December  = 12
```

Examples:

```text
March 7, 2026 = 2026-03-07
July 28, 2026 = 2026-07-28
October 31, 2026 = 2026-10-31
```

Do not enter:

```text
March 7
```

unless the current source code includes natural-language date parsing.

Times may use:

```text
9:00 AM
5:00 PM
```

or a 24-hour format, depending on the code.

---

# How Schedule Data Works

Grimwood Schedule Board may save scheduling information in local JSON files.

JSON is a plain-text data format.

The data may include:

- Staff Discord User IDs
- Staff display names
- Dates
- Shift start times
- Shift end times
- Days off
- Notes
- Statuses
- Schedule-post message IDs
- Previous board information

Do not manually edit a data file while the bot is running unless you understand its structure.

A missing comma, quote, bracket, or property may cause the bot to stop reading the file.

Before manually editing schedule data:

1. Stop the bot.
2. Back up the file.
3. Make the changes.
4. Validate the JSON.
5. Restart the bot.
6. Review the Console for errors.
7. Test the schedule commands.

---

# Possible Schedule Statuses

Depending on the included version, statuses may include:

```text
WORKING
OFF
WORKING FROM HOME
TRAINING
MEETING
RESCHEDULED
TENTATIVE
```

Not every version supports every status.

Check `index.js` for the exact available options.

---

# Updating the Bot

Before installing an updated version:

1. Stop the bot.
2. Back up the private `.env` or Replit Secrets.
3. Back up all schedule-data files.
4. Back up the data folder.
5. Replace the source-code files.
6. Do not overwrite private data unless required.
7. Run:

```bash
npm install
```

8. Restart the bot.
9. Test every command.
10. Confirm that existing schedules still appear.

---

# Troubleshooting

## The Bot Is Offline

Check:

- Is the Replit project running?
- Is `SCHEDULE_BOARD_TOKEN` correct?
- Was the token reset?
- Is the `.env` file named correctly?
- Were Replit Secrets entered correctly?
- Are there errors in the Console?
- Is the hosting service active?

---

## Invalid Token

Possible causes:

- The token was copied incorrectly.
- The token belongs to another bot.
- The token was reset.
- The token contains spaces.
- The variable name was entered twice.
- The secret was placed under the wrong key.

Correct:

```env
SCHEDULE_BOARD_TOKEN=YOUR_TOKEN
```

Incorrect:

```env
SCHEDULE_BOARD_TOKEN=SCHEDULE_BOARD_TOKEN=YOUR_TOKEN
```

---

## The Wrong Bot Logs In

The token belongs to another Discord application.

1. Open the intended Schedule Board application.
2. Open **Bot**.
3. Reset or copy that bot's token.
4. Replace `SCHEDULE_BOARD_TOKEN`.
5. Restart the project.

---

## Slash Commands Do Not Appear

Check:

```env
SCHEDULE_BOARD_CLIENT_ID=YOUR_APPLICATION_ID
GUILD_ID=YOUR_SERVER_ID
```

Also confirm:

- The bot is in the correct server.
- The Client ID belongs to the same application as the token.
- The bot was installed with `applications.commands`.
- The command-registration code ran.
- No registration error appears in the Console.
- The Guild ID contains numbers only.

---

## Leadership Commands Do Not Work

Check:

```env
LEADERSHIP_USER_IDS=YOUR_USER_ID
CHAIRMAN_ROLE_ID=YOUR_ROLE_ID
VICE_CHAIRMAN_ROLE_ID=YOUR_ROLE_ID
CHIEF_ADMINISTRATIVE_OFFICER_ROLE_ID=YOUR_ROLE_ID
```

Confirm:

- You copied a User ID for `LEADERSHIP_USER_IDS`.
- You copied Role IDs for the role variables.
- The user holds one of the approved roles.
- The IDs belong to the correct server.
- The bot was restarted after changing the values.

---

## Schedule Board Channel Not Found

Check:

```env
SCHEDULE_BOARD_CHANNEL_ID=YOUR_CHANNEL_ID
```

Confirm:

- The channel exists.
- The ID is correct.
- The bot can view the channel.
- The bot can send messages.
- The channel belongs to the configured server.

---

## Schedule Log Channel Not Found

Check:

```env
SCHEDULE_LOG_CHANNEL_ID=YOUR_CHANNEL_ID
```

Confirm that the bot can:

- View the channel
- Send messages
- Embed links
- Read message history

---

## Schedule Requests Channel Not Found

Check:

```env
SCHEDULE_REQUESTS_CHANNEL_ID=YOUR_CHANNEL_ID
```

Confirm that the channel still exists and belongs to the configured server.

---

## `Cannot Find Module`

Run:

```bash
npm install
```

Then restart:

```bash
node index.js
```

---

## Port Error

Check:

```env
PORT=3000
```

If the hosting provider automatically assigns a port, confirm that the source code supports:

```js
process.env.PORT
```

Do not run multiple applications on the same local port.

---

## Date Is Rejected

Use:

```text
YYYY-MM-DD
```

Example:

```text
2026-03-07
```

Do not use:

```text
March 7
```

unless the bot version explicitly supports it.

---

## Data Does Not Save

Possible causes:

- The hosting provider uses temporary storage.
- The data file does not exist.
- The JSON is invalid.
- The bot cannot write to the project folder.
- The project was redeployed.
- The source code uses a different filename.
- The app stopped before saving.

Some hosting providers do not guarantee permanent local-file storage.

For long-term use, consider adapting the project to use a permanent database.

---

# Testing Checklist

Before using the bot with real staff, test it inside a private server.

- [ ] The correct bot logs in
- [ ] The bot appears online
- [ ] Slash commands appear
- [ ] The Guild ID is correct
- [ ] The Schedule Board channel is detected
- [ ] The Schedule Log channel is detected
- [ ] The Schedule Requests channel is detected
- [ ] Chairman permissions work
- [ ] Vice Chairman permissions work
- [ ] Chief Administrative Officer permissions work
- [ ] Leadership User ID override works
- [ ] Regular users cannot use restricted commands
- [ ] Staff can be added
- [ ] Staff can be removed
- [ ] Staff list displays correctly
- [ ] A shift can be assigned
- [ ] A staff member can be marked off
- [ ] A schedule entry can be removed
- [ ] Daily schedule view works
- [ ] Monthly schedule view works
- [ ] Daily schedule post works
- [ ] Today's schedule post works
- [ ] Monthly schedule post works
- [ ] Schedule changes are logged
- [ ] Dates display correctly
- [ ] Times display correctly
- [ ] Data remains after a restart
- [ ] No private token is visible publicly

---

# Privacy and Staff Information

This project may store staff scheduling information.

The person operating the bot is responsible for protecting:

- Staff names
- Discord User IDs
- Work schedules
- Availability
- Time-off information
- Shift notes
- Leadership records
- Schedule requests
- Internal organizational information

Before publishing your copy, inspect:

- JSON files
- Data folders
- Log files
- Screenshots
- Example schedules
- Channel IDs
- User IDs
- Role IDs

Remove real staff data before making the repository public.

You may replace sample data with empty structures such as:

```json
{}
```

or:

```json
[]
```

Use the structure expected by `index.js`.

---

# Customization

You may customize your own version by editing `index.js`.

Possible customizations include:

- Bot name
- Role names
- Channel names
- Embed wording
- Schedule statuses
- Date format
- Time format
- Command names
- Leadership requirements
- Logging behavior
- Automatic schedule posting
- Notes
- Rescheduling
- Work-from-home status
- Training status
- Meeting status
- Tentative shifts
- Branding
- Bot icon

Create a backup before changing working code.

Changing slash-command definitions may require the commands to be registered again.

---

# Original Project Information

**Project Name:** Grimwood Schedule Board  
**Project Type:** Discord staff scheduling bot  
**Runtime:** Node.js  
**Primary File:** `index.js`  
**Primary Platform:** Discord  
**Recommended Beginner Platform:** Replit  
**Original Organization:** Grimwood Forest Creative & Operations  

---

# Repository Notes

This repository is a public or archived source-code release.

It is not automatically connected to the original private system.

Downloading this repository does not provide:

- Access to the original Discord server
- Access to original staff schedules
- Original leadership permissions
- Original private channels
- Original Discord token
- Original hosting account
- Original Replit Secrets
- Private staff records
- Guaranteed technical support
- Guaranteed future updates

Each installer must create and manage their own:

- Discord application
- Discord bot
- Server
- Roles
- Channels
- Hosting
- Environment variables
- Staff data
- Backups
- Security settings

---

# Credits

Originally designed and developed for:

```text
Grimwood Forest Creative & Operations
```

Original development and maintenance credited to:

```text
officialdarkevilpark
```

The source code has been preserved so it may be reviewed, archived, learned from, or adapted for another Discord community or organization.

---

# Disclaimer

This software is provided as-is.

The original developer does not guarantee:

- Continuous operation
- Compatibility with future Discord API changes
- Compatibility with every hosting provider
- Permanent data storage
- Recovery of deleted schedules
- Free hosting availability
- Protection from incorrect configuration
- Ongoing updates
- Ongoing technical support
- Compatibility with every Node.js version

Anyone operating or modifying this bot assumes responsibility for:

- Discord configuration
- Bot permissions
- Hosting
- Security
- Token protection
- Staff privacy
- Schedule accuracy
- Backups
- Data loss
- Code modifications
- Discord platform compliance
- Applicable organizational or legal requirements

Discord, Replit, GitHub, Node.js, and npm are separate platforms and are not owned or operated by this project's original developer.

---

# Official Resources

## Discord

Discord Developer Portal:

https://discord.com/developers/home

Discord Applications:

https://discord.com/developers/applications

Discord Developer Documentation:

https://discord.com/developers/docs/intro

Discord Developer Terms:

https://discord.com/developers/docs/policies-and-agreements/developer-terms-of-service

## Replit

Replit Home:

https://replit.com/

Import a Repository:

https://replit.com/import

Replit Documentation:

https://docs.replit.com/

## GitHub

GitHub Home:

https://github.com/

GitHub README Documentation:

https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes

## Node.js and npm

Node.js:

https://nodejs.org/

npm Documentation:

https://docs.npmjs.com/

---

# Final Setup Summary

To operate your own Grimwood Schedule Board bot:

1. Download or import this repository.
2. Create a Discord application.
3. Create the bot account.
4. Copy the bot token.
5. Copy the Application ID.
6. Invite the bot with the `bot` and `applications.commands` scopes.
7. Enable Discord Developer Mode.
8. Create the required leadership roles.
9. Create the required schedule channels.
10. Copy all required Discord IDs.
11. Create a private `.env` file or Replit Secrets.
12. Add all required environment variables.
13. Run `npm install`.
14. Start the project with `node index.js`.
15. Confirm the correct bot appears online.
16. Confirm the slash commands appear.
17. Test leadership permissions.
18. Test staff management.
19. Test schedule assignments.
20. Test schedule posting.
21. Test logging.
22. Back up the schedule data.
23. Protect the bot token.
24. Protect staff information.

---

# Grimwood Schedule Board

**Organized staff scheduling, schedule requests, leadership controls, and operational planning for Discord communities.**

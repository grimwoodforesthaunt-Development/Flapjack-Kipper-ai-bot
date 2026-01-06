require("dotenv").config();

// ✅ Keep-alive web server (for Replit / UptimeRobot)
const http = require("http");
const PORT = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Grimwood Clock Bot is running ✅");
  })
  .listen(PORT, () => console.log("Health server running on port", PORT));

const fs = require("fs");
const path = require("path");
const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// ========= CONFIG =========
const TZ = process.env.TZ || "America/New_York";
const CLOCK_CHANNEL_ID = process.env.CLOCK_CHANNEL_ID;
const ARCHIVE_CHANNEL_ID = process.env.ARCHIVE_CHANNEL_ID;

const ADMIN_USER_IDS = (process.env.ADMIN_USER_IDS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const DATA_FILE = path.join(__dirname, "clock_data.json");

// ========= HELPERS =========
function nowISO() {
  return new Date().toISOString();
}

function formatNY(date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function sameNYDate(a, b) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fmt.format(a) === fmt.format(b);
}

function loadData() {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8")) || [];
  } catch {
    return [];
  }
}

function saveData(arr) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2), "utf8");
}

function addEntry(entry) {
  const data = loadData();
  data.push(entry);
  saveData(data);
}

function isAdmin(userId) {
  return ADMIN_USER_IDS.includes(userId);
}

// ========= SLASH COMMANDS =========
const commands = [
  new SlashCommandBuilder()
    .setName("clockout")
    .setDescription("Clock out for a break")
    .addStringOption((opt) =>
      opt.setName("reason").setDescription("Optional reason")
    ),

  new SlashCommandBuilder()
    .setName("clockin")
    .setDescription("Clock back in from a break")
    .addStringOption((opt) =>
      opt.setName("note").setDescription("Optional note")
    ),

  new SlashCommandBuilder()
    .setName("archive")
    .setDescription("Archive today's clock messages (Admin only)"),
].map((c) => c.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

async function registerCommands() {
  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: commands }
  );
}

// ========= EVENTS =========
client.once("clientReady", async () => {
  console.log(`Logged in as ${client.user.tag}`);
  await registerCommands();
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const userId = interaction.user.id;
  const mention = `<@${userId}>`;
  const now = new Date();
  const stamped = formatNY(now);

  if (interaction.commandName === "clockout") {
    const reason = interaction.options.getString("reason") || "—";
    addEntry({
      type: "OUT",
      userId,
      timestampISO: nowISO(),
      stamped,
      text: reason,
    });
    return interaction.reply(
      `⏸️ ${mention} clocked out at **${stamped} (${TZ})**\nReason: ${reason}`
    );
  }

  if (interaction.commandName === "clockin") {
    const note = interaction.options.getString("note") || "—";
    addEntry({
      type: "IN",
      userId,
      timestampISO: nowISO(),
      stamped,
      text: note,
    });
    return interaction.reply(
      `▶️ ${mention} clocked in at **${stamped} (${TZ})**\nNote: ${note}`
    );
  }

  if (interaction.commandName === "archive") {
    if (!isAdmin(userId)) {
      return interaction.reply({
        content: "You don’t have permission.",
        ephemeral: true,
      });
    }

    const data = loadData().filter((e) =>
      sameNYDate(new Date(e.timestampISO), now)
    );

    if (!data.length) {
      return interaction.reply({
        content: "No entries for today.",
        ephemeral: true,
      });
    }

    const archiveChannel =
      await interaction.guild.channels.fetch(ARCHIVE_CHANNEL_ID);

    await archiveChannel.send(
      `Clock Archive — ${formatNY(now)} (${TZ})`
    );

    for (const e of data) {
      await archiveChannel.send(
        `${e.type === "OUT" ? "⏸️" : "▶️"} <@${e.userId}> at ${e.stamped}\n${e.text}`
      );
    }

    return interaction.reply({
      content: "Archive complete.",
      ephemeral: true,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);

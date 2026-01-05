require("dotenv").config();
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
// Accept either TZ or TIMEZONE in .env
const TZ = process.env.TZ || process.env.TIMEZONE || "America/New_York";

const CLOCK_CHANNEL_ID = process.env.CLOCK_CHANNEL_ID;
const ARCHIVE_CHANNEL_ID = process.env.ARCHIVE_CHANNEL_ID;

// Accept either ADMIN_USER_IDS or OWNER_ID in .env
const ADMIN_USER_IDS = (
  process.env.ADMIN_USER_IDS || process.env.OWNER_ID || ""
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const DATA_FILE = path.join(__dirname, "clock_data.json");

// ========= HELPERS =========
function nowISO() {
  return new Date().toISOString();
}

// Example: Jan 03, 2026, 6:25 PM  (NO seconds)
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
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
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
      opt
        .setName("reason")
        .setDescription("Optional reason (e.g., lunch, meeting, etc.)")
        .setRequired(false)
    ),

  new SlashCommandBuilder()
    .setName("clockin")
    .setDescription("Clock back in from a break")
    .addStringOption((opt) =>
      opt
        .setName("note")
        .setDescription("Optional note (e.g., back, ready, etc.)")
        .setRequired(false)
    ),

  new SlashCommandBuilder()
    .setName("archive")
    .setDescription("Archive today's clock messages (Admin only)"),
].map((c) => c.toJSON());

// Register commands (global)
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });
    console.log("Slash commands registered.");
  } catch (err) {
    console.error("Error registering slash commands:", err);
  }
})();

// ========= BOT EVENTS =========
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log("TZ =", TZ);
  console.log("ADMIN_USER_IDS =", ADMIN_USER_IDS);
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;

    console.log(`Received command: ${interaction.commandName} from ${interaction.user.tag}`);

    // Optional: force clockin/out to run only in clock channel
    if (
      (interaction.commandName === "clockout" ||
        interaction.commandName === "clockin") &&
      CLOCK_CHANNEL_ID &&
      interaction.channelId !== CLOCK_CHANNEL_ID
    ) {
      return interaction.reply({
        content: `Please use this command in the designated clock channel.`,
        ephemeral: true,
      });
    }

    const userId = interaction.user.id;
    const mention = `<@${userId}>`;
    const displayName =
      interaction.member?.displayName ||
      interaction.user.globalName ||
      interaction.user.username;

    const now = new Date();
    const stamped = formatNY(now);

    if (interaction.commandName === "clockout") {
      const reason = interaction.options.getString("reason") || "";
      const msg = `⏸️ ${mention} clocked out at **${stamped} (${TZ})**.\n${
        reason ? `Reason: ${reason}` : `Reason: (none)`
      }`;

      addEntry({
        type: "OUT",
        userId,
        displayName,
        mention,
        timestampISO: nowISO(),
        stamped,
        tz: TZ,
        text: reason || "",
      });

      return interaction.reply({ content: msg });
    }

    if (interaction.commandName === "clockin") {
      const note = interaction.options.getString("note") || "";

      const data = loadData();
      const lastOut = [...data]
        .reverse()
        .find(
          (e) =>
            e.userId === userId &&
            e.type === "OUT" &&
            sameNYDate(new Date(e.timestampISO), now)
        );

      let awayText = "";
      if (lastOut) {
        const ms = now.getTime() - new Date(lastOut.timestampISO).getTime();
        const mins = Math.floor(ms / 60000);
        const secs = Math.floor((ms % 60000) / 1000);
        awayText = ` (away for ${mins}m ${secs}s)`;
      }

      const msg = `▶️ ${mention} clocked in at **${stamped} (${TZ})**${awayText}.\n${
        note ? `Note: ${note}` : `Note: (none)`
      }`;

      addEntry({
        type: "IN",
        userId,
        displayName,
        mention,
        timestampISO: nowISO(),
        stamped,
        tz: TZ,
        text: note || "",
      });

      return interaction.reply({ content: msg });
    }

    if (interaction.commandName === "archive") {
      // Admin lock (you)
      if (!isAdmin(userId)) {
        return interaction.reply({
          content: `You don't have permission to use this command.`,
          ephemeral: true,
        });
      }

      if (!ARCHIVE_CHANNEL_ID || !CLOCK_CHANNEL_ID) {
        return interaction.reply({
          content:
            "Missing ARCHIVE_CHANNEL_ID or CLOCK_CHANNEL_ID in your env. Add them and restart.",
          ephemeral: true,
        });
      }

      await interaction.reply({
        content: `Archiving today's clock messages...`,
        ephemeral: true,
      });

      const guild = interaction.guild;
      const archiveChannel = await guild.channels.fetch(ARCHIVE_CHANNEL_ID);
      const clockChannel = await guild.channels.fetch(CLOCK_CHANNEL_ID);

      const data = loadData();
      const todayEntries = data.filter((e) =>
        sameNYDate(new Date(e.timestampISO), now)
      );

      if (todayEntries.length === 0) {
        return interaction.followUp({
          content: `No clock data found for today.`,
          ephemeral: true,
        });
      }

      const header = `**Clock Archive — ${formatNY(now)} (${TZ})**`;
      const lines = todayEntries.map((e) => {
        const icon = e.type === "OUT" ? "⏸️" : "▶️";
        const label = e.type === "OUT" ? "clocked out" : "clocked in";
        const extra =
          e.type === "OUT"
            ? `Reason: ${e.text || "(none)"}`
            : `Note: ${e.text || "(none)"}`;
        return `${icon} **${e.displayName}** (${e.mention}) ${label} at **${e.stamped} (${TZ})**\n${extra}`;
      });

      // Chunk safely
      const chunks = [];
      let current = header + "\n\n";
      for (const line of lines) {
        if ((current + "\n\n" + line).length > 1900) {
          chunks.push(current);
          current = header + "\n\n" + line;
        } else {
          current += (current.endsWith("\n\n") ? "" : "\n\n") + line;
        }
      }
      if (current.trim()) chunks.push(current);

      for (const chunk of chunks) {
        await archiveChannel.send(chunk);
      }

      // Delete today's bot messages from clock channel
      let deleted = 0;
      let failed = 0;

      let beforeId = undefined;
      for (let rounds = 0; rounds < 10; rounds++) {
        const fetched = await clockChannel.messages.fetch({
          limit: 100,
          before: beforeId,
        });

        if (fetched.size === 0) break;

        const arr = [...fetched.values()];
        beforeId = arr[arr.length - 1].id;

        for (const msg of arr) {
          const isBot = msg.author?.id === client.user.id;
          const isToday = sameNYDate(msg.createdAt, now);

          if (isBot && isToday) {
            try {
              await msg.delete();
              deleted++;
            } catch {
              failed++;
            }
          }
        }
      }

      return interaction.followUp({
        content: `Archive complete. Archived ${todayEntries.length} entries. Deleted ${deleted} messages. Failed ${failed}.`,
        ephemeral: true,
      });
    }
  } catch (err) {
    console.error(err);
    if (interaction.isRepliable()) {
      try {
        await interaction.reply({
          content: "Something went wrong. Check the console logs.",
          ephemeral: true,
        });
      } catch {}
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

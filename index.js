require("dotenv").config();

// ✅ Keep-alive web server (for Replit/UptimeRobot ping)
const http = require("http");
const PORT = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Flapjack Kipper AI is running ✅");
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
  ChannelType,
  PermissionFlagsBits,
} = require("discord.js");

// ====== ENV ======
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const AI_HUB_CHANNEL_ID = process.env.AI_HUB_CHANNEL_ID; // where private threads are created
const LEADERSHIP_ROLE_ID = process.env.LEADERSHIP_ROLE_ID || "";
const DAILY_LIMIT = parseInt(process.env.DAILY_LIMIT || "10", 10);

const LEADERSHIP_USER_IDS = (process.env.LEADERSHIP_USER_IDS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5.2";

if (!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID || !AI_HUB_CHANNEL_ID) {
  console.error("Missing required env vars: DISCORD_TOKEN, CLIENT_ID, GUILD_ID, AI_HUB_CHANNEL_ID");
  process.exit(1);
}

// ====== OPTIONAL OpenAI client ======
let openai = null;
if (OPENAI_API_KEY) {
  // Official OpenAI JS SDK (Responses API) docs: developers.openai.com  [oai_citation:0‡OpenAI Developers](https://developers.openai.com/api/docs/quickstart/)
  const OpenAI = require("openai");
  openai = new OpenAI({ apiKey: OPENAI_API_KEY });
}

// ====== DATA STORE ======
const DATA_FILE = path.join(__dirname, "ai_lounge_store.json");

function loadStore() {
  try {
    if (!fs.existsSync(DATA_FILE)) return { threads: {}, usage: {}, metrics: { opened: 0, closed: 0 } };
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8")) || {};
  } catch {
    return { threads: {}, usage: {}, metrics: { opened: 0, closed: 0 } };
  }
}

function saveStore(obj) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(obj, null, 2), "utf8");
}

function nowISO() {
  return new Date().toISOString();
}

function isLeadership(userId) {
  return LEADERSHIP_USER_IDS.includes(userId);
}

function getDayWindowKey() {
  // rolling 24h window instead of strict day: store timestamps
  return "rolling24h";
}

function canUseAI(userId) {
  const store = loadStore();
  store.usage[userId] ??= { timestamps: [] };

  const now = Date.now();
  const cutoff = now - 24 * 60 * 60 * 1000;
  store.usage[userId].timestamps = store.usage[userId].timestamps.filter((t) => t >= cutoff);

  const allowed = store.usage[userId].timestamps.length < DAILY_LIMIT;
  saveStore(store);
  return { allowed, remaining: Math.max(0, DAILY_LIMIT - store.usage[userId].timestamps.length) };
}

function consumeAIUse(userId) {
  const store = loadStore();
  store.usage[userId] ??= { timestamps: [] };
  store.usage[userId].timestamps.push(Date.now());
  saveStore(store);
}

function ensureThreadMemory(threadId) {
  const store = loadStore();
  store.threads[threadId] ??= {
    createdAt: nowISO(),
    ownerId: "",
    memory: [], // [{role:"user"|"assistant", content:"..."}]
    isClosed: false,
  };
  saveStore(store);
  return store.threads[threadId];
}

function addMemory(threadId, role, content) {
  const store = loadStore();
  store.threads[threadId] ??= { createdAt: nowISO(), ownerId: "", memory: [], isClosed: false };

  store.threads[threadId].memory.push({ role, content, at: nowISO() });

  // keep memory lightweight (last 30 turns)
  if (store.threads[threadId].memory.length > 60) {
    store.threads[threadId].memory = store.threads[threadId].memory.slice(-60);
  }

  saveStore(store);
}

function resetMemory(threadId) {
  const store = loadStore();
  if (!store.threads[threadId]) return false;
  store.threads[threadId].memory = [];
  saveStore(store);
  return true;
}

async function aiReply(threadId, userText) {
  // If no OpenAI key, do a fallback “basic” response
  if (!openai) {
    return `⚠️ AI is not configured yet (missing OPENAI_API_KEY).\nYou said: **${userText}**`;
  }

  // Build conversation input from saved memory
  const store = loadStore();
  const mem = store.threads[threadId]?.memory || [];
  const trimmed = mem.slice(-20); // last 20 messages

  // Responses API example in docs  [oai_citation:1‡OpenAI Developers](https://developers.openai.com/api/docs/quickstart/)
  const response = await openai.responses.create({
    model: OPENAI_MODEL,
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text:
              "You are Flapjack Kipper AI, a friendly spooky-themed assistant for Grimwood Forest Creative & Operations. Keep replies clear, helpful, and not overly long.",
          },
        ],
      },
      ...trimmed.map((m) => ({
        role: m.role,
        content: [{ type: "input_text", text: m.content }],
      })),
      {
        role: "user",
        content: [{ type: "input_text", text: userText }],
      },
    ],
  });

  return response.output_text || "(No response text returned.)";
}

// ====== CLIENT ======
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // needed if you want the bot to read messages in threads
  ],
});

// ====== SLASH COMMANDS ======
const commands = [
  new SlashCommandBuilder()
    .setName("ai")
    .setDescription("Open your private AI Lounge thread")
    .addStringOption((opt) =>
      opt
        .setName("topic")
        .setDescription("Optional: what do you want to talk about?")
        .setRequired(false)
    ),

  new SlashCommandBuilder()
    .setName("reset")
    .setDescription("Reset memory in this AI Lounge thread"),

  new SlashCommandBuilder()
    .setName("close")
    .setDescription("Close this AI Lounge thread"),

  new SlashCommandBuilder()
    .setName("metrics")
    .setDescription("Show AI Lounge metrics (Leadership only)"),

  new SlashCommandBuilder()
    .setName("escalate")
    .setDescription("Ping Leadership On-Call in this AI Lounge (if needed)")
    .addStringOption((opt) =>
      opt.setName("reason").setDescription("Why do you need Leadership?").setRequired(false)
    ),

  // Optional: image generation (requires OPENAI_API_KEY)
  new SlashCommandBuilder()
    .setName("image")
    .setDescription("Generate an image (limited)")
    .addStringOption((opt) =>
      opt.setName("prompt").setDescription("Describe the image").setRequired(true)
    ),
].map((c) => c.toJSON());

// Register commands (guild)
const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
async function registerCommands() {
  try {
    console.log("Registering slash commands (guild)...");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
    console.log("Slash commands registered (guild).");
  } catch (err) {
    console.error("Failed to register commands:", err);
  }
}

// ====== HELPERS ======
async function getAIHubChannel(guild) {
  const ch = await guild.channels.fetch(AI_HUB_CHANNEL_ID).catch(() => null);
  if (!ch) return null;
  if (ch.type !== ChannelType.GuildText) return null;
  return ch;
}

async function createPrivateAIThread(interaction, topic) {
  const guild = interaction.guild;
  if (!guild) return interaction.editReply("Use this command inside a server.");

  const hub = await getAIHubChannel(guild);
  if (!hub) return interaction.editReply("AI hub channel not found or not a TEXT channel.");

  const userId = interaction.user.id;

  // create a starter message, then a PRIVATE thread off it
  const starter = await hub.send({ content: `Creating AI Lounge for <@${userId}>…` });

  const threadName = `ai-${interaction.user.username}-${Date.now().toString().slice(-5)}`
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "");

  const thread = await starter.startThread({
    name: threadName,
    autoArchiveDuration: 1440,
    type: ChannelType.PrivateThread,
    reason: "AI Lounge opened",
  });

  // delete starter message to keep hub clean
  try { await starter.delete(); } catch {}

  // add the user to the private thread
  try {
    await thread.members.add(userId);
  } catch (e) {
    console.error("Failed adding user to private thread:", e?.message || e);
  }

  // optional: add leadership role members? (Discord doesn’t let you add roles directly to private threads)
  // We’ll rely on /escalate to ping + leadership manually join if needed.

  // init memory
  const store = loadStore();
  store.threads[thread.id] = {
    createdAt: nowISO(),
    ownerId: userId,
    memory: [],
    isClosed: false,
  };
  store.metrics ??= { opened: 0, closed: 0 };
  store.metrics.opened += 1;
  saveStore(store);

  await thread.send(
    [
      `🎃 **Welcome to your AI Lounge, <@${userId}>.**`,
      topic ? `Topic: **${topic}**` : `Topic: *(none yet)*`,
      "",
      `**How this works**`,
      `• Just type normally in this thread — I’ll reply.`,
      `• Memory is **private to this thread** and remembers the conversation here.`,
      `• Daily limit: **${DAILY_LIMIT} messages per 24h**.`,
      "",
      `**Commands**`,
      `• \`/reset\` — clears memory`,
      `• \`/close\` — closes the lounge`,
      `• \`/escalate\` — ping Leadership On-Call if needed`,
    ].join("\n")
  );

  return interaction.editReply(`AI Lounge opened: ${thread.toString()}`);
}

async function closeAIThread(interaction) {
  const channel = interaction.channel;
  if (!channel || channel.type !== ChannelType.PrivateThread) {
    return interaction.editReply("Use `/close` inside your AI Lounge (private thread).");
  }

  const store = loadStore();
  const t = store.threads[channel.id];
  if (!t) return interaction.editReply("No AI Lounge data found for this thread.");

  const userId = interaction.user.id;
  const isOwner = userId === t.ownerId;
  const isLead = isLeadership(userId);

  if (!isOwner && !isLead) {
    return interaction.editReply("Only the Lounge Owner or Leadership can close this.");
  }

  t.isClosed = true;
  t.closedAt = nowISO();
  store.threads[channel.id] = t;
  store.metrics.closed += 1;
  saveStore(store);

  await channel.send(`🔒 AI Lounge closed by <@${userId}>. This thread will be archived.`);
  await channel.setArchived(true, "AI Lounge closed");

  return interaction.editReply("Closed.");
}

async function showMetrics(interaction) {
  if (!isLeadership(interaction.user.id)) {
    return interaction.editReply("Only Leadership can view metrics.");
  }
  const store = loadStore();
  const threads = Object.values(store.threads || {});
  const openCount = threads.filter((t) => !t.isClosed).length;
  const closedCount = threads.filter((t) => t.isClosed).length;

  return interaction.editReply(
    [
      `📊 **Flapjack Kipper AI Metrics**`,
      `• Open lounges: **${openCount}**`,
      `• Closed lounges: **${closedCount}**`,
      `• Total opened (lifetime): **${store.metrics?.opened || 0}**`,
      `• Total closed (lifetime): **${store.metrics?.closed || 0}**`,
      `• Daily limit: **${DAILY_LIMIT} / 24h**`,
      `• OpenAI configured: **${openai ? "YES" : "NO"}**`,
    ].join("\n")
  );
}

// ====== EVENTS ======
client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log("LEADERSHIP_USER_IDS =", LEADERSHIP_USER_IDS);
  console.log("AI_HUB_CHANNEL_ID =", AI_HUB_CHANNEL_ID);
  console.log("OpenAI configured =", !!openai);

  await registerCommands();
});

// Reply to normal messages inside AI private threads
client.on("messageCreate", async (message) => {
  try {
    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.channel?.type !== ChannelType.PrivateThread) return;

    const store = loadStore();
    const lounge = store.threads[message.channel.id];
    if (!lounge || lounge.isClosed) return;

    // Only allow the owner or leadership to talk in this lounge
    const authorId = message.author.id;
    const isOwner = authorId === lounge.ownerId;
    const isLead = isLeadership(authorId);
    if (!isOwner && !isLead) return;

    // Rate limit applies only to the owner (leadership can bypass)
    if (isOwner) {
      const lim = canUseAI(authorId);
      if (!lim.allowed) {
        await message.reply(`⏳ You’ve hit today’s limit (**${DAILY_LIMIT}/24h**). Try again later.`);
        return;
      }
      consumeAIUse(authorId);
    }

    const userText = message.content?.trim();
    if (!userText) return;

    // Save to memory
    addMemory(message.channel.id, "user", userText);

    await message.channel.sendTyping();

    const reply = await aiReply(message.channel.id, userText);

    addMemory(message.channel.id, "assistant", reply);

    // chunk if huge (Discord limit)
    const chunks = [];
    let cur = reply;
    while (cur.length > 1900) {
      chunks.push(cur.slice(0, 1900));
      cur = cur.slice(1900);
    }
    chunks.push(cur);

    for (const c of chunks) {
      await message.channel.send(c);
    }
  } catch (e) {
    console.error("messageCreate error:", e?.message || e);
  }
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ai") {
      await interaction.deferReply({ ephemeral: true });
      const topic = interaction.options.getString("topic") || "";
      return createPrivateAIThread(interaction, topic);
    }

    if (interaction.commandName === "reset") {
      await interaction.deferReply({ ephemeral: true });
      const ch = interaction.channel;
      if (!ch || ch.type !== ChannelType.PrivateThread) {
        return interaction.editReply("Use `/reset` inside your AI Lounge (private thread).");
      }

      const store = loadStore();
      const lounge = store.threads[ch.id];
      if (!lounge) return interaction.editReply("No AI Lounge data found for this thread.");

      const userId = interaction.user.id;
      const isOwner = userId === lounge.ownerId;
      const isLead = isLeadership(userId);
      if (!isOwner && !isLead) return interaction.editReply("Only the owner or Leadership can reset memory.");

      resetMemory(ch.id);
      await ch.send("🧠 Memory cleared for this AI Lounge.");
      return interaction.editReply("Reset.");
    }

    if (interaction.commandName === "close") {
      await interaction.deferReply({ ephemeral: true });
      return closeAIThread(interaction);
    }

    if (interaction.commandName === "metrics") {
      await interaction.deferReply({ ephemeral: true });
      return showMetrics(interaction);
    }

    if (interaction.commandName === "escalate") {
      await interaction.deferReply({ ephemeral: true });
      const ch = interaction.channel;
      if (!ch || ch.type !== ChannelType.PrivateThread) {
        return interaction.editReply("Use `/escalate` inside your AI Lounge (private thread).");
      }

      const store = loadStore();
      const lounge = store.threads[ch.id];
      if (!lounge) return interaction.editReply("No AI Lounge data found for this thread.");

      const userId = interaction.user.id;
      if (userId !== lounge.ownerId && !isLeadership(userId)) {
        return interaction.editReply("Only the lounge owner (or Leadership) can escalate.");
      }

      const reason = interaction.options.getString("reason") || "No reason provided.";

      if (LEADERSHIP_ROLE_ID) {
        await ch.send({
          content: `📣 <@&${LEADERSHIP_ROLE_ID}> — escalation requested by <@${userId}>.\nReason: **${reason}**`,
          allowedMentions: { roles: [LEADERSHIP_ROLE_ID] },
        });
      } else {
        await ch.send(`📣 Leadership escalation requested by <@${userId}>.\nReason: **${reason}**`);
      }

      await ch.send("✅ Leadership On-Call has been notified. Someone will be with you shortly.");
      return interaction.editReply("Escalated.");
    }

    if (interaction.commandName === "image") {
      await interaction.deferReply({ ephemeral: true });
      const prompt = interaction.options.getString("prompt");

      if (!openai) return interaction.editReply("Image generation is not configured (missing OPENAI_API_KEY).");

      // NOTE: Image generation model/params can change — check OpenAI docs for current options.  [oai_citation:2‡OpenAI Developers](https://developers.openai.com/api/docs/quickstart/)
      // We'll do a safe fallback message if anything errors.
      try {
        const resp = await openai.images.generate({
          model: "gpt-image-1",
          prompt,
          size: "1024x1024",
        });

        const url = resp?.data?.[0]?.url;
        if (!url) return interaction.editReply("No image URL returned.");

        return interaction.editReply(`🖼️ Image generated:\n${url}`);
      } catch (e) {
        console.error("image gen error:", e?.message || e);
        return interaction.editReply("Image generation failed. Check console logs.");
      }
    }
  } catch (err) {
    console.error("interaction error:", err);
    if (interaction.isRepliable()) {
      try {
        await interaction.reply({ content: "Something went wrong. Check console logs.", ephemeral: true });
      } catch {}
    }
  }
});

client.login(DISCORD_TOKEN);
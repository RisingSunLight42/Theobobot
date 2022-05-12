const fs = require("fs"); // Permet de lire des fichiers avec Node.js
const { Client, Intents } = require("discord.js"); // Import des classes nécessaires pour le bot
const { token } = require("./config.json"); // Recherche des configurations dans le fichier de config

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
    ],
}); // Nouvel objet client, avec les intents de guild

//* Récupère les events
const eventFiles = fs
    .readdirSync("./events")
    .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
    // Parcours la liste des fichiers
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(token); // Lance le bot

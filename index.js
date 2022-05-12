const fs = require("fs"); // Permet de lire des fichiers avec Node.js
const { Client, Collection, Intents } = require("discord.js"); // Import des classes nécessaires pour le bot
const { token } = require("./config.json"); // Recherche des configurations dans le fichier de config

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
    ],
}); // Nouvel objet client, avec les intents de guild

//* Récupère les commandes
client.commands = new Collection();
const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js")); // Récupère les fichiers .js des commandes se situant dans le dossier commands

for (const file of commandFiles) {
    // Parcours la liste des fichiers
    const command = require(`./commands/${file}`); // Récupère le fichier dans la variable command
    client.commands.set(command.data.name, command); // L'ajoute comme commande, avec pour nom le nom du fichier et comme attribut "command"
}

//* Récupère les buttons
client.buttons = new Collection();
const buttonFiles = fs
    .readdirSync("./buttons")
    .filter((file) => file.endsWith(".js")); // Récupère les fichiers .js des boutons se situant dans le dossier boutons

for (const file of buttonFiles) {
    // Parcours la liste des fichiers
    const button = require(`./buttons/${file}`); // Récupère le fichier dans la variable button
    client.buttons.set(button.name, button); // L'ajoute comme bouton, avec pour nom le nom du fichier et comme attribut "button"
}

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

//* Récupère les menus
client.menus = new Collection();
const menuFiles = fs
    .readdirSync("./menus")
    .filter((file) => file.endsWith(".js"));

for (const file of menuFiles) {
    // Parcours la liste des fichiers
    const menu = require(`./menus/${file}`);
    client.menus.set(menu.name, menu); // L'ajoute comme menu, avec pour nom le nom du fichier et comme attribut "menu"
}

client.login(token); // Lance le bot

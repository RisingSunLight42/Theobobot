const {
    deployGlobal,
    deployOkora,
    deployGestion,
    recupFichier,
} = require("../deploy-commands.js"); // Importe la fonction pour déployer les commandes
const {
    changement_statut,
} = require("../helpers/functions/changement_statut.js");
const { souhaite_anniv } = require("../helpers/functions/souhaite_anniv.js");
const { sequelize } = require("../database/database_gestion.js"); // Import d'Etatcommission
const { guildIdGestion, guildIdOkora } = require("../config.json");

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`🟢 Je suis allumée !`);
        //* Synchronise les tables
        sequelize.sync();
        console.log("📋 Les tables ont été synchronisées !");

        //* Lance le changement de statut
        changement_statut(client);
        setInterval(changement_statut, 1800000, client);

        //* Lance la fonction pour souhaiter l'anniversaire des membres
        souhaite_anniv(client);
        setInterval(souhaite_anniv, 86400000, client);

        //* Push les commandes suivant si les serveurs recherchés sont présents et si c'est le bot principal
        const liste_commandes = recupFichier(client.user.username);
        client.guilds.fetch().then(function (result) {
            const guild_liste_snowflake = result.map((objet) => objet.id); // Récupère les ids de guild du bot dans une liste
            if (guild_liste_snowflake.includes(guildIdGestion)) {
                // S'il y a le serveur de gestion, push les commandes de gestion
                deployGestion(liste_commandes[0]);
            }
            if (guild_liste_snowflake.includes(guildIdOkora)) {
                // S'il y a le serveur d'Okora, push les commandes de gestion
                deployOkora(liste_commandes[1]);
            }
        });
        if (client.user.username === "Tsakali") {
            // Si c'est le bot officiel, push les commandes restantes en globales
            deployGlobal(liste_commandes[2]);
        }
    },
};

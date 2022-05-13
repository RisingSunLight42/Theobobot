module.exports = {
    name: "messageCreate",
    async execute(message) {
        //* Stockage du contenu du message
        let contenu = message.content;

        //* Définit un regex qui permet de match tous les emojis classiques
        const regex_nettoyage = /[^\w\s]/g; // Remplace tout ce qui n'est pas des nombres, caractères de ponctuations, espaces ou underscore

        //* Nettoyage de la chaîne de caractères
        contenu = await contenu.replaceAll(regex_nettoyage, "");

        //* Conversion en array en retirant tous les éléments vides et enregistre le dernier mot de la chaîne
        contenu = await contenu.split(" ").filter(String);
        const mot = contenu[contenu.length - 1];

        if (mot.length < 4) return; // Si la longueur du mot est plus petite que 4, ça ne peut pas être quoi, on renvoie

        //* Nettoyage du mot pour pas avoir de doublons de lettres pour bien réussir la détection du quoi
        let mot_sans_doublons = mot[0];
        for (i = 1; i < mot.length; i++) {
            mot_sans_doublons += mot[i] != mot[i - 1] ? mot[i] : "";
        }

        const regex_quoi = /quoi/iy;
        regex_quoi.lastIndex = mot_sans_doublons.length - 4;

        if (regex_quoi.test(mot_sans_doublons))
            return await message.channel.send("feur !");
    },
};

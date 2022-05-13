module.exports = {
    name: "messageCreate",
    async execute(message) {
        //* Stockage du contenu du message
        let contenu = message.content;

        //* Définit un regex qui permet de match tous les emojis classiques
        const regex_nettoyage = /[^àùçèé\w\s]/g; // Récupère tout ce qui n'est pas des lettres (les accents sont mis en durs car sinon ils sont capturés) et des espaces

        //* Nettoyage de la chaîne de caractères
        contenu = await contenu.replaceAll(regex_nettoyage, "");

        //* Conversion en array en retirant tous les éléments vides et enregistre le dernier mot de la chaîne
        contenu = await contenu.split(" ").filter(String);
        const mot = contenu[contenu.length - 1];
        if (mot.length < 4) return; // Si la longueur du mot est plus petite que 4, ça ne peut pas être quoi et répéter serait inutile, on renvoie

        //* Nettoyage du mot pour pas avoir de doublons de lettres pour bien réussir la détection du quoi
        let mot_sans_doublons = mot[0];
        for (i = 1; i < mot.length; i++) {
            mot_sans_doublons += mot[i] != mot[i - 1] ? mot[i] : "";
        }

        //* PARTIE DI
        const regex_list_di = /\b(?:^di\w+|^dy\w+)\b/gi;
        if (regex_list_di.test(mot_sans_doublons)) {
            await message.channel.send(
                `${await mot_sans_doublons.substr(
                    /(s|t)/gi.test(mot_sans_doublons[2]) ? 3 : 2
                )}`
            );
        }

        //* PARTIE CRI
        const regex_list_cri = /\b(?:^cri\w+|^cry\w+)\b/gi;
        if (regex_list_cri.test(mot_sans_doublons)) {
            await message.channel.send(
                `${await (await mot_sans_doublons.substr(3)).toUpperCase()}`
            );
        }

        //* PARTIE QUOI
        const regex_quoi = /quoi/iy;
        regex_quoi.lastIndex = mot_sans_doublons.length - 4;

        if (regex_quoi.test(mot_sans_doublons))
            return await message.channel.send("feur !");
    },
};

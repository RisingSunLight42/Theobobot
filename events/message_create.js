module.exports = {
    name: "messageCreate",
    async execute(message) {
        //* Stockage du contenu du message
        let contenu = message.content;

        //* Définit un regex qui permet de match tous les emojis classiques
        const regex_emoji = /\p{Extended_Pictographic}/gu;
        const regex_ponctuation = /[^\w\s]/g; // Remplace tout ce qui n'est pas des nombres, caractères de ponctuations, espaces ou underscore

        //* Nettoyage de la chaîne de caractères
        contenu = await contenu.replaceAll(regex_emoji, "");
        contenu = await contenu.replaceAll(regex_ponctuation, "");

        //* Conversion en array en retirant tous les éléments vides et enregistre le dernier mot de la chaîne
        contenu = await contenu.split(" ").filter(String);
        const mot = contenu[contenu.length - 1];
    },
};

module.exports = {
    name: "messageCreate",
    async execute(message) {
        //* Stockage du contenu du message
        let message = message.content;

        //* Définit un regex qui permet de match tous les emojis classiques
        const regex = /\p{Extended_Pictographic}/gu;
    },
};

module.exports = {
    name: "messageCreate",
    async execute(message) {
        //* Stockage du contenu du message
        let contenu = message.content;

        //* Définit un regex qui permet de match tous les emojis classiques
        const regex_emoji = /\p{Extended_Pictographic}/gu;
        const regex_ponctuation = /\?,;:!'\*\\}{\(\)\[\]-"~\^%\+\//g;
    },
};

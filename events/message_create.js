const { blacklist_check } = require("../helpers/functions/blacklist_check.js");
const { react_image } = require("../helpers/functions/react_image.js");

module.exports = {
    name: "messageCreate",
    async execute(message) {
        if (message.content.toLowerCase().includes("boom the rock")) {
            await message.channel.send(
                "https://cdn.discordapp.com/attachments/643529375941132289/969371184649084968/VID_20220328225943.mp4"
            );
        }
        await blacklist_check(message);
        await react_image(message);
    },
};

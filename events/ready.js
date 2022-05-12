module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`🟢 Je suis allumé !`);
    },
};

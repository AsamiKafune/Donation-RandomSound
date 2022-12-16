const sound = require('sound-play')
const path = require("path");
const fs = require("fs")
const io = require("socket.io-client");

const findToken = path.join(process.cwd(), 'token')
const streamlabs = io(`https://sockets.streamlabs.com?token=${fs.readFileSync(findToken, "utf-8")}`, { transports: ['websocket'] });

streamlabs.on("connect", () => {
    console.log("[Logs] streamlabs server => has now connected!")
})

streamlabs.on("event", async (eventData) => {
    if (eventData["type"] === "donation") {
        console.log(eventData)
        let folder = fs.readdirSync(path.join(process.cwd(), "sound"))

        if (!folder || folder.length == 0 || folder.length < 1) return
        let select = folder[Math.floor(Math.random() * folder.length)];

        const play = path.join(process.cwd(), "sound/" + select);
        try {
            await sound.play(play);
            return console.log("Play: " + play + " done!");
        } catch (error) {
            return console.error(error);
        }
    }
})
const cron = require("node-cron");

const testing = () => {
    console.log("Testing function schedule");
    cron.schedule("21 15 * * *", () => {
        console.log("running testing");
    });
};

module.exports = { testing };

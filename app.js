const cron      = require('node-cron');
const config    = require('./app_config');
const app       = require('./api');

const { JOB_SCHEDULE, USERNAME_KMUTNB, PASSWORD_KMUTNB } = config;
const { getSession } = app;

cron.schedule(JOB_SCHEDULE, () => {

    const d = new Date();
    let h = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    let m = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    let s = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    let time = h + ":" + m + ":" + s;

    let fs = require('fs');
    fs.appendFile('log.txt', `[${time}] Runing task\n`, function (err) {
        if (err) throw err;
        console.log(`[${time}] Runing task`)
        getSession(USERNAME_KMUTNB, PASSWORD_KMUTNB)
    })
}, {
    scheduled: true,
    timezone: "Asia/bangkok"
});
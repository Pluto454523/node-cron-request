const cron = require('node-cron');
const request = require('request');

const config = require('./config');
const { JOB_SCHEDULE, USERNAME_KMUTNB, PASSWORD_KMUTNB } = config;

const app = require('./api');
const { getSession } = app;

cron.schedule(JOB_SCHEDULE, () => {

    let fs = require('fs');
    const d = new Date();
    let h = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    let m = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    let s = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    let time = h + ":" + m + ":" + s;

    fs.appendFile('log.txt', `[${time}] Runing task\n`, function (err) {
        if (err) throw err;
        console.log(`[${time}] Runing task`)
        // getSession(USERNAME_KMUTNB, PASSWORD_KMUTNB)
    })
}, {
    scheduled: true,
    timezone: "Asia/bangkok"
});

// cron.schedule('*/1 * * * * *', () => {

//     const d = new Date();
//     let h = d.getHours();
//     let m = d.getMinutes();
//     let s = d.getSeconds();
//     let time = h + ":" + m + ":" + s;

//     console.log(time);
// }, {
//     scheduled: true,
//     timezone: "Asia/bangkok"
// });
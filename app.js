const cron = require('node-cron');
const request = require('request');

const config = require('./config');
const { JOB_SCHEDULE, USERNAME_KMUTNB, PASSWORD_KMUTNB } = config;

const app = require('./api');
const { getSession } = app;


cron.schedule(JOB_SCHEDULE, () => {
    console.log("Runing task")
    // getSession(USERNAME_KMUTNB, PASSWORD_KMUTNB)
}, {
    scheduled: true,
    timezone: "Asia/bangkok"
});
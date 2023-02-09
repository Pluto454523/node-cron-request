require('dotenv').config()
const request = require('request');

function getSession(username,password) {
    const options = {
        method: 'POST',
        url: 'https://software.kmutnb.ac.th/login/',
        headers: {
            'Accept': '*/*',
            'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: { myusername: username, mypassword: password, Submit: '' }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        const cookies = response.headers["set-cookie"]
        const sessid = cookies[0].match(/PHPSESSID=([^;]+);/)
        console.log(body.includes("นาวิน ค้ำจุน"))
        getLicense(sessid[1])
    })
}

function getLicense(sessid) {
    const options = {
        method: 'POST',
        url: 'https://software.kmutnb.ac.th/adobe-reserve/add2.php',
        headers: {
            'Accept': '*/*',
            'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
            'Content-Type': 'application/x-www-form-urlencoded',
            'cookie': `PHPSESSID=${sessid}`
        },
        form: { userId: "", date_expire: "", status_number: "0", Submit_get: '' }
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log("Success");
    })
}

getSession(process.env.USERNAME_KMUTNB,process.env.PASSWORD_KMUTNB)
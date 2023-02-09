const request = require('request');

async function getSession(username, password) {
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

    let sessid = []
    let cookies = []

    await request(options, function (error, response, body) {
        if (error) throw new Error(error);

        cookies = response.headers["set-cookie"]
        sessid = cookies[0].match(/PHPSESSID=([^;]+);/)

        if (body.includes("ออกจากระบบ"))
            console.log("Login Success");
        getLicense(sessid[1])
    })
}

async function getLicense(sessid) {
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

module.exports = { getSession }
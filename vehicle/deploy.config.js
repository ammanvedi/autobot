module.exports = {
    "localSource": "./vehicle/src/**/*",
    "remoteSource": "/home/pibot/autobot",
    "host": {
        "ip": "172.20.10.10",
        "hostname": "pibot",
        "password": "1234amman"
    },
    "runCommand": [
        'node --inspect-brk=0.0.0.0:9229 index.js'
    ],
    logDir: './',
    logName: './vehicle/log/session.log'
}

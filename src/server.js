const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const { validateSSLCert, validateSSLKey, validateCertKeyPair} = require("ssl-validator");
require("dotenv").config();

const { connect } = require("./database");
const { serviceName, httpPort, httpsPort } = require("./config");

(async function() {
    await connect();

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.use("*", require("./routes.js"));

    if (process.env.SSL_KEY_PATH && process.env.SSL_CERTIFICATE_PATH) {
        let sslKey = fs.readFileSync(process.env.SSL_KEY_PATH);
        let sslCert = fs.readFileSync(process.env.SSL_CERTIFICATE_PATH);

        try {
            validateSSLCert(sslCert);
            validateSSLKey(sslKey);
            validateCertKeyPair(cert, key);
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
        
        const httpsOptions = {
            key: sslKey,
            cert: sslCert
        };
        https.createServer(httpsOptions, app).listen(httpsPort);
        http.createServer(express().use(function(req, res) {
            res.redirect(`https://${req.headers.host}${req.url}`);
        })).listen(httpPort);
    } else {
        console.error("no SSL_KEY_PATH or no SSL_CERTIFICATION_PATH supplied");
        process.exit(1);
    }

    console.log(`${serviceName} running https on port: ${httpsPort}, and redirecting http on port: ${httpPort}`);
})();
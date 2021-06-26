const axios = require("axios");
const config = require("./config");

function objectMatchesTemplate(obj, template) {
    for (let key in template) {
        if (!(key in obj) || !(typeof template[key] === typeof obj[key])) {
            return false;
        }
    }
    return true;
}

function getPlandidAuthToken() {
    return Buffer.from(`${config.serviceName}:${process.env.SERVICE_ID}`, 'utf8').toString('base64');
}

module.exports = {
    checkForClientError: function(req, res, expectedPathParams={}, expectedQueryParams={}, expectedHeaders={}, expectedBody={}, optionalBody=null) {
        let message = "";
    
        if (!objectMatchesTemplate(req.params, expectedPathParams)) message += `\nInvalid path parameters. Expected Format:\n${JSON.stringify(expectedPathParams)}\n`;
        if (!objectMatchesTemplate(req.query, expectedQueryParams)) message += `\nInvalid query parameters. Expected Format:\n${JSON.stringify(expectedQueryParams)}\n`;
        if (!objectMatchesTemplate(req.headers, expectedHeaders)) message += `\nInvalid header parameters. Expected Format:\n${JSON.stringify(expectedHeaders)}\n`;
        if (!objectMatchesTemplate(req.body, expectedBody)) message += `\nInvalid JSON body. Expected Format:\n${JSON.stringify(expectedBody)}\n`;
    
        if (message.length > 0) {
            res.status(400);
            res.json({message: optionalBody ? message + `\nOptional JSON body paramters:\n${JSON.stringify(expectedBody)}\n` : message});
        }
    },

    objectMatchesTemplate: objectMatchesTemplate,

    getPlandidAuthToken: getPlandidAuthToken,

    getServiceIdMap: async function() {
        let serviceIdMap = {};
        const res = await axios.get(new URL("services", process.env.APPDATA_DRIVER_URL).href, {
            headers: {Authorization: `Basic ${getPlandidAuthToken()}`}
        });
        
        for (const service of res.data) {
            serviceIdMap[service.name] = service._id;
        }

        return serviceIdMap;
    }
}
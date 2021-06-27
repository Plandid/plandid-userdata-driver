const axios = require("axios");
const config = require("./config");

function objectMatchesTemplate(obj, template, typeCheck=false) {
    const notValid = typeCheck ? 
        function(key) { return !(key in obj) || !(typeof template[key] === typeof obj[key]) } :
        function(key) { return !(key in obj) }
    
    for (const key in template) {
        if (notValid(key)) {
            return false;
        }
    }

    return true;
}

function getPlandidAuthToken() {
    return Buffer.from(`${config.serviceName}:${process.env.SERVICE_ID}`, 'utf8').toString('base64');
}

module.exports = {
    checkForClientError: function(req, res, options) {
        let message = "";
    
        if ((pathParams in options) && !objectMatchesTemplate(req.params, options.pathParams, options.typeCheck)) message += `\nInvalid path parameters. Expected Format:\n${JSON.stringify(options.pathParams)}\n`;
        if ((queryParams in options) && !objectMatchesTemplate(req.query, options.queryParams, options.typeCheck)) message += `\nInvalid query parameters. Expected Format:\n${JSON.stringify(options.queryParams)}\n`;
        if ((headers in options) && !objectMatchesTemplate(req.headers, options.headers, options.typeCheck)) message += `\nInvalid header parameters. Expected Format:\n${JSON.stringify(options.headers)}\n`;
        if ((body in options) && !objectMatchesTemplate(req.body, options.body, options.typeCheck)) message += `\nInvalid JSON body. Expected Format:\n${JSON.stringify(options.body)}\n`;
    
        if (message.length > 0) {
            res.status(400);
            res.json({message: options.optionalBody ? message + `\nOptional JSON body paramters:\n${JSON.stringify(options.optionalBody)}\n` : message});
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
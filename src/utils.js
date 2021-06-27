const axios = require("axios");
const { ObjectID } = require("./database");
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

async function mongoRestRoutes(router, collection, recordInstantiationFunction, queryInstantiationFunction) {
    router.get("/:id", async function(req, res, next) {
        try {
            let data = await collection.find({ _id: new ObjectID(req.params.id) }).next();
            res.json(data);
        } catch (error) {
            next(error);
        }
    });

    router.post("/", async function(req, res, next) {
        console.log((req.body))
        try {
            await collection.insertOne(recordInstantiationFunction(req.body));
        
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    });

    router.post("/:id", async function(req, res, next) {
        try {
            await collection.insertOne({ 
                _id: new ObjectID(req.params.id), 
                ...recordInstantiationFunction(req.body) 
            });
        
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    });

    router.put("/:id", async function(req, res, next) {
        try {
            await collection.replaceOne({ _id: new ObjectID(req.params.id) }, { 
                _id: new ObjectID(req.params.id), 
                ...recordInstantiationFunction(req.body) 
            }, { upsert: true });
        
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    });

    router.patch("/:id", async function(req, res, next) {
        try {
            await collection.updateOne({ _id: new ObjectID(req.params.id) }, {$set: queryInstantiationFunction(req.query)});
        
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    });

    router.delete("/:id", async function(req, res, next) {
        try {
            await collection.deleteOne({ _id: new ObjectID(req.params.id) });
        
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    });
}

module.exports = {
    checkForClientError: function(req, options) {
        let message = "";
    
        if ("pathParams" in options && !objectMatchesTemplate(req.params, options.pathParams, options.typeCheck)) message += `\nInvalid path parameters. Expected Format:\n${JSON.stringify(options.pathParams)}\n`;
        if ("queryParams" in options && !objectMatchesTemplate(req.query, options.queryParams, options.typeCheck)) message += `\nInvalid query parameters. Expected Format:\n${JSON.stringify(options.queryParams)}\n`;
        if ("headers" in options && !objectMatchesTemplate(req.headers, options.headers, options.typeCheck)) message += `\nInvalid header parameters. Expected Format:\n${JSON.stringify(options.headers)}\n`;
        if ("body" in options && !objectMatchesTemplate(req.body, options.body, options.typeCheck)) message += `\nInvalid JSON body. Expected Format:\n${JSON.stringify(options.body)}\n`;
    
        if (message.length > 0) {
            throw message;
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
    },

    mongoRestRoutes: mongoRestRoutes
}
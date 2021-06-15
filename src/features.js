const featuresObject = JSON.parse(require("fs").readFileSync("./features.json"));

module.exports = featuresObject;
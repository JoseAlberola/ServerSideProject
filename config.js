const env = process.env.NODE_ENV || 'company';
const credentials = require(`./.credentials.${env}`)
const connectionString = "mongodb://localhost:27017/SSPROJECT";

exports.credentials = credentials;
exports.connectionString = connectionString;
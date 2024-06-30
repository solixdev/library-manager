const { MongoClient } = require("mongodb");
require("dotenv").config();

const dbConnectionUrl = new MongoClient(process.env.DB_URL);
const dbName = process.env.DB_NAME;

module.exports = {
    dbConnection: async () => {
        await dbConnectionUrl.connect();
        console.log(`Connected to database server successfully.`);

        const db = dbConnectionUrl.db(dbName);
        return db;
    },
};

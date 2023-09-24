const {dotenv} = require("../config/importModule")
dotenv.config()

const config ={
    uri : `mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_PASSWORD}@projectcluster.eiw49pu.mongodb.net/FMS?retryWrites=true&w=majority`,
    database : "FMS"
}

module.exports = config

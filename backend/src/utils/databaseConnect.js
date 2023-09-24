const {mongoose} = require("../config/importModule")
const dbConfig = require("../config/dbConfig")

async function dbConnect (){
    try{
        await mongoose.connect(dbConfig.uri)
        console.info("\nDatabase Connected")
    }catch (err){
        console.error("\nError in dbConnect")
        throw new Error(err)
    }
} 

module.exports = dbConnect

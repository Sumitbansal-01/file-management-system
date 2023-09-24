const {dotenv} = require("./src/config/importModule")
const app = require("./src/server")
const databaseConnect = require("./src/utils/databaseConnect")
dotenv.config()
const port=process.env.PORT

app.listen(port, async ()=>{
    console.log("\nApp is Listening on port",port)
    await databaseConnect()
})
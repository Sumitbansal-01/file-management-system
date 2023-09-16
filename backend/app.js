const {dotenv} = require("./src/config/importModule")
const app = require("./src/server")
dotenv.config()
const port=process.env.PORT

app.listen(port, ()=>{
    console.log("\nApp is Listening on port",port, "\n")
})
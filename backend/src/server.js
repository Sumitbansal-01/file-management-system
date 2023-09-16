// Importing Modules
const {express, expressFileupload, cookieParser} = require("./config/importModule")

// Creating App
const app = express()

// Using middlewares
app.use(express.json())
app.use(expressFileupload({limits: "2gb"}))
app.use(cookieParser());
app.use(require("./apis/middlewares/consoller"))

app.get("/", (req,res)=> res.send("App is working properly"))

// For catching route not found
app.use(require("./apis/middlewares/routeNotFound"))

// exporting app
module.exports = app
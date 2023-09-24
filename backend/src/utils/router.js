const {express} = require("../config/importModule")
const router = express.Router()
const libraryRoute = require("../apis/routes/libraryRoute")

router.use("/library/",libraryRoute)

module.exports = router

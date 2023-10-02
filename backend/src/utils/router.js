const {express} = require("../config/importModule")
const router = express.Router()
const libraryRoute = require("../apis/routes/libraryRoute")
const folderRoute = require("../apis/routes/folderRoute")

router.use("/library/",libraryRoute)
router.use("/folder/",folderRoute)

module.exports = router

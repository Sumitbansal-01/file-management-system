const { express } = require("../../config/importModule")
const router = express.Router()
const userAuthController = require("../controllers/userAuthController")
const userAuthValidation = require("../validations/userAuthValidation")
const validateBody = require("../../utils/joiValidation")
const mainController = require("../../utils/mainController")

router.post("/login", validateBody(userAuthValidation.login, "body"), mainController(userAuthController.login))

module.exports = router
const libraryController = require("../controllers/libraryController")
const { express } = require("../../config/importModule");
const router = express.Router();
const validateBody = require("../../utils/joiValidation")
const libraryValidations = require("../validations/libraryValidations")
const mainController = require("../../utils/mainController")

router
    .route("/")
    .get(validateBody(libraryValidations.getLibrary, "query"), mainController(libraryController.getLibrary))
    .post(validateBody(libraryValidations.createLibrary, "body"), mainController(libraryController.createLibrary))
    .patch(validateBody(libraryValidations.editLibrary, "body"), mainController(libraryController.editLibrary))
    .delete(validateBody(libraryValidations.deleteLibrary, "query"), mainController(libraryController.deleteLibrary))

router.get("/getFileFolderList", validateBody(libraryValidations.getFileFolderList, "query"), mainController(libraryController.getFileFolderList))


module.exports = router
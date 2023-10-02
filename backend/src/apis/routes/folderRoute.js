const folderController = require("../controllers/folderController")
const { express } = require("../../config/importModule");
const router = express.Router();
const validateBody = require("../../utils/joiValidation")
const folderValidation = require("../validations/folderValidation")
const mainController = require("../../utils/mainController")

router
    .route("/")
    .get(validateBody(folderValidation.getFolder, "query"), mainController(folderController.getFolder))
    .post(validateBody(folderValidation.createFolder, "body"), mainController(folderController.createFolder))
    .patch(validateBody(folderValidation.editFolder, "body"), mainController(folderController.editFolder))
    .delete(validateBody(folderValidation.deleteFolder, "query"), mainController(folderController.deleteFolder))

router.patch("/move", validateBody(folderValidation.moveFolder, "body"), mainController(folderController.editFolder))

module.exports = router
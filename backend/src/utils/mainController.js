const { error400Config, error404Config, error401Config } = require("../apis/errors/error")

function mainController(controller) {
    return async function (req, res) {
        try {
            const result = await controller(req, res)
            console.log({ mainControllerResult: result?.data })
            result.data.error = "No"
            result.data.message = req.path
            return res.send(result.data)
        } catch (err) {
            console.error(err)
            if (error400Config.includes(err.message) || err.code === 11000) {
                return res.status(400).send({ error: "Yes", value: err.message, message: req.path })
            } else if (error404Config.includes(err.message) || error404Config.includes(err.message.split(",").slice(-1)[0].split("=")[1])) {
                return res.status(404).send({ error: "Yes", value: err.message, message: req.path })
            } else if (error401Config.includes(err.message)) {
                return res.status(401).send({ error: "Yes", value: err.message, message: req.path })
            } else {
                return res.status(500).send({ error: "Yes", value: err.message, message: req.path })
            }
        }
    }
}

module.exports = mainController
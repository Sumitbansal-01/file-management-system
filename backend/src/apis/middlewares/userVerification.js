const { jwt, dotenv } = require("../../config/importModule")
dotenv.config()
const { errors, CustomError } = require("../../errors/main")

const middleware = (req, res, next) => {
    try {
        const token = req.headers?.Authorization?.split()?.[1]
        if (!token) {
            throw new CustomError(errors["User is unauthorize"].message, errors["User is unauthorize"].statusCode)
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                throw new CustomError(errors["User is unauthorize"].message, errors["User is unauthorize"].statusCode)
            }
            req.user = user
            next()
        })
    } catch (err) {
        res.status(err.statusCode).send({ error: "Yes", message: req.path, value: err.message })
    }
}

module.exports = middleware

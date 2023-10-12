const { jwt, bcrypt, dotenv } = require("../../config/importModule")
dotenv.config()
const { getUser } = require("../services/userServices")
const { CustomError, errors } = require("../../errors/main")

const login = async (req) => {
    const { email, password } = req.body
    const user = await getUser({ email }, { password: 1 }, 1)

    if (user.data.totalLogs === 0) {
        throw new CustomError(errors["User is unauthorize"].message, errors["User is unauthorize"].statusCode)
    }

    const result = await bcrypt.compare(password, user.data.Data[0].password)

    if (!result) {
        throw new CustomError(errors["User is unauthorize"].message, errors["User is unauthorize"].statusCode)
    }

    const accessToken = jwt.sign({ email, _id: user.data.Data[0]._id.toString() }, process.env.SECRET_KEY, { expiresIn: "3h" })

    return { data: { accessToken } }
}

module.exports = { login }
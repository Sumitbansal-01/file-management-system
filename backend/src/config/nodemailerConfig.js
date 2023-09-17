const { nodemailer, dotenv } = require("./importModules")
dotenv.config()

const email= process.env.EMAIL
const password = process.env.EMAIL_PASSWORD

if (!email || !password){
    throw new Error("email or password is missing")
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password
    }
});

const sender = `SUMIT FMS  <${email}>`

module.exports = { transporter, sender }


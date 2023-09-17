const { transporter, sender } = require("../config/nodemailerConfig")

// For sending Email
const sendMail = async (email, subject, html) => {
    var mailOptions = {
        from: sender,
        to: email,
        subject: subject,
        html: html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Mail Done')
    return result
}

module.exports = sendMail

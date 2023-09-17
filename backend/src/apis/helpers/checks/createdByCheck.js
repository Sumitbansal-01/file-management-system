const userModel = require("../../models/userModel")

const userCheck = async (props) => {
    const user = await userModel.findOne({email:props})
    if (!user) {
        throw new Error('Created by user not exist')
    }
}

module.exports = userCheck
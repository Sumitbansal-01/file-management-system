const userModel = require("../../models/userModel")

const userCheck= async (props) => {
    for (let i of props) {
        const user = await userModel.findById(i)
        if (!user) {
            throw new Error('User not exist')
        }
    }
}

module.exports=userCheck
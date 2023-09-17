const fileModel = require("../../models/fileModel")

const fileCheck = async (props) => {
    for (let i of props) {
        const file = await fileModel.findById(i)
        if (!file) {
            throw new Error('File not exist')
        }
    }
}

module.exports = fileCheck
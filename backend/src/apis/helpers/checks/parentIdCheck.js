const libraryModel = require("../../models/libraryModel")

const parentCheck = async (props) => {
    const parent = await libraryModel.findById(props)
    if (!parent) {
        throw new Error('Parent not exist')
    }
    if(parent.category==='File'){
        throw new Error('Parent cannot be a file')
    }
}

module.exports = parentCheck
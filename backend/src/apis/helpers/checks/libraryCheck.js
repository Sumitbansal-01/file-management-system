const libraryModel = require("../../models/libraryModel")

const libraryCheck = async (props) => {
    const library = await libraryModel.findById(props)
    if (!library) {
        throw new Error('Library not exist')
    }
}

module.exports = libraryCheck
const libraryServices = require("../services/libraryServices")
const { mongoose } = require("../../config/importModule");
const createdByCheck = require("../helpers/checks/createdByCheck")
const deleteKeys = require("../helpers/deleteKeys")
const { getFolder } = require("../services/folderServices")

// For creating new Library
const createLibrary = async (req) => {
    const { createdBy } = req.body
    
    await createdByCheck(createdBy)

    const result = await libraryServices.createLibrary(req.body)
    return result
}

// For Deleteing the Role
const deleteLibrary = async (req) => {
    const result = await libraryServices.deleteLibrary(req.query)
    return result
}

// For editing Library
const editLibrary = async (req) => {
    const result = await libraryServices.editLibrary(req.body)
    return result
}

// For getting Library and not completed yet
const getLibrary = async (req) => {
    if (req.query._id) {
        req.query._id = new mongoose.mongo.ObjectId(req.query._id);
    }
    const page = req.query.page || 1
    const query = { ...req.query, category: "Library" }
    deleteKeys(query, ["page"])
    const result = await libraryServices.getLibrary(query, page)
    return result
}

const getFileFolderList = async (req) => {
    const { parentId } = req.query
    const page = req.query.page || 1

    const isLibraryIdRef = req.query.isLibraryIdRef || false
    const isParentIdRef = req.query.isParentIdRef || false
    const result = await libraryServices.getFileFolderList(parentId, page, isLibraryIdRef, isParentIdRef)

    result.data.parentData = (await getFolder({ _id: new mongoose.mongo.ObjectId(parentId) }, 1, "true", "true")).data.Data[0]
    return result
}


module.exports = { getLibrary, editLibrary, createLibrary, deleteLibrary, getFileFolderList }
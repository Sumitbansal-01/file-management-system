const folderServices = require("../services/folderServices")
const { mongoose } = require("../../config/importModule");
const createdByCheck = require("../helpers/checks/createdByCheck")
const libraryCheck = require("../helpers/checks/libraryCheck")
const parentIdCheck = require("../helpers/checks/parentIdCheck")
const deleteKeys = require("../helpers/deleteKeys")

// For creating new Folder
const createFolder = async (req) => {
    const { name, createdBy, parentId, libraryId } = req.body
    if (!name || !createdBy || !parentId || !libraryId) {
        throw new Error('Value cannot be blank')
    }
    await createdByCheck(createdBy)
    await libraryCheck(libraryId)
    await parentIdCheck(parentId)
    const result = await folderServices.createFolder(req.body)
    return result
}

// For Deleteing the Role
const deleteFolder = async (req) => {
    const { _id } = req.query
    if (!_id) {
        throw new Error('Value cannot be blank')
    }
    const result = await folderServices.deleteFolder(req.query)
    return result
}

// For editing Folder
const editFolder = async (req) => {
    const { _id } = req.body
    if (!_id) {
        throw new Error('Value cannot be blank')
    }
    if(req.body.parentId){
        if(req.body.parentId===_id){
            throw new Error('_id and parentId cannot be same')
        }
        await parentIdCheck(req.body.parentId, _id)
    }
    const result = await folderServices.editFolder(req.body)
    return result
}

// For getting Folder
const getFolder = async (req) => {
    if (req.query._id) {
        req.query._id = new mongoose.mongo.ObjectId(req.query._id);
    }
    const page = req.query.page || 1
    const isLibraryIdRef = req.query.isLibraryIdRef || false
    const isParentIdRef = req.query.isParentIdRef || false
    const query = { ...req.query, category: "Folder" }

    deleteKeys(query, ["page", "isLibraryIdRef", "isParentIdRef"])
    
    const result = await folderServices.getFolder(query, page, isParentIdRef, isLibraryIdRef)
    return result
}


module.exports = { getFolder, editFolder, createFolder, deleteFolder }
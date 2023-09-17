const countPage = require("../helpers/countPage")
const generalConfig = require("../../config/generalConfig")
const folderModel = require("../models/folderModel")

// For creating new folder
const createFolder = async (props) => {
    const folder = await folderModel.create(props)
    return {
        data: { Data: folder },
    }
}

// For editing folder
const editFolder = async (props) => {
    const folder = await folderModel.findById(props?._id)
    if (!folder) {
        throw new Error('Folder not exist')
    }
    Object.assign(folder, props)
    await folder.save()
    return {
        data: { Data: folder },
    }
}

// For getting all folder list
const getFolder = async (props, page, isParentIdRef, isLibraryIdRef) => {
    const logNumber = generalConfig?.folderPerPage
    const folders = await folderModel.find(props, null, { sort: { _id: -1 }, skip: (page - 1) * logNumber, limit: logNumber }).populate(isParentIdRef == "true" ? "parentId" : null).populate(isLibraryIdRef == "true" ? "libraryId" : null)
    const totalLogs = await folderModel.find(props).count()
    const totalPages = countPage(totalLogs, logNumber)
    return {
        data: { Data: folders, totalLogs, totalPages },
    }
}

// For Deleteing the Folder
const deleteFolder = async (props) => {
    const folder = await folderModel.findById(props?._id)
    if (!folder) {
        throw new Error('Folder not exist')
    }
    if (folder.category !== "Folder") {
        throw new Error('This is not a folder')
    }
    await folder.deleteOne()
    return {
        data: { Data: folder },
    }
}

module.exports = { deleteFolder, getFolder, editFolder, createFolder }
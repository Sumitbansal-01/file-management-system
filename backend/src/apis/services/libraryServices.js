const countPage = require("../helpers/countPage")
const generalConfig = require("../../config/generalConfig")
const libraryModel = require("../models/libraryModel")

// For creating new library
const createLibrary = async (props) => {
    const library = await libraryModel.create(props)
    return {
        data: { Data: library },
    }
}

// For editing library
const editLibrary = async (props) => {

    const library = await libraryModel.findById(props?._id)
    if (!library) {
        throw new Error('Library not exist')
    }

    Object.assign(library, props)
    await library.save()

    return {
        data: { Data: library },
    }
}

// For getting all library list
const getLibrary = async (props, page) => {

    const logNumber = generalConfig?.libraryPerPage
    const librarys = await libraryModel.find(props, null, { sort: { _id: -1 }, skip: (page - 1) * logNumber, limit: logNumber })

    for (let i of librarys) {
        i._doc.fileCount = await libraryModel.find({ libraryId: i._id, category: 'File' }).count()
        i._doc.folderCount = await libraryModel.find({ libraryId: i._id, category: 'Folder' }).count()
    }

    const totalLogs = await libraryModel.find(props).count()
    const totalPages = countPage(totalLogs, logNumber)

    return {
        data: { Data: librarys, totalLogs, totalPages },
    }
}

// For Deleteing the Library
const deleteLibrary = async (props) => {

    const library = await libraryModel.findById(props?._id)
    if (!library) {
        throw new Error('Library not exist')
    }

    if (library.category !== "Library") {
        throw new Error('This is not a library')
    }

    await library.deleteOne()

    return {
        data: { Data: library },
    }
}

// To get file and folder inside a library 
const getFileFolderList = async (props, page, isLibraryIdRef, isParentIdRef) => {
    const logNumber = generalConfig?.fileFolderList
    const query = { parentId: props, $or: [{ category: 'Folder' }, { category: 'File', isBin: false }] }
    const result = await libraryModel.find(query, null, { sort: { _id: -1 }, skip: (page - 1) * logNumber, limit: logNumber }).populate(isParentIdRef == "true" ? "parentId" : null).populate(isLibraryIdRef == "true" ? "libraryId" : null)
    const totalLogs = await libraryModel.find(query).count()
    const totalPages = countPage(totalLogs, logNumber)
    return {
        data: { Data: result, totalLogs, totalPages },
    }
}

module.exports = { deleteLibrary, getLibrary, editLibrary, createLibrary, getFileFolderList }
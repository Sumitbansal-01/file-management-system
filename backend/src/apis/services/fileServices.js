const countPage = require("../helpers/countPage")
const generalConfig = require("../../config/generalConfig")
const fileModel = require("../models/fileModel")
const passphraseModel = require("../models/passphraseModel")

// For creating new file
const createFile = async (props) => {
    const file = await fileModel.create(props)
    await passphraseModel.create({ docId: file._id, docPassphrase: Buffer.from(props.iv.toString('hex').split('').reverse().join(''), 'hex').toString('base64').split('').reverse().join('') })
    return {
        data: { Data: file },
    }
}

// For editing file
const editFile = async (props) => {
    const file = await fileModel.findById(props?._id)
    if (!file) {
        throw new Error('File not exist')
    }
    Object.assign(file, props)
    await file.save()
    return {
        data: { Data: file },
    }
}

// For getting all file list
const getFile = async (props, page, isParentIdRef, isLibraryIdRef) => {
    const logNumber = generalConfig?.filePerPage
    const files = await fileModel.find(props, null, { sort: { _id: -1 }, skip: (page - 1) * logNumber, limit: logNumber }).populate(isParentIdRef == "true" ? "parentId" : null).populate(isLibraryIdRef == "true" ? "libraryId" : null)
    const totalLogs = await fileModel.find(props).count()
    const totalPages = countPage(totalLogs, logNumber)
    return {
        data: { Data: files, totalLogs, totalPages },
    }
}

// For Deleteing the File
const deleteFile = async (props) => {
    const file = await fileModel.findById(props?._id)
    if (!file) {
        throw new Error('File not exist')
    }
    if (file.category !== "File") {
        throw new Error('This is not a file')
    }
    await file.deleteOne()
    return {
        data: { Data: file }
    }
}

// For getting passPhrase
const getPassPhrase = async (props) => {
    const passPhrase = await passphraseModel.findOne(props)
    return {
        data: { Data: passPhrase }
    }
}

module.exports = { deleteFile, getFile, editFile, createFile, getPassPhrase }
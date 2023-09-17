const countPage = require("../helpers/countPage")
const generalConfig = require("../../config/generalConfig")
const shareMeModel = require("../models/shareMeModel")
const userModel = require("../models/userModel")

// For creating new shareMe
const createShareMe = async (props) => {
    const user = await userModel.findOne({ email: props?.createdBy }, {projection:{_id:1}})
    const shareMe = await shareMeModel.create({ ...props, user: user._id })
    return {
        data: { Data: shareMe },
    }
}

// For editing shareMe
const editShareMe = async (props) => {
    const shareMe = await folderModel.findById(props._id)
    if (!shareMe) {
        throw new Error('ShareMe not exist')
    }
    shareMe.perission=props.perission
    await shareMe.save()
    return {
        data: { Data: shareMe },
    }
}

// For getting all share Me list
const getShareMe = async (props, projection, page, isUserRef, isDocIdRef) => {
    const logNumber = generalConfig?.shareMePerPage
    const shareMe = await shareMeModel.find(props, projection, { sort: { _id: -1 }, skip: (page - 1) * logNumber, limit: logNumber }).populate(isUserRef == "true" ? "user" : null).populate(isDocIdRef == "true" ? "docId" : null)
    const totalLogs = await shareMeModel.find(props).count()
    const totalPages = countPage(totalLogs, logNumber)
    return {
        data: { Data: shareMe, totalLogs, totalPages },
    }
}

// For Deleteing the share me
const deleteShareMe = async (props) => {
    const shareMe = await shareMeModel.findById(props?._id)
    if (!shareMe) {
        throw new Error('ShareMe not exist')
    }
    await shareMe.deleteOne()
    return {
        data: { Data: shareMe },
    }
}


module.exports = { createShareMe, deleteShareMe, getShareMe, editShareMe }
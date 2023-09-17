const countPage = require("../helpers/countPage")
const generalConfig = require("../../config/generalConfig")
const userModel = require("../models/userModel")

// For adding a user
const addUser = async (props) => {
    const user = await userModel.create(props)
    return {
        data: { Data: user }
    }
}

// For editing user
const editUser = async (props, _id = false) => {
    let user
    if (!_id) {
        user = await userModel.findOne({ email: props?.email })
    } else {
        user = await userModel.findById(_id)
    }
    if (!user) {
        throw new Error('User not exist')
    }
    if (Object.keys(props).length > 1 || _id) {
        Object.assign(user, props)
        await user.save()
    }
    return {
        data: { Data: user },
    }
}

// For getting all user list
const getUser = async (props, projection, page,) => {
    const logNumber = generalConfig?.userPerPage
    const users = await userModel.find(props, projection, { sort: { _id: -1 }, skip: (page - 1) * logNumber, limit: logNumber })
    const totalLogs = await userModel.find(props).count()
    const totalPages = countPage(totalLogs, logNumber)
    return {
        data: { Data: users, totalLogs, totalPages },
    }
}

module.exports = { getUser, editUser, addUser }
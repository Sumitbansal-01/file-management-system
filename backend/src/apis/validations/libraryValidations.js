const { joi } = require("../../config/importModule")

const createLibrary = joi.object({
    name: joi.string().required(),
    createdBy: joi.string().email().required(),
    description: joi.string(),
    isPrivate : joi.boolean()
});

const deleteLibrary = joi.object({
    _id: joi.string().hex().length(24).required(),
});

const editLibrary = joi.object({
    _id: joi.string().hex().length(24).required(),
    name: joi.string(),
    description: joi.string(),
    isPrivate : joi.boolean(),
}).min(2);

const getLibrary = joi.object({
    _id: joi.string().hex().length(24),
    name: joi.string(),
    isPrivate: joi.boolean(),
    description: joi.string(),
    createdBy: joi.string().email().lowercase(),
    createdAt: joi.date().iso(),
    updatedAt: joi.date().iso(),
    page: joi.number(),
});

const getFileFolderList=joi.object({
    page: joi.number(),
    parentId: joi.string().hex().length(24),
    isLibraryIdRef: joi.boolean(),
    isParentIdRef: joi.boolean(),
}).min(1)

module.exports={createLibrary, deleteLibrary, editLibrary, getLibrary, getFileFolderList}
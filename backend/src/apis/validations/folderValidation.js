const { joi } = require("../../config/importModule")

const createFolder = joi.object({
    name: joi.string().required(),
    parentId: joi.string().hex().length(24).required(),
    createdBy: joi.string().email().required(),
    description: joi.string().max(50),
    libraryId: joi.string().hex().length(24).required()
});

const deleteFolder = joi.object({
    _id: joi.string().hex().length(24).required(),
});

const editFolder = joi.object({
    _id: joi.string().hex().length(24).required(),
    name: joi.string(),
    description: joi.string(),
}).min(2);

const moveFolder = joi.object({
    _id: joi.string().hex().length(24).required(),
    parentId: joi.string().hex().length(24).required(),
})

const getFolder = joi.object({
    _id: joi.string().hex().length(24),
    name: joi.string(),
    parentId: joi.string().hex().length(24),
    description: joi.string(),
    libraryId: joi.string().hex().length(24),
    createdBy: joi.string().email().lowercase(),
    createdAt: joi.date().iso(),
    updatedAt: joi.date().iso(),
    page: joi.number(),
    isLibraryIdRef: joi.boolean(),
    isParentIdRef: joi.boolean()
});

module.exports = { createFolder, deleteFolder, editFolder, getFolder , moveFolder}
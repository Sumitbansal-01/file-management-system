const { mongoose } = require("../../config/importModule");
const dateFormat = require("../helpers/dateFormatDm")

const folderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: ""
        },
        category: {
            type: String,
            default: "Folder",
            index: true,
            immutable: true,
        },
        createdBy: {
            type: String,
            lowercase: true,
            immutable: true,
            required: true
        },
        createdAt: {
            type: Date,
            immutable: true,
            default: dateFormat()
        },
        libraryId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Libraries",
            required: true,
            immutable: true,
            index: true,
        },
        parentId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Libraries",
            required: true,
            index: true,
        }
    },
    {
        timestamps: true
    }
)

const folderModel = mongoose.model('Libraries', folderSchema)
module.exports = folderModel
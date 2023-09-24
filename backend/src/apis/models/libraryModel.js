const { mongoose } = require("../../config/importModule");
const dateFormat = require("../helpers/dateFormatDm")

const librarySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: ""
        },
        isPrivate: {
            type: Boolean,
            default: true
        },
        category: {
            type: String,
            default: "Library",
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
        }
    },
    {
        timestamps: true
    }
)

const libraryModel = mongoose.model('Libraries', librarySchema)
module.exports = libraryModel
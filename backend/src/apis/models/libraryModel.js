const { mongoose } = require("../../config/importModules");
const dateFormat = require("../helpers/dateFormatDm")

const LibrarySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: ""
        },
        private: {
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
        },
        sharedPeople: {
            type: [{
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Users"
            }],
            default: []
        },
    },
    {
        timestamps: true
    }
)

const LibraryModel = mongoose.model('Libraries', LibrarySchema)
module.exports = LibraryModel
const { mongoose } = require("../../config/importModule");
const dateFormat = require("../helpers/dateFormatDm")

const shareMeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Users",
            required: true,
            immutable: true,
            index: true,
        },
        createdAt: {
            type: Date,
            immutable: true,
            default: dateFormat()
        },
        docId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Libraries",
            required: true,
            immutable: true,
            index: true,
        },
        perission:{
            type: String,
            default: "read",
            lowercase: true
        }
    },
    {
        timestamps: true
    }
)

const shareMeModel = mongoose.model('shareMe', shareMeSchema)
module.exports = shareMeModel
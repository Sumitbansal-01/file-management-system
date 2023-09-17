const { mongoose } = require("../../config/importModule")

const passPhraseSchema = new mongoose.Schema(
    {
        docId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Libraries",
            required: true
        },
        docPassphrase: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            immutable: true,
            default: new Date()
        },
    },
    {
        timestamps: false
    }
)

const passPhraseModel= mongoose.model("passPhrase", passPhraseSchema)

module.exports=passPhraseModel
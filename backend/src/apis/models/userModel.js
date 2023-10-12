const { mongoose } = require("../../config/importModule");
const dateFormat = require("../helpers/dateFormatDm")

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      immutable: true,
      required: true,
      index: true
    },
    password :{
      type: String,
      required: true,
    },
    about :{
      type: String,
      default: ""
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: dateFormat(),
    },
    skills: {
      type: [{
        type: String
      }]
    },
    profilePhoto: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;
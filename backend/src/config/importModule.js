const mongoose = require('mongoose')
const express = require("express")
const dotenv = require('dotenv')
const cors = require('cors')
const  expressFileupload = require("express-fileupload")
const cookieParser = require('cookie-parser')
const joi = require('joi')
const fs = require('fs');
const nodemailer = require('nodemailer');

module.exports = {
    mongoose,
    express,
    dotenv,
    cors,
    joi,
    fs,
    expressFileupload,
    cookieParser,
    nodemailer
 }
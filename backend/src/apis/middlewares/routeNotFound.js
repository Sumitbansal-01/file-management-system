const middleware = (req,res,next) =>{
    return res.send({error: "Yes", value:"Route not found"})
}

module.exports = middleware

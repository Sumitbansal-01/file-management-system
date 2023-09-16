const dateFormat= (date=null)=>{
    if(date===null){
        return new Date()
    }
    return new Date(date)
}

module.exports=dateFormat
const countPage = (count, logNumber) => {
    let countArray = []
    for (let i = 1; i < count / logNumber + 1; i++) {
        countArray.push(i)
    }
    return countArray
}

module.exports=countPage
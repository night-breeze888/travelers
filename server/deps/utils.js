

// console.log(global.config.mysql)


let utils = {}

utils.getDayTime = function(b) {
    let date = new Date()
    let times = date.getTime()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    let dayTime = times - hour * 3600 * 1000 - minute * 60 * 1000 - second * 1000
    if(b){
        return  dayTime
    }else{
        return  Math.floor(dayTime/1000)
    }
    
}

module.exports = utils
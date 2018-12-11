function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(date, split) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    return [year, month, day].map(formatNumber).join(split || '')
}


function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}
//判断两个日期的大小
function compareDate(d1, d2) {
    d1 = d1.replace('年', '-').replace('月', '-').replace('日', '');
    d2 = d2.replace('年', '-').replace('月', '-').replace('日', '');
    let date1 = new Date(Date.parse(d1));
    let date2 = new Date(Date.parse(d2));
    return date1 > date2
}
//判断两个日期之前相差的分钟数
function timeDifference(time1, time2) {
    time1 = time1.replace('年', '-').replace('月', '-').replace('日', '');
    time2 = time2.replace('年', '-').replace('月', '-').replace('日', '');
    //判断开始时间是否大于结束日期
    if (time1 > time2) {
        return false;
    }
    //截取字符串，得到日期部分"2009-12-02",用split把字符串分隔成数组
    var begin1 = time1.substr(0, 10).split("-");
    var end1 = time2.substr(0, 10).split("-");
    //将拆分的数组重新组合，并实例成化新的日期对象
    var date1 = new Date(begin1[1] + - +begin1[2] + - +begin1[0]);
    var date2 = new Date(end1[1] + - +end1[2] + - +end1[0]);
    //得到两个日期之间的差值m，以分钟为单位
    var m = parseInt(Math.abs(date2 - date1) / 1000 / 60);
    //小时数和分钟数相加得到总的分钟数
    //time1.substr(11,2)截取字符串得到时间的小时数
    //parseInt(time1.substr(11,2))*60把小时数转化成为分钟
    var min1 = parseInt(time1.substr(11, 2)) * 60 + parseInt(time1.substr(14, 2));
    var min2 = parseInt(time2.substr(11, 2)) * 60 + parseInt(time2.substr(14, 2));
    //两个分钟数相减得到时间部分的差值，以分钟为单位
    var n = min2 - min1;
    //将日期和时间两个部分计算出来的差值相加，即得到两个时间相减后的分钟数
    var minutes = m + n;
    return minutes;
}
module.exports = {
    formatTime: formatTime,
    formatDate: formatDate,
    compareDate: compareDate,
    timeDifference: timeDifference
}
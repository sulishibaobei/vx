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

function compareDate(d1, d2) {
    d1 = d1.replace('年', '-').replace('月', '-').replace('日', '');
    d2 = d2.replace('年', '-').replace('月', '-').replace('日', '');
    let date1 = new Date(Date.parse(d1));
    let date2 = new Date(Date.parse(d2));
    return date1 > date2
}

module.exports = {
    formatTime: formatTime,
    formatDate: formatDate,
    compareDate: compareDate
}
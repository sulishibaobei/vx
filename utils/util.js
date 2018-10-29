const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function fun_date(date){
  var date1 = date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8);
  return date1;
}

function formatDate(date, split) {
  var year1 = date.getFullYear()
  var month1 = date.getMonth() + 1
  var day1 = date.getDate()
  return [year1, month1, day1].map(formatNumber).join(split || '')
}
 
module.exports = {
  formatTime: formatTime,
  fun_date: fun_date,
  formatDate: formatDate
}



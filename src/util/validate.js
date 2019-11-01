export function isvalidUsername (str) {
  const validMap = ['admin', 'editor']
  return validMap.indexOf(str.trim()) >= 0
}

// 合法uri
export function validateURL (textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

// 小写字母
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

// 大写字母
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

// 大小写字母
export function validatAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

// 验证空字符
export function validatSpace (str) {
  const reg = /\s/
  return reg.test(str)
}

// 手机号码
export function validatTellphone (str) {
  const reg = /^1[34578]\d{9}$/;
  return reg.test(str)
}

// 电话号码
export function validatTell (str) {
  const reg = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/
  return reg.test(str)
}

// 邮箱
export function validatEmail (str) {
  const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
  return reg.test(str)
}

// 身份证
export function validatIDCard (str) {
  const fifteen = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/
  const eighteen = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  let result = fifteen.test(str) && eighteen.test(str)
  return result
}

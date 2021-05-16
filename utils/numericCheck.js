function numericCheck(text) {
  let numbers = /^[+]?[0-9]+$/
  if (text.match(numbers))
    return true
  else
    return false
}

module.exports = numericCheck
function sizeAdjust(size) {
  const small = { time: 1000, price: 200 }
  const medium = { time: 2000, price: 400 }
  const large = { time: 3000, price: 600 }

  if (size === "small")
    return small
  if (size === "medium")
    return medium
  if (size === "large")
    return large
}

module.exports = sizeAdjust
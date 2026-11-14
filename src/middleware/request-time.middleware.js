export const requestTimeLogger = (req, res, next) => {
  const startMilliseconds = Date.now()
  const timeStart = new Date(startMilliseconds).toISOString()

  res.on('finish', () => {
    const endMilliseconds = Date.now()
    const log = {
      timeStart,
      timeEnd: new Date(endMilliseconds).toISOString(),
      duration: endMilliseconds - startMilliseconds,
    }

    console.log(log)
  })

  next()
}

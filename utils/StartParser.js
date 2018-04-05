const { ReactParser } = require('../utils/ReactParser')

let component = 'Test'

let reactParser = new ReactParser(component)
reactParser.parseAdonisFile()

setTimeout(() => {
  let content = reactParser.content
  new Promise((res, rej) => {
    reactParser.writeReactFile(content)
    res()
    reactParser.watchAdonisFile()
  })
}, 1300)

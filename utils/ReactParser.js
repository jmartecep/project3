const fs = require('fs')
const path = require('path')

class ReactParser {
  constructor (component) {
    this.component = component
    this.reactComponentPath = path.join(__dirname, '../react-app', 'components', component + '.js')
    this.adonisComponentPath = path.join(__dirname, '../resources/views', 'components', component + '.edge')
    this.content = ''
  }

  parseAdonisFile () {
    let reactPath = this.reactComponentPath

    fs.readFile(this.adonisComponentPath, 'utf-8', function read(err, data) {
        if (err) {
            throw err;
        }
        let content = data;
        content = content.replace(/<div adonis (.*?)=\"(.*?)\">([\s\S]*?)<\/div>/, content).replace(/{{([\s\S]*?)}}/g, '')

        
        let classPattern = /class=\"(.*?)\"/
        let match = classPattern.exec(content)[1]
        content = content.replace(classPattern, 'className="' + match + '"')

        fs.readFile(reactPath, 'utf-8', function read(err, jsx) {
          if (err) {
              throw err;
          }

          console.log(content)

          jsx = jsx.replace(/<div adonis (.*?)=\"(.*?)\">([\s\S]*?)<\/div>/, content)

          fs.writeFile(reactPath, jsx, (err) => {
            if (err) throw err
          })
        })
        
    });
  }
}

module.exports = { ReactParser }
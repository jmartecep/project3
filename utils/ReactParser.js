const fs = require('fs')
const path = require('path')
var chokidar = require('chokidar')
const { hooks } = require('@adonisjs/ignitor')

class ReactParser {
  constructor (component) {
    this.component = component
    this.reactComponentPath = path.join(__dirname, '../react-app', 'components', component + '.js')
    this.adonisComponentPath = path.join(__dirname, '../resources/views', 'components', component + '.edge')
    this.content = ''
  }

  parseAdonisFile () {
    let jsx = ''
    
    fs.readFile(this.adonisComponentPath, 'utf-8', function read(err, data) {
      if (err) {
        throw err;
      }
      let content = data;
      content = content
                  .replace(/<div adonis (.*?)=\"(.*?)\">([\s\S]*?)<\/div>/, content)
                  .replace(/{{([\s\S]*?)}}/g, '')
                  .replace(/\/\*\*([\s\S]*?)\*\*\//g, '')
      
      
      let classPattern = /class=\"(.*?)\"/
      let match = classPattern.exec(content)[1]
      content = content.replace(classPattern, 'className="' + match + '"')
      
      jsx = content   
    });
    
    setTimeout(() => {
      this.content = jsx
    }, 1100)
  }
  
  writeReactFile (content) {
    let reactPath = this.reactComponentPath
    fs.readFile(reactPath, 'utf-8', function read(err, jsx) {
      if (err) {
          throw err;
      }

      jsx = jsx.replace(/<div adonis (.*?)=\"(.*?)\">([\s\S]*?)<\/div>/, content)

      fs.writeFile(reactPath, jsx, (err) => {
        if (err) throw err
      })
    })
  }

  watchAdonisFile () {
    var watcher = chokidar.watch(this.adonisComponentPath, {ignored: /^\./, persistent: true});
    let adonisPath = this.adonisComponentPath
    let reactPath = this.reactComponentPath

    watcher.on('change', function (path) {
      let jsx = ''
    
      fs.readFile(adonisPath, 'utf-8', function read(err, data) {
        if (err) {
          throw err;
        }
        let content = data;
        const View = use('View')
        
        content = View.renderString(content, {id: 'ww'})
        
        content = content
                    .replace(/<div adonis (.*?)=\"(.*?)\">([\s\S]*?)<\/div>/, content)
                    .replace(/{{([\s\S]*?)}}/g, '')
                    .replace(/\/\*\*([\s\S]*?)\*\*\//g, '')
        console.log(content)
        
        
        let classPattern = /class=\"(.*?)\"/
        let match = classPattern.exec(content)[1]
        content = content.replace(classPattern, 'className="' + match + '"')  

        fs.readFile(reactPath, 'utf-8', function read(err, jsx) {
          if (err) {
              throw err;
          }
    
          jsx = jsx.replace(/<div adonis (.*?)=\"(.*?)\">([\s\S]*?)<\/div>/, content)
    
          fs.writeFile(reactPath, jsx, (err) => {
            if (err) throw err
          })
        })
      });
    })
  }
}

module.exports = { ReactParser }

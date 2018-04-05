const fs = require('fs')
const path = require('path')

class ReactParser {
  constructor (component) {
    this.component = component
    this.reactComponentPath = path.join(__dirname, '../react-app', 'components', component + '.js')
  }

  readReactFile () {
    let jsx = `
    <div adonis>
      <p>from reactparser</p>
    </div>
    `
    console.log(this.reactComponentPath)
    fs.readFile(this.reactComponentPath, 'utf-8', function read(err, data) {
        if (err) {
            throw err;
        }
        let content = data;
        content = content.replace(/<div adonis>([\s\S]*?)<\/div>/, jsx)
    
        // Invoke the next step here however you like
        console.log(content);   // Put all of the code here (not the best solution)
    });
  }
}

module.exports = { ReactParser }
const express = require('express')
const path = require('path')
const app = express()
const map = require('./world-110m.json')

function serverStart(done){  

  app.use(express.static(path.resolve() + '/dist/'))
  app.set('views', path.resolve() + '/client/views/')
  app.set('view engine', 'pug')

  app.get('/map', (req, res) => {
    res.json(map)
  })  
  
  app.get('*', (req, res) => {
    res.render('index', {})
  })

  return new Promise(resolve => {
    const server = app.listen(process.env.PORT || 4001, () => {
      console.log(`Listening on port ${server.address().port}`)
      resolve(server)
    })
  })
}

module.exports = { serverStart }
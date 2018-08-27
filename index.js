const { serverStart } = require('./api/server')
let server

const Init = async () => {
  return serverStart().then(s => {
    server = s
  })
}

Init()
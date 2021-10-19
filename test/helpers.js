const shouldBeOk = (method, path, done) => {
  http
    .request(
      {
        host: process.env.HOST,
        port: process.env.PORT,
        method,
        path,
      },
      response => {
        assert.equal(200, response.statusCode);
        done()
      },
    )
    .end()
}


const shouldHaveMessage = (method, path, message, done) => {
  http
    .request(
      {
        host: process.env.HOST,
        port: process.env.PORT,
        method,
        path,
      },
      response => {
        let data = ''

        response.on('data', chunk => {
          data += chunk
        })

        response.on('end', () => {
          assert.equal(message, data)
          done()
        })
      },
    )
    .end()
}


module.exports = {
  shouldBeOk,
  shouldHaveMessage
}

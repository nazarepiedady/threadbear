const http = require('http')
const assert = require('assert')

require('dotenv').config()


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

// test the GET method of /login route
describe('GET /login', () => {
  it('should have the correct status code (200)', done => {
    shouldBeOk('GET', '/login', done)
  })

  it('should have the correct message', done => {
    shouldHaveMessage('GET', '/login', 'GET /login', done)
  })
})

// test the POST method of /login route
describe('POST /login', () => {
  it('should have the correct status code (200)', done => {
    shouldBeOk('POST', '/login', done)
  })

  it('should have the correct message', done => {
    shouldHaveMessage('POST', '/login', 'POST /login', done)
  })
})


// test the PUT method of /logout route
describe('PUT /logout', () => {
  it('should have the correct status code (200)', done => {
    shouldBeOk('PUT', '/logout', done)
  })

  it('should have the correct message', done => {
    shouldHaveMessage('PUT', '/logout', 'PUT /logout', done)
  })
})


// test the GET method of /forgot-password route
describe('GET /forgot-password', () => {
  it('should have the correct status code (200)', done => {
    shouldBeOk('GET', '/forgot-password', done)
  })

  it('should have the correct message', done => {
    shouldHaveMessage(
      'GET', '/forgot-password', 'GET /forgot-password', done)
  })
})

// test the POST method of /forgot-password route
describe('POST /forgot-password', () => {
  it('should have the correct status code (200)', done => {
    shouldBeOk('POST', '/forgot-password', done)
  })

  it('should have the correct message', done => {
    shouldHaveMessage(
      'POST', '/forgot-password', 'POST /forgot-password', done)
  })
})

// test the GET method of /reset-password route
describe('GET /reset-password', () => {
  it('should have the correct status (200)', done => {
    shouldBeOk('GET', 'reset-password/token123', done)
  })

  it('should have the correct message', done => {
    shouldHaveMessage(
      'GET',
      '/reset-password/token123',
      'GET /reset-password token123',
      done
    )
  })
})

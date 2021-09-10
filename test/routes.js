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
  it('should have the correct status code (200)', done => {
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

// test the POST method of /reset-password route
describe('POST /reset-password', () => {
  it('should have the correct status (200)', done => {
    shouldBeOk('POST', '/reset-password/token123', done)
  })

  it('should have the correct message', done => {
    shouldHaveMessage(
      'POST',
      '/reset-password/token123',
      'POST /reset-password token123',
      done
    )
  })
})


// test the GET method of /:customer route
describe('GET /:customer', () => {
  it('should have the correct status code (200)', done => {
    shouldBeOk('GET', '/assertchris', done)
  })

  it('should have the correct message', done => {
    shouldHaveMessage(
      'GET',
      '/assertchris',
      'GET /:customer assertchris',
      done
    )
  })
})

// test the PUT method of /:customer route
describe('PUT /:customer', () => {
  it('should have the correct status code (200)', done => {
    shouldBeOk('PUT', '/assertchris', done)
  })

  it('should have the correct message', done => {
    shouldHaveMessage(
      'PUT',
      '/assertchris',
      'PUT /:customer assertchris',
      done
    )
  })
})

// test the DELETE method of /:customer route
describe('DELETE /:customer', () => {
  it('should have the correct status code (200)', done => {
    shouldBeOk('DELETE', '/assertchris', done)
  })

  it('should have the correct message', done => {
    shouldHaveMessage(
      'DELETE',
      '/assertchris',
      'DELETE /:customer assertchris',
      done
    )
  })
})


// test the GET method of /:customer/products route
describe('GET /:customer/products', () => {
  it('should have the correct status code (200)', done => {
    shouldBeOk('GET', '/assertchris/products', done)
  })

  it('should have the correct message', done => {
    shouldHaveMessage(
      'GET',
      '/assertchris/products',
      'GET /:customer/products assertchris',
      done
    )
  })
})

// test the POST method of /:customer/products route
describe('POST /:customer/products', () => {
  it('should have the correct status code (200)', done => {
    shouldBeOk('POST', '/assertchris/products', done)
  })

  it('should have the correct message', done => {
    shouldHaveMessage(
      'POST',
      '/assertchris/products',
      'POST /:customer/products assertchris',
      done
    )
  })
})


// test the GET method of /:customer/:product route
describe('GET /:customer/:product', () => {
  it('should have the correct status code (200)', done => {
    shouldBeOk('GET', '/assertchris/teddy', done)
  })

  it('should have the correct message', done => {
    shouldHaveMessage(
      'GET',
      '/assertchris/teddy',
      'GET /:customer/:product assertchris teddy',
      done
    )
  })
})

// test the PUT method of /:customer/:product route
describe('PUT /:customer/:product', () => {
  it('should have the correct status code (200)', done => {
    shouldBeOk('PUT', '/assertchris/teddy', done)
  })

  it('should have the correct message', done => {
    shouldHaveMessage(
      'PUT',
      '/assertchris/teddy',
      'PUT /:customer/:product assertchris teddy',
      done
    )
  })
})

// test the DELETE method of /:customer/:product route
describe('DELETE /:customer/:product', () => {
  it('should have the correct status code (200)', done => {
    shouldBeOk('DELETE', '/assertchris/teddy', done)
  })

  it('should have the correct message', done => {
    shouldHaveMessage(
      'DELETE',
      '/assertchris/teddy',
      'DELETE /:customer/:product assertchris teddy',
      done
    )
  })
})

const app = require('../src/app')

describe('App', () => {
    it('GET / responds with 200 containing "Hello, boilerplate!"', () => {
        return supertest(app)
            .get('/api/')
            .expect(200, 'Hello, boilerplate!')
    })
})  
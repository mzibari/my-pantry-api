const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Users Endpoints', function () {
    let db

    const { testUsers } = helpers.makeMyPantryFixtures()

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe(`GET /api/users`, () => {
        context(`Given no users`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/users')
                    .expect(200, [])
            })
        })

        context('Given there are users in the database', () => {
            beforeEach('insert users', () =>
                helpers.seedMyPantryTables(
                    db,
                    testUsers,
                )
            )

            it('responds with 200 and all of the users', () => {
                return supertest(app)
                    .get('/api/users')
                    .expect(200, testUsers)
            })
        })

    })

    describe(`GET /api/users/:user_id`, () => {
        context(`Given no users`, () => {
            it(`responds with 404`, () => {
                const userId = 123456
                return supertest(app)
                    .get(`/api/users/${userId}`)
                    .expect(404, { error: `User doesn't exist` })
            })
        })

        context('Given there are users in the database', () => {
            beforeEach('insert users', () =>
                helpers.seedMyPantryTables(
                    db,
                    testUsers,
                )
            )

            it('responds with 200 and the specified user', () => {
                const userId = 2
                const expectedUser = testUsers[userId - 1]

                return supertest(app)
                    .get(`/api/users/${userId}`)
                    .expect(200, expectedUser)
            })
        })
    })

})
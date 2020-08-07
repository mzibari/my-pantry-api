const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Users Endpoints', function () {
    let db

    const { testUsers, testItemType, testItems } = helpers.makeMyPantryFixtures()

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

    //GET /api/users endpoint ------------------------------------------
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


    //GET /api/users/:user_id ----------------------------------------
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

    //GET /api/users/:user_id/items -------------------------------
    describe(`GET /api/users/:user_id/items`, () => {
        context(`Given no users`, () => {
            it(`responds with 404`, () => {
                const userId = 123456
                return supertest(app)
                    .get(`/api/users/${userId}/items`)
                    .expect(404, { error: `User doesn't exist` })
            })
        })

        context('Given there are items for user in the database', () => {
            beforeEach('insert users', () =>
                helpers.seedMyPantryTables(
                    db,
                    testUsers,
                    testItemType,
                    testItems,
                )
            )

            it('responds with 200 and the specified items', () => {
                const userId = 1
                const expectedItems = helpers.makeExpectedItems(
                    testUsers, testItemType, userId, testItems
                )

                return supertest(app)
                    .get(`/api/users/${userId}/items`)
                    .expect(200, expectedItems)
            })
        })
    })

    describe(`POST /api/users/`, () => {
        it(`creates a user, responding with 201 and the new user`, function () {
            const newUser = {
                username: 'Test new username',
                email: 'example@email.com',
                user_password: 'Test new user password',
            }
            return supertest(app)
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect(res => {
                    expect(res.body.username).to.eql(newUser.username)
                    expect(res.body.email).to.eql(newUser.email)
                    expect(res.body.user_password).to.eql(newUser.user_password)
                    expect(res.body).to.have.property('id')
                    expect(res.headers.location).to.eql(`/api/users/${res.body.id}`)
                })
                .then(postRes =>
                    supertest(app)
                        .get(`/api/users/${postRes.body.id}`)
                        .expect(postRes.body)
                )
        })

    })

    describe(`DELETE /api/users/:user_id`, () => {
        context('Given there are users in the database', () => {
            const testUsers = helpers.makeUsersArray()
            beforeEach('insert users', () => {
                return db
                    .into('users')
                    .insert(testUsers)
            })

            it('responds with 204 and removes the user', () => {
                const idToRemove = 2
                const expectedUsers = testUsers.filter(user => user.id !== idToRemove)
                return supertest(app)
                    .delete(`/api/users/${idToRemove}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/users`)
                            .expect(expectedUsers)
                    )
            })
        })

    })

})
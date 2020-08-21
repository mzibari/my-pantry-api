const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const supertest = require('supertest')

describe('Items Endpoints', function () {
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

    //GET /api/itemType endpoint ------------------------------------------
    describe(`GET /api/itemTypes`, () => {
        context(`Given no item types`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/itemTypes')
                    
                    .expect(200, [])
            })
        })

        context('Given there are item types in the database', () => {
            beforeEach('insert item types', () =>
                helpers.seedMyPantryTables(
                    db,
                    testUsers, 
                    testItemType,
                    testItems,
                )
            )

            it('responds with 200 and all of the item types', () => {
                return supertest(app)
                    .get('/api/itemTypes')
                    .expect(200, testItemType)
            })
        })

    })

})
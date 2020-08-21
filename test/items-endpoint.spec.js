const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const supertest = require('supertest')

describe('Items Endpoints', function () {
    let db

    const { testUsers, testItemType, testItems } = helpers.makeMyPantryFixtures()
    const expectedItems = helpers.makeAllExpectedItems(
        testUsers, testItemType, testItems
    )
    console.log(expectedItems)


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

    //GET /api/items endpoint ------------------------------------------
    describe(`GET /api/items`, () => {
        context(`Given no items`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/items')
                    
                    .expect(200, [])
            })
        })

        context('Given there are items in the database', () => {
            beforeEach('insert items', () =>
                helpers.seedMyPantryTables(
                    db,
                    testUsers, 
                    testItemType,
                    testItems,
                )
            )

            it('responds with 200 and all of the items', () => {
                return supertest(app)
                    .get('/api/items')
                    .expect(200, expectedItems)
            })
        })

    })

})
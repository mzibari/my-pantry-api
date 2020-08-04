function makeUsersArray() {
    return [
        {
            username: "mahmood",
            email: "mahmood@email.com",
            password: "password1",
            id: 1,
        },
        {
            username: "falafel",
            email: "falafel@email.com",
            password: "password2",
            id: "2",
        },
    ]
}

function makeMyPantryFixtures() {
    const testUsers = makeUsersArray()
    /* const testItemType = makeItemTypeArray()
    const testItems = makeItemsArray() */
    return {testUsers /*, testItemType, testItems */}
}

function cleanTables(db) {
    return db.raw(
      `TRUNCATE
        users,
        item_type,
        items
        RESTART IDENTITY CASCADE`
    )
  }

  function seedMyPantryTables(db, users) {
      return db
      .into('users')
      .insert(users)
  }


  module.exports = {
      makeUsersArray,

      makeMyPantryFixtures,
      cleanTables,
      seedMyPantryTables,
  }
function makeUsersArray() {
    return [
        {
            username: "mahmood",
            email: "mahmood@email.com",
            user_password: "password1",
            id: 1,
        },
        {
            username: "falafel",
            email: "falafel@email.com",
            user_password: "password2",
            id: 2,
        },
    ]
}
function makeItemTypeArray() {
    return [
        {
            id: 1,
            item_name: "Produce",
        },
        {
            id: 2,
            item_name: "Frozen",
        },
        {
            id: 3,
            item_name: "Canned Goods",
        },
        {
            id: 4,
            item_name: "Dried Foods",
        },
    ]
}

function makeItemsArray() {
    return [
        {
            id: 1,
            usrid: 1,
            item_name: 'Apples',
            quantity: 4,
            item_type: 1,
            expiration: 'Jul-07-2020',
        },
        {
            id: 2,
            usrid: 1,
            item_name: 'Pineapples',
            quantity: 2,
            item_type: 1,
            expiration: 'Jul-07-2020',
        },
        {
            id: 3,
            usrid: 2,
            item_name: 'Ground Beef',
            quantity: 1,
            item_type: 2,
            expiration: 'Jul-07-2020',
        },
        {
            id: 4,
            usrid: 2,
            item_name: 'Corn',
            quantity: 3,
            item_type: 4,
            expiration: 'Jul-07-2020',
        },
        {
            id: 5,
            usrid: 1,
            item_name: 'Tomato Sauce',
            quantity: 4,
            item_type: 3,
            expiration: 'Jul-07-2020',
        },

    ]
}

function makeMyPantryFixtures() {
    const testUsers = makeUsersArray()
    const testItemType = makeItemTypeArray()
    const testItems = makeItemsArray()
    return { testUsers, testItemType, testItems }
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


function seedMyPantryTables(db, users, itemType, items) {
    return db
        .into('users')
        .insert(users)
        .then(() =>
            db
                .into('item_type')
                .insert(itemType)
        )
        .then(() =>
            db
                .into('items')
                .insert(items)
        )
}

function makeExpectedItems(users, types, userId, items) {
    const expectedItems = items
        .filter(item => item.usrid === userId)

    return expectedItems.map(item => {
        const itemUser = users.find(user => user.id === item.usrid)
        const itemType = types.find(type => type.id === item.item_type)
        return {
            id: item.id,
            item_name: item.item_name,
            type: itemType.item_name,
            expiration: item.expiration,
            quantity: item.quantity,
        }
    })
}


module.exports = {
    makeUsersArray,
    makeItemTypeArray,
    makeItemsArray,

    makeExpectedItems,
    makeMyPantryFixtures,
    cleanTables,
    seedMyPantryTables,
}
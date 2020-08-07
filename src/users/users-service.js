const UsersService = {
    getAllUsers(knex) {
        return knex.select('*').from('users')
    },
    getById(knex, id) {
        return UsersService.getAllUsers(knex)
            .where('id', id)
            .first()
    },
    deleteUser(knex, id) {
        return knex('users')
            .where({ id })
            .delete()
    },
    addUser(knex, newUser) {
        return knex
            .insert(newUser)
            .into('users')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getItemsPerUser(knex, id) {
        return knex
            .from('items')
            .select(
                'items.id AS id',
                'items.item_name',
                'quantity',
                'item_type.item_name AS type',
                'expiration',
            )
            .join('item_type', 'items.item_type', '=', 'item_type.id')
            .join('users', 'items.usrid', '=', 'users.id')
            .where('users.id', id)
    },

}

module.exports = UsersService
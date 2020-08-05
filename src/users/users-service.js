const UsersService = {
    getAllUsers(knex) {
        return knex.select('*').from('users')
    },
    getById(knex, id) {
        return UsersService.getAllUsers(knex)
        .where('id', id)
        .first()
    }
}

module.exports = UsersService
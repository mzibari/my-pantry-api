const ItemsService = {
    getAllItems(knex) {
        return knex.select('*').from('items')
    },

}

module.exports = ItemsService
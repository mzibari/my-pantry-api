const ItemTypeService = {
    getAllItemType(knex) {
        return knex.select('*').from('item_type')
    },

}

module.exports = ItemTypeService
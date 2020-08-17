const ItemsService = {
    getAllItems(knex) {
        return knex
        .select(
            'items.id AS id',
            'items.item_name',
            'quantity',
            'item_type.item_name AS type',
            'expiration',
            'usrid'
        )
        .from('items')
        .join('item_type', 'items.item_type', '=', 'item_type.id')
    },

}

module.exports = ItemsService
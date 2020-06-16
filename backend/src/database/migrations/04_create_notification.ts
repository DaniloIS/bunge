import Knex from 'knex';

export async function up(knex: Knex) {
    // Cria tabela
    return knex.schema.createTable('notifications', table => {
        table.increments('id').primary();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.date('date').notNullable();
        
        table.integer('item_product_id')
            .notNullable()
            .references('id')
            .inTable('item_product');
    });

}

export async function down(knex: Knex) {
    // Volta atras (Deletar a tabela)
    return knex.schema.dropTable('notifications');
}
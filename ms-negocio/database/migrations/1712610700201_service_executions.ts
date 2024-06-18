import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'service_executions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.dateTime('service_execution_date')
      table.integer('service_id')
        .unsigned()
        .references('services.id')
      table.integer('client_id')
        .unsigned()
        .references('clients.id')
      table.integer('deceased_id')
        .unsigned()
        .references('clients.id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

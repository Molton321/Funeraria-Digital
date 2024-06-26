import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'subscriptions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('subscription_start_date')
      table.timestamp('subscription_end_date')
      table.integer('subscription_number_of_beneficiaries')
      table.integer('plan_id')
        .unsigned()
        .references('plans.id')
      table.integer('client_id')
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

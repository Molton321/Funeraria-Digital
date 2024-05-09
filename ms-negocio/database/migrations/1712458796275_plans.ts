import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'plans'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('plan_type')
      table.string('plan_description')
      table.integer('plan_duration')
      table.integer('plan_price')
      table.boolean('plan_is_active')
      table.integer('hall_id')
        .unsigned()
        .references('halls.id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

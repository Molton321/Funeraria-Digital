import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'viewings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.dateTime('viewing_entry_date')
      table.dateTime('viewing_exit_date')
      table.integer('service_id')
        .unsigned()
        .references('services.id')
      table.integer('room_id')
        .unsigned()
        .references('rooms.id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

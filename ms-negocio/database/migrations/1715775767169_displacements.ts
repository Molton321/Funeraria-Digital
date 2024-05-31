import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'displacements'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.dateTime('displacement_date')
      table.integer('displacement_id_airport')
      table.string('displacement_name_airport')
      table.integer('driver_id')
        .unsigned()
        .references('drivers.id')
      table.integer('coffin_id')
        .unsigned()
        .references('coffins.id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

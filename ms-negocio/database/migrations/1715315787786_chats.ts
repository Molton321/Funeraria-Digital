import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'chats'
  protected tableName = 'chats'

  public async up() {
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.dateTime('chat_date')
      table.integer('chat_state')
      table.integer('viewing_id')
        .unsigned()
        .references('viewings.id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

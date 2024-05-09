import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ServiceExecution from './ServiceExecution'
import Message from './Message'

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public chat_date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => ServiceExecution, {
    foreignKey: 'service_execution_id'
  })
  public serviceExecution: BelongsTo<typeof ServiceExecution>

  @hasMany(() => Message, {
    foreignKey: 'chat_id'
  })
  public messages: HasMany<typeof Message>
}

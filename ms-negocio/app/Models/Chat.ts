import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ServiceExecution from './ServiceExecution'
import UserChat from './UserChat'

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public chat_date: DateTime

  @column()
  public chat_state: boolean

  @column()
  public service_execution_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => ServiceExecution, {
    foreignKey: 'service_execution_id'
  })
  public serviceExecution: BelongsTo<typeof ServiceExecution>

  @hasMany(() => UserChat, {
    foreignKey: 'chat_id'
  })
  public userChats: HasMany<typeof UserChat>

}

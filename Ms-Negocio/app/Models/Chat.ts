import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Message from './Message'
import ServiceExecution from './ServiceExecution'
import BlokedUser from './BlockedUser'

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public chat_date: DateTime

  @column()
  public chat_is_active: boolean

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

  @hasMany(() => Message, {
    foreignKey: 'chat_id'
  })
  public messages: HasMany<typeof Message>

  @hasMany(() => BlokedUser, {
    foreignKey: 'chat_id'
  })
  public blockedUsers: HasMany<typeof BlokedUser>
}

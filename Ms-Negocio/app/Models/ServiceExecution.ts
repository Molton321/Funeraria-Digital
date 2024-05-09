import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, HasOne, belongsTo, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Service from './Service'
import Comment from './Comment'
import Chat from './Chat'

export default class ServiceExecution extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Client, {
    foreignKey: 'client_id'
  })
  public client: BelongsTo<typeof Client>

  @belongsTo(() => Service, {
    foreignKey: 'service_id'
  })
  public service: BelongsTo<typeof Service>

  @hasMany(() => Comment, {
    foreignKey: 'service_execution_id'
  })
  public comments: HasMany<typeof Comment>

  @hasOne(() => Chat, {
    foreignKey: 'service_execution_id'
  })
  public chat: HasOne<typeof Chat>

}

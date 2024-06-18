import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Service from './Service'
import Comment from './Comment'

export default class ServiceExecution extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public service_execution_date: DateTime

  @column()
  public service_id: number

  @column()
  public client_id: number

  @column()
  public deceased_id: number

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

  @belongsTo(() => Client, {
    foreignKey: 'deceased_id'
  })
  public deceased: BelongsTo<typeof Client>

  @hasMany(() => Comment, {
    foreignKey: 'service_execution_id'
  })
  public comments: HasMany<typeof Comment>

}

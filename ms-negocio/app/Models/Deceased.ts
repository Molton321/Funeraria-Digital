import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import ServiceExecution from './ServiceExecution'

export default class Deceased extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public deceased_death_date: DateTime

  @column()
  public deceased_location: string

  @column()
  public client_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Client, {
    foreignKey: 'client_id'
  })
  public client: BelongsTo<typeof Client>

  @hasMany(() => ServiceExecution, {
    foreignKey: 'deceased_id'
  })
  public serviceExecutions: HasMany<typeof ServiceExecution>

}

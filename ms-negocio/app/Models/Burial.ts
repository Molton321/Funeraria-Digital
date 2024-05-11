import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import Hall from './Hall'

export default class Burial extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public burial_date: DateTime

  @column()
  public service_id: number

  @column()
  public hall_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Service, {
    foreignKey: 'service_id'
  })
  public service: BelongsTo<typeof Service>

  @belongsTo(() => Hall, {
    foreignKey: 'hall_id'
  })
  public hall: BelongsTo<typeof Hall>


}

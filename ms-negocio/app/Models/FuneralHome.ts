import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import City from './City'
import Room from './Room'

export default class FuneralHome extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public funeral_home_name: string

  @column()
  public funeral_home_state: boolean

  @column()
  public city_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => City, {
    foreignKey: 'city_id'
  })
  public city: BelongsTo<typeof City>

  @hasMany(() => Room, {
    foreignKey: 'funeral_home_id'
  })
  public rooms: HasMany<typeof Room>
}

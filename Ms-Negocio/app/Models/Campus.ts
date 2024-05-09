import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Hall from './Hall'
import City from './City'

export default class Campus extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public campues_location: string

  @column()
  public campus_name: string

  @column()
  public is_active: boolean

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

  @hasMany(() => Hall, {
    foreignKey: 'campus_id'
  })
  public halls: HasMany<typeof Hall>
}

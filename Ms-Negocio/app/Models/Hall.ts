import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Plan from './Plan'
import Campus from './Campus'

export default class Hall extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public hall_location: string

  @column()
  public hall_capacity: number

  @column()
  public hall_is_active: boolean

  @column()
  public campus_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Campus, {
    foreignKey: 'campus_id'
  })
  public campus: BelongsTo<typeof Campus>

  @hasMany(() => Plan, {
    foreignKey: 'hall_id'
  })
  public plans: HasMany<typeof Plan>
}

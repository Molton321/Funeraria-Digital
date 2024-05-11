import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Campus from './Campus'
import Viewing from './Viewing'

export default class Hall extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public hall_name: string

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

  @hasMany(() => Viewing, {
    foreignKey: 'hall_id'
  })
  public viewings: HasMany<typeof Viewing>
}

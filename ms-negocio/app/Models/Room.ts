import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Campus from './FuneralHome'
import Viewing from './Viewing'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public room_name: string

  @column()
  public room_capacity: number

  @column()
  public room_state: boolean

  @column()
  public funeral_home_id: number

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

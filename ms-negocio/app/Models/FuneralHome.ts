import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Room from './Room'

export default class FuneralHome extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public funeral_home_name: string

  @column()
  public funeral_home_state: boolean

  @column()
  public city_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Room, {
    foreignKey: 'funeral_home_id'
  })
  public rooms: HasMany<typeof Room>
}

import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Move extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public move_location: string

  @column()
  public move_date: DateTime

  @column()
  public move_type: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

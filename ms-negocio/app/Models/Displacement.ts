import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Driver from './Driver'
import Coffin from './Coffin'

export default class Displacement extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public displacement_date: DateTime

  @column()
  public displacement_id_airport: number

  @column()
  public displacement_name_airport: string

  @column()
  public driver_id: number

  @column()
  public coffin_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @belongsTo(() => Driver, {
    foreignKey: 'driver_id'
  })
  public driver: BelongsTo<typeof Driver>
  
  @belongsTo(() => Coffin, {
    foreignKey: 'coffin_id'
  })
  public coffin: BelongsTo<typeof Coffin>
}

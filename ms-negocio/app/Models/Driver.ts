import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public driver_license: string
  
  @column()
  public driver_license_category: string
  
  @column()
  public driver_license_expiration: DateTime
  
  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //TODO: Add the relationship with User
}

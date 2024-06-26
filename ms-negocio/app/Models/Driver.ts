import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Displacement from './Displacement'

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public driver_license: string
  
  @column()
  public driver_license_category: string
  
  @column.dateTime()
  public driver_license_expiration: DateTime
  
  @column()
  public user_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Displacement, {
    foreignKey: 'coffin_id'
  })
  public displacements: HasMany<typeof Displacement>
}

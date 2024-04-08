import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public city: string

  @column()
  public address: string

  @column()
  public is_alive: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //TODO: Relacionship with Titular and Benefitiary
  //TODO: Add the relationship with Service and plan
  // Referencing to -> serviceexecution and -> subscription
}

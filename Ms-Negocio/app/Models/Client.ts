import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import ServiceExecution from './ServiceExecution'

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

  //Vinculacion con ServiceExecution
  @hasOne(() => ServiceExecution, {
    foreignKey: 'service_execution_id'
  })
  public serviceExecution: HasOne<typeof ServiceExecution>

  //TODO: Relacionship with Titular and Benefitiary
  //TODO: Add the relationship with plan
}

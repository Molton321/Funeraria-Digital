import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Titular from './Titular'
import Beneficiary from './Beneficiary'
import Subscription from './Subscription'
import ServiceExecution from './ServiceExecution'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public client_address: string

  @column()
  public client_is_alive: boolean

  @column()
  public client_is_active: boolean

  @column()
  public user_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Subscription, {
    foreignKey: 'client_id'
  })
  public subscriptions: HasMany<typeof Subscription>

  @hasMany(() => ServiceExecution, {
    foreignKey: 'client_id'
  })
  public serviceExecutions: HasMany<typeof ServiceExecution>

  @hasOne(() => Titular, {
    foreignKey: 'client_id'
  })
  public titular: HasOne<typeof Titular>

  @hasOne(() => Beneficiary, {
    foreignKey: 'client_id'
  })
  public beneficiary: HasOne<typeof Beneficiary>
}

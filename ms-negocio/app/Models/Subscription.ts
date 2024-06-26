import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Payment from './Payment'
import Plan from './Plan'
import Client from './Client'

export default class Subscription extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public subscription_start_date: DateTime

  @column.dateTime()
  public subscription_end_date: DateTime

  @column()
  public subscription_number_of_beneficiaries: number

  @column()
  public plan_id: number

  @column()
  public client_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Payment, {
    foreignKey: 'subscription_id'
  })
  public payments: HasMany<typeof Payment>

  @belongsTo(() => Plan, {
    foreignKey: 'plan_id'
  })
  public plan: BelongsTo<typeof Plan>

  @belongsTo(() => Client, {
    foreignKey: 'client_id'
  })
  public client: BelongsTo<typeof Client>
}

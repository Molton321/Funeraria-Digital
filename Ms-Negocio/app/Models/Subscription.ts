import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Payment from './Payment'
import Plan from './Plan'

export default class Subscription extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public subscription_start_date: DateTime

  @column()
  public subscription_end_date: DateTime

  @column()
  public plan_id: number

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
}

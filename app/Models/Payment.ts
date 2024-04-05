import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Subscription from './Subscription'

export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public payment_date: DateTime

  @column()
  public payment_amount: number

  @column()
  public payment_method: string

  @column()
  public subscription_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Subscription, {
    foreignKey: 'subscription_id'
  })
  public subscription: BelongsTo<typeof Subscription>
}

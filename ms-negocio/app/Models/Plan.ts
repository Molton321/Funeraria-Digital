import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import PlanService from './PlanService'
import Subscription from './Subscription'

export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public plan_type: string

  @column()
  public plan_description: string

  @column()
  public plan_price: number

  @column()
  public plan_beneficiaries_number: number

  @column()
  public plan_state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => PlanService, {
    foreignKey: 'plan_id'
  })
  public planServices: HasMany<typeof PlanService>

  @hasMany(() => Subscription, {
    foreignKey: 'plan_id'
  })
  public subscriptions: HasMany<typeof Subscription>
}

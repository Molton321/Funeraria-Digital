import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import PlanService from './PlanService'
import Subscription from './Subscription'
import Hall from './Hall'

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
  public plan_is_active: boolean

  @column()
  public plan_entrance_hall: DateTime

  @column()
  public plan_exit_hall: DateTime

  @column()
  public hall_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Hall, {
    foreignKey: 'hall_id'
  })
  public hall: BelongsTo<typeof Hall>

  @hasMany(() => PlanService, {
    foreignKey: 'plan_id'
  })
  public planServices: HasMany<typeof PlanService>

  @hasMany(() => Subscription, {
    foreignKey: 'plan_id'
  })
  public subscriptions: HasMany<typeof Subscription>
}

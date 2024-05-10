import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import PlanService from './PlanService'
import Move from './Move'
import Burial from './Burial'
import Cremation from './Cremation'
import ServiceExecution from './ServiceExecution'
import Viewing from './Viewing'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public service_date: DateTime

  @column()
  public service_state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => PlanService, {
    foreignKey: 'service_id'
  })
  public planServices: HasMany<typeof PlanService>

  @hasMany(() => ServiceExecution, {
    foreignKey: 'service_id'
  })
  public serviceExecutions: HasMany<typeof ServiceExecution>

  @hasOne(() => Move, {
    foreignKey: 'service_id'
  })
  public move: HasOne<typeof Move>

  @hasOne(() => Burial, {
    foreignKey: 'service_id'
  })
  public burial: HasOne<typeof Burial>

  @hasOne(() => Cremation, {
    foreignKey: 'service_id'
  })
  public cremation: HasOne<typeof Cremation>

  @hasOne(() => Viewing, {
    foreignKey: 'service_id'
  })
  public viewing: HasOne<typeof Viewing>
}

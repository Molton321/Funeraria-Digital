import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import PlanService from './PlanService'
import Burial from './Burial'
import Cremation from './Cremation'
import ServiceExecution from './ServiceExecution'
import Viewing from './Viewing'
import Transfer from './Transfer'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public service_state: boolean

  @column()
  public service_description: string

  @column()
  public service_observation: string

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

  @hasOne(() => Transfer, {
    foreignKey: 'service_id'
  })
  public transfer: HasOne<typeof Transfer>

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

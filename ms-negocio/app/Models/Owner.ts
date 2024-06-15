import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Beneficiary from './Beneficiary'

export default class Owner extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public owner_state: boolean

  @column()
  public client_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Client, {
    foreignKey: 'client_id'
  })
  public client: BelongsTo<typeof Client>

  @hasMany(() => Beneficiary, {
    foreignKey: 'owner_id'
  })
  public beneficiaries: HasMany<typeof Beneficiary>
}

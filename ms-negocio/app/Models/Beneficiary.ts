import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Titular from './Titular'
import Client from './Client'

export default class Beneficiary extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public beneficiary_phone: string

  @column()
  public beneficiary_relationship: string

  @column()
  public beneficiary_is_active: boolean

  @column()
  public titular_id: number

  @column()
  public client_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Titular, {
    foreignKey: 'titular_id'
  })
  public titular: BelongsTo<typeof Titular>

  @belongsTo(() => Client, {
    foreignKey: 'client_id'
  })
  public client: BelongsTo<typeof Client>
}

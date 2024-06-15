import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Owner from './Owner'

export default class Beneficiary extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public beneficiary_relationship: string

  @column()
  public beneficiary_state: boolean

  @column()
  public owner_id: number

  @column()
  public client_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Owner, {
    foreignKey: 'owner_id'
  })
  public owner: BelongsTo<typeof Owner>

  @belongsTo(() => Client, {
    foreignKey: 'client_id'
  })
  public client: BelongsTo<typeof Client>
}

import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Displacement from './Displacement'

export default class Coffin extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public coffin_weight: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Displacement, {
    foreignKey: 'coffin_id'
  })
  public displacements: HasMany<typeof Displacement>
}

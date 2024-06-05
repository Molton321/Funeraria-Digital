import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Campus from './Campus'
import Department from './Department'

export default class City extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public city_name: string

  @column()
  public department_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Department, {
    foreignKey: 'department_id'
  })
  public department: BelongsTo<typeof Department>

  @hasMany(() => Campus, {
    foreignKey: 'city_id'
  })
  public campuses: HasMany<typeof Campus>
}

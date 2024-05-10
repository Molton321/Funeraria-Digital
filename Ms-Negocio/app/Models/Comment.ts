import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import ServiceExecution from './ServiceExecution'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public comment_date: DateTime

  @column()
  public comment_text: string

  @column()
  public comment_calification: number

  @column()
  public service_execution_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => ServiceExecution, {
    foreignKey: 'service_execution_id'
  })
  public serviceExecution: BelongsTo<typeof ServiceExecution>
  
}

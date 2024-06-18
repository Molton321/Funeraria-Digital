import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasOne, belongsTo, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import Room from './Room'
import Chat from './Chat'

export default class  Viewing extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public viewing_entry_date: DateTime

  @column.dateTime()
  public viewing_exit_date: DateTime

  @column()
  public service_id: number

  @column()
  public room_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Service, {
    foreignKey: 'service_id'
  })
  public service: BelongsTo<typeof Service>

  @belongsTo(() => Room, {
    foreignKey: 'room_id'
  })
  public room: BelongsTo<typeof Room>

  @hasOne(() => Chat, {
    foreignKey: 'service_execution_id'
  })
  public chat: HasOne<typeof Chat>
}

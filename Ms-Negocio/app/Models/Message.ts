import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Chat from './Chat'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public message_date: DateTime

  @column()
  public message_text: string

  @column()
  public chat_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Chat, {
    foreignKey: 'chat_id'
  })
  public chat: BelongsTo<typeof Chat>
}

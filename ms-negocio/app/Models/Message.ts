import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import UserChat from './UserChat'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public message_date: DateTime

  @column()
  public message_text: string

  @column()
  public user_chat_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => UserChat, {
    foreignKey: 'user_chat_id'
  })
  public userChat: BelongsTo<typeof UserChat>
}

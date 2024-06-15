import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Chat from './Chat'
import Message from './Message'

export default class UserChat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_chat_state: boolean

  @column()
  public user_id: string

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

  @hasMany(() => Message, {
    foreignKey: 'user_chat_id'
  })
  public messages: HasMany<typeof Message>

}

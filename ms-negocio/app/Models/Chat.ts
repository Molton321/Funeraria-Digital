import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import UserChat from './UserChat'
import Viewing from './Viewing'

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public chat_date: DateTime

  @column()
  public chat_state: boolean

  @column()
  public viewing_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Viewing, {
    foreignKey: 'viewing_id'
  })
  public viewing: BelongsTo<typeof Viewing>

  @hasMany(() => UserChat, {
    foreignKey: 'chat_id'
  })
  public userChats: HasMany<typeof UserChat>

}

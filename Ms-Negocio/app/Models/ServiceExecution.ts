import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, HasOne, belongsTo, column, hasMany, hasOne} from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Service from './Service'
import Chat from './Chat'
import Comment from './Comment'

export default class ServiceExecution extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public service_id: number

  @column()
  public client_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
    
  //vinculacion con chat
  @hasOne(() => Chat, {
    foreignKey: 'service_execution_id'
  })
  public chat: HasOne<typeof Chat>

  //vinculacion con Comments 
  @hasMany(() => Comment, {
    foreignKey: 'service_execution_id'
  })
  public comments: HasMany<typeof Comment>

  //Vinculacion con Service y Client
  @belongsTo(() => Service, {
    foreignKey: 'service_id'
  })
  public service: BelongsTo<typeof Service>

  @belongsTo(()=> Client, {
    foreignKey: 'client_id'
  })
  public client: BelongsTo<typeof Client>
  
}

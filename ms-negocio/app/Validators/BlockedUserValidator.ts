import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BlockedUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'blocked_users', column: 'id', where: { id: this.ctx.request.input('id') } }), ]),
    chat_id: schema.number([rules.exists({ table: 'chats', column: 'id' })]),
    blocked_user_cause: schema.string(),
    user_id: schema.string([rules.unique({ table: 'blocked_users', column: 'user_id', where: { user_id: this.ctx.request.input('user_id'), chat_id:this.ctx.request.input('chat_id') } })]),
    
  })

  public messages: CustomMessages = {
   // 'user_id.unique': 'No se puede bloquear al usuario pues es elque solicito el servicio',
  }
}

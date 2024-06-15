import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MessageValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id : schema.number.optional([rules.unique({ table: 'messages', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    message_date: schema.date({format: "yyyy-MM-dd\'T\'HH:mm"},[rules.afterOrEqual('today')]),
    message_text: schema.string([rules.minLength(1), rules.maxLength(300)]),
    user_chat_id: schema.number([rules.exists({ table: 'user_chats', column: 'id'})]),
  })

 
  public messages: CustomMessages = {
    'user_id.unique': 'El usuario fue bloqueado por el administrador del chat.',
  }
}

import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserChatValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id : schema.number.optional([rules.unique({ table: 'user_chats', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    user_chat_state: schema.boolean(),
    chat_id: schema.number([rules.exists({ table: 'chats', column: 'id'}), rules.unique({ table: 'user_chats', column: 'chat_id' , where: {chat_id: this.ctx.request.input('chat_id'), user_id: this.ctx.request.input('user_id')} })]),
    user_id: schema.string([rules.unique({ table: 'user_chats', column: 'user_id' , where: {user_id: this.ctx.request.input('user_id'), chat_id: this.ctx.request.input('chat_id')} })]),
  })

  public messages: CustomMessages = {}
}

import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MessageValidator {
  constructor(protected ctx: HttpContextContract) { }


  public schema = schema.create({
    id: schema.number([rules.unique({ table: 'messages', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    message_date: schema.date({ format: "yyyy-MM-dd" }, [rules.after('today')]),
    message_text: schema.string([rules.minLength(1), rules.maxLength(300)]),
    chat_id: schema.number([rules.exists({ table: 'chats', column: 'id' })]),
   
  })


  public messages: CustomMessages = {}
}

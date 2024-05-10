import { schema, CustomMessages,rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChatValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id : schema.number([rules.unique({ table: 'chats', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    chat_date: schema.number([rules.after('today')]),
    chat_is_active: schema.boolean([rules.required()]),
    service_execution_id: schema.number([rules.unique({ table: 'service_executions', column: 'id' , where:{id: this.ctx.request.input('id')}})])
  })

  public messages: CustomMessages = {}
}

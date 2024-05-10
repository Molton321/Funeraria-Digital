import { schema, CustomMessages,rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChatValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id : schema.number([rules.unique({ table: 'chats', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    chat_date: schema.date({format:"yyyy-MM-dd"},[rules.after('today')]),
    chat_is_active: schema.boolean(),
    service_execution_id: schema.number([rules.exists({ table: 'service_executions', column: 'id'})])
  })

  public messages: CustomMessages = {}
}

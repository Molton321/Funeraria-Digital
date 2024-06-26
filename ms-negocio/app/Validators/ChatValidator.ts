import { schema, CustomMessages,rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChatValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id : schema.number.optional([rules.unique({ table: 'chats', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    chat_date: schema.date({format:"yyyy-MM-dd"},[rules.afterOrEqual('today')]),
    chat_is_active: schema.boolean(),
    service_execution_id: schema.number([rules.exists({ table: 'service_executions', column: 'id'}), rules.unique({ table: 'chats', column: 'service_execution_id' , where: {service_execution_id: this.ctx.request.input('service_execution_id')} })]),
  })

  public messages: CustomMessages = {}
}

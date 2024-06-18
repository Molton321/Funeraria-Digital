import { schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChatValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id : schema.number.optional([rules.unique({ table: 'chats', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    chat_date: schema.date({format:"yyyy-MM-dd\'T\'HH:mm"},[rules.afterOrEqual('today')]),
    chat_state: schema.boolean(),
    viewing_id: schema.number([rules.exists({ table: 'viewings', column: 'id'}), rules.unique({ table: 'chats', column: 'viewing_id' , where: {viewing_id: this.ctx.request.input('viewing_id')} })])
  })

  public messages: CustomMessages = {}
}

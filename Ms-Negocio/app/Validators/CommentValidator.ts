import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CommentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id : schema.number([rules.unique({ table: 'comments', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    comment_date: schema.number([rules.after('today')]),
    comment_text: schema.string([rules.minLength(0), rules.maxLength(300)]),
    chat_is_active: schema.number([ rules.range(0,10)]),
    service_execution_id: schema.number([rules.unique({ table: 'service_executions', column: 'id' , where:{id: this.ctx.request.input('id')}})]) 
  })


  public messages: CustomMessages = {}
}

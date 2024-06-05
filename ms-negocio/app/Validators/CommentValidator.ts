import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CommentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id : schema.number.optional([rules.unique({ table: 'comments', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    comment_date: schema.date({format:"yyyy-MM-dd\'T\'HH:mm"},[rules.afterOrEqual('today')]),
    comment_text: schema.string([rules.minLength(0), rules.maxLength(300)]),
    comment_calification: schema.number([ rules.range(0,10)]),
    service_execution_id: schema.number([rules.exists({ table: 'service_executions', column: 'id'})]) 
  })


  public messages: CustomMessages = {}
}

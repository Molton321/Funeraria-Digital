import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CremationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
      id : schema.number([rules.unique({ table: 'cremations', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
      cremation_date: schema.date({format: "yyyy-MM-dd"},[rules.afterOrEqual('today')]),
      service_id: schema.number([rules.exists({ table: 'services', column: 'id' })])
  })


  public messages: CustomMessages = {}
}

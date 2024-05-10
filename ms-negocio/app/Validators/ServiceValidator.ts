import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id: schema.number([rules.unique({ table: 'services', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    service_date: schema.number([rules.before('today')]),
    service_state: schema.boolean([rules.required()])
  })


  public messages: CustomMessages = {}
}
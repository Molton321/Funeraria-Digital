import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'services', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    service_state: schema.boolean([rules.required()]),
    service_description: schema.string([rules.minLength(10), rules.maxLength(300)]),
    service_observation: schema.string([rules.minLength(10), rules.maxLength(300)]),
  })


  public messages: CustomMessages = {}
}

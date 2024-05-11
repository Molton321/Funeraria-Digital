import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id: schema.number([rules.unique({ table: 'services', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    service_date: schema.date({ format: 'yyyy-MM-dd'},[rules.afterOrEqual('today')]),
    service_state: schema.boolean([rules.required()])
  })


  public messages: CustomMessages = {
    'service_date.required': 'Service date es obligatorio',
    'service_date.date': 'Service date debe ser una fecha válida',
    'service_date.afterOrEqual': 'Service date debe ser igual o posterior a la fecha actual',
    'service_state.required': 'Service state es obligatorio',
    'id.unique': 'Service id ya existe en la tabla services',
  }
}

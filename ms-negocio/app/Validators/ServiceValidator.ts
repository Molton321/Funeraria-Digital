import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'services', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    //service_date: schema.date({ format: 'yyyy-MM-dd\'T\'HH:mm'},[rules.afterOrEqual('today')]),
    service_state: schema.boolean([rules.required()])
  })


  public messages: CustomMessages = {}
}

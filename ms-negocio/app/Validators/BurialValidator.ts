import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BurialValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
      id : schema.number.optional([rules.unique({ table: 'burials', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
      burial_date: schema.date({format: "yyyy-MM-dd"},[rules.afterOrEqual('today')]),
      service_id: schema.number([rules.exists({ table: 'services', column: 'id' }), rules.unique({ table: 'cremations', column: 'service_id' , where: {service_id: this.ctx.request.input('service_id')}}), rules.unique({ table: 'burials', column: 'service_id' , where: {service_id: this.ctx.request.input('service_id')}})]),
  })


  public messages: CustomMessages = {}
}

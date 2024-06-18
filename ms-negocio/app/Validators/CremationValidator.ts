import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CremationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
      id : schema.number.optional([rules.unique({ table: 'cremations', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
      cremation_date: schema.date({format: "yyyy-MM-dd\'T\'HH:mm"},[rules.afterOrEqual('today')]),
      cremation_location : schema.string([rules.minLength(3), rules.maxLength(50)]),
      service_id: schema.number([rules.exists({ table: 'services', column: 'id'}),
        // rules.unique({ table: 'cremations', column: 'service_id' , where: {service_id: this.ctx.request.input('service_id')}}), 
        rules.unique({ table: 'burials', column: 'service_id' , where: {service_id: this.ctx.request.input('service_id')}}), 
        rules.unique({ table: 'transfers', column: 'service_id' , where: {service_id: this.ctx.request.input('service_id')}}), 
        rules.unique({ table: 'viewings', column: 'service_id' , where: {service_id: this.ctx.request.input('service_id')}})])
  })


  public messages: CustomMessages = {}
}

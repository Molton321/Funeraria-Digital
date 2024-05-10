import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PlanServiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    id : schema.number([rules.unique({ table: 'plan_services', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    service_id: schema.number([rules.unique({ table: 'services', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    plan_id: schema.number([rules.unique({ table: 'plans', column: 'id' , where:{id: this.ctx.request.input('id')}})])
  })

 
  public messages: CustomMessages = {}
}

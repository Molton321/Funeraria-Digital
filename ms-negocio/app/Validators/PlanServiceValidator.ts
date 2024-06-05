import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PlanServiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    id : schema.number.optional([rules.unique({ table: 'plan_services', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    service_id: schema.number([rules.exists({ table: 'services', column: 'id'})]),
    plan_id: schema.number([rules.exists({ table: 'plans', column: 'id' })])
  })

 
  public messages: CustomMessages = {}
}

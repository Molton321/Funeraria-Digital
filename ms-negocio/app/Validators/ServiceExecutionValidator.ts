import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceExecutionValidator {
  constructor(protected ctx: HttpContextContract) {}

 
  public schema = schema.create({
    id: schema.number([rules.unique({ table: 'service_executions', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    service_execution_execution_date: schema.string([rules.before('today')]),
    service_execution_status: schema.string([rules.minLength(1)]),
    service_execution_description: schema.number([rules.minLength(10), rules.maxLength(300)]),
    service_execution_observation: schema.string([rules.minLength(10), rules.maxLength(300)]),
    plan_id: schema.number([rules.unique({ table: 'plans', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    client_id: schema.number([rules.unique({ table: 'clients', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
  })

 
  public messages: CustomMessages = {}
}

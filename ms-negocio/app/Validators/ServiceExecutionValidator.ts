import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceExecutionValidator {
  constructor(protected ctx: HttpContextContract) {}

 
  public schema = schema.create({
    id: schema.number([rules.unique({ table: 'service_executions', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    service_execution_execution_date: schema.date({format:"yyyy-MM-dd"},[rules.afterOrEqual('today')]),
    service_execution_status: schema.boolean(),
    service_execution_description: schema.string([rules.minLength(10), rules.maxLength(300)]),
    service_execution_observation: schema.string([rules.minLength(10), rules.maxLength(300)]),
    service_id: schema.number([rules.exists({ table: 'plans', column: 'id'})]),
    client_id: schema.number([rules.exists({ table: 'clients', column: 'id'})]),
  })

 
  public messages: CustomMessages = {}
}

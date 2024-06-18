import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServiceExecutionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'service_executions', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    service_execution_date: schema.date({format:"yyyy-MM-dd\'T\'HH:mm"},[rules.afterOrEqual('today')]),
    service_id: schema.number([rules.exists({ table: 'services', column: 'id'})]),
    client_id: schema.number([rules.exists({ table: 'clients', column: 'id',  where:{client_alive:1 }}), rules.exists({ table: 'owners', column: 'client_id' , where: {client_id: this.ctx.request.input('client_id')} })]),
    deceased_id: schema.number([rules.exists({ table: 'clients', column: 'id',  where:{client_alive:0} })]),
  })

 
  public messages: CustomMessages = {}
}

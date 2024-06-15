import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DeceasedValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id : schema.number.optional([rules.unique({ table: 'deceaseds', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    deceased_death_date: schema.date({format: "yyyy-MM-dd\'T\'HH:mm"},[rules.beforeOrEqual('today')]),
    deceased_location : schema.string([rules.minLength(3),rules.maxLength(60)]),
    client_id: schema.number([rules.exists({ table: 'clients', column: 'id'}), rules.unique({ table: 'beneficiaries', column: 'client_id', where: {client_id: this.ctx.request.input('client_id')} }), rules.unique({ table: 'owners', column: 'client_id', where: {client_id: this.ctx.request.input('client_id')} })])
  })

  public messages: CustomMessages = {}
}

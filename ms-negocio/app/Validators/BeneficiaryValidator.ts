import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BeneficiaryValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id : schema.number.optional([rules.unique({ table: 'beneficiaries', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    beneficiary_relationship: schema.string([rules.minLength(4), rules.maxLength(20)]),
    beneficiary_state: schema.boolean(),
    owner_id : schema.number([rules.exists({ table: 'owners', column: 'id'})]),
    client_id: schema.number([rules.exists({ table: 'clients', column: 'id'}), rules.unique({ table: 'owners', column: 'client_id', where: {client_id: this.ctx.request.input('client_id')} }), rules.unique({ table: 'deceaseds', column: 'client_id', where: {client_id: this.ctx.request.input('client_id')} })])
  })


  public messages: CustomMessages = {}
}

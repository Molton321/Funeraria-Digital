import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BeneficiaryValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id : schema.number.optional([rules.unique({ table: 'beneficiaries', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    beneficiary_phone : schema.string([rules.minLength(10),rules.maxLength(10)]),
    beneficiary_relationship: schema.string([rules.minLength(4), rules.maxLength(20)]),
    beneficiary_is_active: schema.boolean(),
    titular_id : schema.number([rules.exists({ table: 'titulars', column: 'id'})]),
    client_id: schema.number([rules.exists({ table: 'clients', column: 'id'})])
  })


  public messages: CustomMessages = {}
}

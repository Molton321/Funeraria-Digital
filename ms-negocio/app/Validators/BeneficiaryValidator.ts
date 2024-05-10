import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BeneficiaryValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id : schema.number([rules.unique({ table: 'beneficiaries', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    beneficiary_phone : schema.string([rules.maxLength(10)]),
    beneficiary_relationship: schema.string([rules.minLength(4), rules.maxLength(20)]),
    beneficiary_is_active: schema.boolean([rules.required()]),
    titular_id : schema.number([rules.unique({ table: 'titulars', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    client_id: schema.number([rules.unique({ table: 'clients', column: 'id' , where:{id: this.ctx.request.input('id')}})])
  })


  public messages: CustomMessages = {}
}

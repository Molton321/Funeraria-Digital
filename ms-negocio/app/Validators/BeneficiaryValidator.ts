import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BeneficiaryValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id : schema.number([rules.unique({ table: 'beneficiaries', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    beneficiary_phone : schema.string([rules.minLength(10),rules.maxLength(10)]),
    beneficiary_relationship: schema.string([rules.minLength(4), rules.maxLength(20)]),
    beneficiary_is_active: schema.boolean(),
    titular_id : schema.number([rules.exists({ table: 'titulars', column: 'id'})]),
    client_id: schema.number([
      rules.exists({ table: 'clients', column: 'id'}),
      rules.unique({ table: 'titulars', column: 'client_id', where:{client_id: this.ctx.request.input('client_id')}}) // verifica que el client_id  sea unico en la tabla titulars diciendo asi que el si es titular no puede ser beneficiario
    ])
  })


  public messages: CustomMessages = {
    'beneficiary_phone.required': 'El campo beneficiary_phone es obligatorio',
    'beneficiary_phone.minLength': 'El campo beneficiary_phone debe tener al menos 10 caracteres',
    'beneficiary_phone.maxLength': 'El campo beneficiary_phone debe tener como máximo 10 caracteres',
    'beneficiary_relationship.required': 'El campo beneficiary_relationship es obligatorio',
    'beneficiary_relationship.minLength': 'El campo beneficiary_relationship debe tener al menos 4 caracteres',
    'beneficiary_relationship.maxLength': 'El campo beneficiary_relationship debe tener como máximo 20 caracteres',
    'beneficiary_is_active.required': 'El campo beneficiary_is_active es obligatorio',
    'titular_id.exists': 'El campo titular_id no existe en la tabla titulars',
    'client_id.exists': 'El campo client_id no existe en la tabla clients',
    'client_id.unique': 'El cliente ya tiene un titular asociado',
  }
}

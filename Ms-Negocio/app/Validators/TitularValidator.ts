import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TitularValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number([rules.unique({ table: 'titulars', column: 'id', where: { id: this.ctx.request.input('id') } })]),
    titular_is_active: schema.boolean(),
    client_id: schema.number([
      rules.exists({ table: 'clients', column: 'id' }),
      rules.unique({ table: 'beneficiaries', column: 'client_id', where: { client_id: this.ctx.request.input('client_id') } }
      )
    ]),
  })

  public messages: CustomMessages = {
    'titular_is_active.required': 'El campo titular_is_active es obligatorio',
    'client_id.exists': 'El campo client_id no existe en la tabla clients',
    'client_id.unique': 'El cliente ya tiene un beneficiario asociado',
  }
}

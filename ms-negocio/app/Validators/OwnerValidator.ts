import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OwnerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id : schema.number.optional([rules.unique({ table: 'owners', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
    owner_state: schema.boolean([rules.required()]),
    client_id: schema.number([rules.exists({ table: 'clients', column: 'id',  where:{client_alive:1}}), rules.unique({ table: 'beneficiaries', column: 'client_id', where: {client_id: this.ctx.request.input('client_id')} })])
  })

  public messages: CustomMessages = {}
}

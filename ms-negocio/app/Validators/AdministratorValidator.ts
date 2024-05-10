import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdministratorValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
      id : schema.number([rules.unique({ table: 'administrators', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
      administrator_is_active: schema.boolean(),
      user_id : schema.string() 
  })

  
  public messages: CustomMessages = {}
}

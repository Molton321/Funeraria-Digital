import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MoveValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    id: schema.number.optional([rules.unique({ table: 'moves', column: 'id' , where: {id: this.ctx.request.input('id')}})]),
    move_location : schema.string([rules.minLength(3), rules.maxLength(20 )]),
    move_date: schema.date({format: "yyyy-MM-dd\'T\'HH:mm"},[rules.afterOrEqual('today')]),
    move_type: schema.string([rules.minLength(3)]),
    service_id: schema.number([rules.exists({ table: 'services', column: 'id'})]),
  })

 
  public messages: CustomMessages = {}
}

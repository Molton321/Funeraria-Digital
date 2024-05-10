import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MoveValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    id: schema.number([rules.unique({ table: 'moves', column: 'id' , where: {id: this.ctx.request.input('id')}})]),
    move_location : schema.string([rules.minLength(3), rules.maxLength(20 )]),
    move_date: schema.number([rules.before('today')]),
    move_type: schema.string([rules.minLength(3)]),
    service_id: schema.number([rules.unique({ table: 'services', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
  })

 
  public messages: CustomMessages = {}
}

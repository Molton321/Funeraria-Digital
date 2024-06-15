import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoomValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id : schema.number.optional([rules.unique({table: 'rooms', column: 'id', where: {id: this.ctx.request.input('id')}})]),
    room_name : schema.string([rules.minLength(4)]),
    room_state : schema.boolean([rules.required()]),
    room_capacity : schema.number([rules.range(10,40)]),
    funeral_home_id : schema.number([rules.exists({table: 'funeral_homes', column:'id'})]) 
    })

  public messages: CustomMessages = {}
}

import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FuneralHomeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id : schema.number.optional([rules.unique({table: 'funeral_homes', column: 'id', where: {id: this.ctx.request.input('id')}})]),
    funeral_home_name : schema.string([rules.minLength(4)]),
    funeral_home_state: schema.boolean([rules.required()]),
    city_id : schema.number([rules.exists({table: 'cities', column:'id'})])
  })


  public messages: CustomMessages = {
    
  }
}

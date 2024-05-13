import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CampusValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id : schema.number.optional([rules.unique({table: 'Campuses', column: 'id', where: {id: this.ctx.request.input('id')}})]),
    campus_name : schema.string([rules.minLength(4)]),
    campus_is_active: schema.boolean([rules.required()]),
    city_id : schema.number([rules.exists({table: 'cities', column:'id'})])
  })


  public messages: CustomMessages = {
    
  }
}

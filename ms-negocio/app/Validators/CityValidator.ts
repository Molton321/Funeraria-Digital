import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class CityValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id : schema.number([rules.range(0,100000), rules.unique({table: 'cities', column: 'id', where: {id: this.ctx.request.input('id')}})]),  
    city_name : schema.string([rules.minLength(4)]),
    department_id : schema.number([rules.exists({table: 'departments', column: 'id', where: {id: this.ctx.request.input('department_id')}})]),
  })

  public messages: CustomMessages = {}
}

import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class PlanValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number([rules.unique({table: 'plans', column: 'id', where: {id: this.ctx.request.input('id')}}), rules.range(0, 100000)]),
    plan_type: schema.string([rules.minLength(4)]),
    plan_description: schema.string([rules.minLength(15)]),
    plan_price: schema.number([rules.range(0,100000000)]),
    hall_id : schema.number([rules.exists({table: 'halls', column:'id'})])
  })

  public messages: CustomMessages = {
  }
}

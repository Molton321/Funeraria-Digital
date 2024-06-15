import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class PlanValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional([rules.unique({table: 'plans', column: 'id', where: {id: this.ctx.request.input('id')}})]),
    plan_type: schema.string([rules.minLength(4)]),
    plan_description: schema.string([rules.minLength(15)]),
    plan_price: schema.number([rules.range(0,100000000)]),
    plan_beneficiaries_number: schema.number([rules.range(1, 100)]),
    plan_state: schema.boolean([rules.required()])
  })

  public messages: CustomMessages = {
  }
}

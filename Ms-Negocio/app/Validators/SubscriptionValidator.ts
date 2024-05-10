import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SubscriptionValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id: schema.number([rules.unique({table: 'subscriptions', column: 'id', where: {id: this.ctx.request.input('id')}}), rules.range(0, 100000)]),
    subscription_start_date: schema.date({ format: 'yyyy-MM-dd'}, [rules.afterOrEqual("today")]),
    subscription_end_date: schema.date({ format: 'yyyy-MM-dd'}, [rules.afterField('subscription_start_date')]),
    subscription_number_of_beneficiaries: schema.number([rules.range(1, 100)]),
    plan_id: schema.number([rules.exists({ table: 'plans', column: 'id' })]),
    client_id: schema.number([rules.exists({ table: 'clients', column: 'id' })])

  })

  public messages: CustomMessages = {}
}

import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SubscriptionValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    id: schema.number([rules.exists({ table: 'subscriptions', column: 'id' }), rules.range(0, 100000)]),
    subscription_start_date: schema.number([rules.before('today')]),
    subscription_end_date: schema.number([rules.after]),
    plan_id: schema.number([rules.exists({ table: 'plans', column: 'id' }), rules.range(0, 100000)]),

  })

  public messages: CustomMessages = {}
}

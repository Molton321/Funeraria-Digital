import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PaymentValidator {
  constructor(protected ctx: HttpContextContract) {}

 
  public schema = schema.create({
    id: schema.number([rules.exists({ table: 'payments', column: 'id' }), rules.range(0, 100000)]),
    payment_date:  schema.number([rules.before('today')]),
    payment_mount: schema.number([rules.range(0, 10000000)]),
    payment_method: schema.string([rules.minLength(4)]),
    subscription_id : schema.number([rules.exists({table: 'subscriptions', column:'id'})])
  })

 
  public messages: CustomMessages = {}
}

import { expect, describe, test, jest } from '@jest/globals'
import { existsSync } from 'fs'
import Payment from '../src/events/payment.js'
import Marketing from '../src/observers/marketing.js'
import Shipment from '../src/observers/shipment.js'
import PaymentSubject from '../src/subjects/paymentSubject.js'


describe('Test suite for Observer Pattern', () => {
  test('#PaymentSubject notify observers', () => {
    const sut = new PaymentSubject()

    // like marketing or shipment
    const observer = {
      update: jest.fn()
    }
    const data = { id: 'someId', userName: 'jedi' }
    const expected = data
    sut.subscribe(observer)
    sut.notify(data)
    expect(observer.update).toBeCalledWith(expected)
  })
  test('#PaymentSubject should not notify unsubscribed observers', () => {
    const sut = new PaymentSubject()

    // like marketing or shipment
    const observer = {
      update: jest.fn()
    }
    const data = { id: 'someId', userName: 'jedi' }
    sut.subscribe(observer)
    sut.unsubscribe(observer)
    sut.notify(data)

    expect(observer.update).not.toHaveBeenCalled()
  })
  test('#Payment should notify subject after a credit card transaction', () => {
    const paymentSubjectStub =  {
      notify: jest.fn()
    }
    const sut = new Payment(paymentSubjectStub)
    const data = { id: 'someId', userName: 'jedi' }
    sut.creditCard(data)
    expect(paymentSubjectStub.notify).toHaveBeenCalledWith(data)
  })
  test.todo('#All should notify after a credit card payment')



})
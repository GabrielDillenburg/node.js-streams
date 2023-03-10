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
    const paymentSubject = new PaymentSubject()
    const sut = new Payment(paymentSubject)
    const paymentSubjectNotifierSpy = jest.spyOn(paymentSubject, 'notify')

    const data = { id: 'someId', userName: 'jedi' }
    sut.creditCard(data)
    expect(paymentSubjectNotifierSpy).toHaveBeenCalledWith(data)
  })

  test('#All should notify subscribers after a credit card payment', () => {
    // subjects
    const subject = new PaymentSubject()

    const marketing = new Marketing()
    const shipment = new Shipment()

    const marketingUpdateFnSpy = jest.spyOn(marketing, marketing.update.name)
    const mshipmentUpdateFnSpy = jest.spyOn(shipment, shipment.update.name)

    subject.subscribe(marketing)
    subject.subscribe(shipment)

    const payment = new Payment(subject)
    const data = { id: 1, userName: 'dillenburg'}
    payment.creditCard(data)

    expect(marketingUpdateFnSpy).toHaveBeenCalledWith(data)
    expect(mshipmentUpdateFnSpy).toHaveBeenCalledWith(data)
    
  })
})
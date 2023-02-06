export default class Payment {
  constructor (paymentSubject) {
    this.paymentSubject = paymentSubject
  }

  creditCard({ id, userName}) {
    console.log(
      `\na payment ocurred from ${userName}`
    )
    this.paymentSubject.notify({ id, userName })
  }
}
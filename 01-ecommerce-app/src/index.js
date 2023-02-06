import Payment from "./events/payment.js";
import Marketing from "./observers/marketing.js";
import Shipment from "./observers/shipment.js";
import PaymentSubject from "./subjects/paymentSubject.js";

// subjects
const subject = new PaymentSubject()

// observers
const marketing = new Marketing()
subject.subscribe(marketing)
const shipment = new Shipment()
subject.subscribe(shipment)

// events handler
const payment = new Payment(subject)
payment.creditCard({ id: 1, userName: 'dillenburg', age: 31})

subject.unsubscribe(marketing)

payment.creditCard({ id: 1, userName: 'dillenburg', age: 31})

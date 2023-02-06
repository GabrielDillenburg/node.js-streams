export default class Marketing {

  /*
   function [update] is responsible of handling his erros/exception;

   our subject won't have any await there (or something that might block any exception)
   subject is the engine to send data to all observers
  */
  update({ id, userName }) {
    console.log(`[${id}]: [marketing] will send an welcome email to [${userName}]`)
  }
}
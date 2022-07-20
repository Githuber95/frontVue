export default function (context) {
    // If the user is not have codeSell
    if (!context.store.state.payment.numeroPolizaUpdate) {
      return context.redirect('/actualizarTarjeta/datos')
    }
  }
  
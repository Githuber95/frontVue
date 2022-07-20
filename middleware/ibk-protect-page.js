export default function (context) {
  // If the user is not have codeSell
  if (!context.store.state.common.dniCliente || !context.store.state.common.cotizacion) {
    return context.redirect('/interbank')
  }
}

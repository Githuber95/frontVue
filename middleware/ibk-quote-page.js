export default function (context) {
    // If the user is not have codeSell
    if (!context.store.state.common.dniCliente) {
      return context.redirect('/interbank')
    }
  }
  
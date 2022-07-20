export default function (context) {
  // If the user is not have codeSell
  if (!context.store.state.common.email) {
    return context.redirect('/')
  }
}

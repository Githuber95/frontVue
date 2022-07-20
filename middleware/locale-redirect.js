// var Tquery = ''
// export default function (context) {
//   Tquery = context.route.query.canal === 'interbank'
//   if (context.env.environment === 'test') {
//     if (Tquery) {
//       delete context.route.query['canal']
//       return context.redirect(302, '/interbank/', context.route.query)
//     }
//   } else {
//     if (Tquery) {
//       delete context.route.query['canal']
//       return context.redirect(301, '/interbank/', context.route.query)
//     } else {
//       return context.redirect(302, '/', context.route.query)
//     }
//   }
// }

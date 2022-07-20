import Vue from "vue"
import * as Sentry from "@sentry/vue"
import { Integrations } from "@sentry/tracing"
const env = (window.location.host == 'localhost:3000') ? 'LOCAL' : (window.location.host == 'www.interseguro.pe') ? 'PROD' : 'TEST'
Sentry.init({
  Vue,
  dsn: "https://6f06d1a8505a4de99fcebf7ed22d6f4a@o462227.ingest.sentry.io/5633926",
  integrations: [new Integrations.BrowserTracing()],
  environment: env,
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
})
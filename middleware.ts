export { default } from "next-auth/middleware";
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
 
let headers = { 'accept-language': 'en,en;q=0.5' }
let languages = new Negotiator({ headers }).languages()
let locales = ['en', 'fr', 'nl']
let defaultLocale = 'nl'
 
match(languages, locales, defaultLocale) // -> 'en-US'

export const config = {
  matcher: ["/", "/users/:id*"],
};

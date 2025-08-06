import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import company from './company'
import contact from './contact'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, company, contact],
}

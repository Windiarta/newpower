export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name (ID)', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'nameEn', title: 'Name (EN)', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'description', title: 'Description (ID)', type: 'text' },
    { name: 'descriptionEn', title: 'Description (EN)', type: 'text' },
    { name: 'category', title: 'Category (ID)', type: 'string' },
    { name: 'categoryEn', title: 'Category (EN)', type: 'string' },
    { name: 'price', title: 'Price', type: 'number' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'features', title: 'Features (ID)', type: 'array', of: [{ type: 'string' }] },
    { name: 'featuresEn', title: 'Features (EN)', type: 'array', of: [{ type: 'string' }] },
  ]
}
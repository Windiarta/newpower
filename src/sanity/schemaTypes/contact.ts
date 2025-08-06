export default {
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name (ID)', type: 'string' },
    { name: 'nameEn', title: 'Name (EN)', type: 'string' },
    { name: 'position', title: 'Position (ID)', type: 'string' },
    { name: 'positionEn', title: 'Position (EN)', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'whatsapp', title: 'WhatsApp', type: 'string' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
  ],
}
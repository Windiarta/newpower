import { defineField, defineType } from 'sanity'

const company = defineType({
  name: 'company',
  title: 'Company',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name (ID)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameEn',
      title: 'Name (EN)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (ID)',
      type: 'text',
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (EN)',
      type: 'text',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'about',
      title: 'About (ID)',
      type: 'text',
    }),
    defineField({
      name: 'aboutEn',
      title: 'About (EN)',
      type: 'text',
    }),
    defineField({
      name: 'vision',
      title: 'Vision (ID)',
      type: 'text',
    }),
    defineField({
      name: 'visionEn',
      title: 'Vision (EN)',
      type: 'text',
    }),
    defineField({
      name: 'mission',
      title: 'Mission (ID)',
      type: 'text',
    }),
    defineField({
      name: 'missionEn',
      title: 'Mission (EN)',
      type: 'text',
    }),
    defineField({
      name: 'address',
      title: 'Address (ID)',
      type: 'text',
    }),
    defineField({
      name: 'addressEn',
      title: 'Address (EN)',
      type: 'text',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'twitter', title: 'Twitter', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
})

export default company
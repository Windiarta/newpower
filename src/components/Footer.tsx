import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import { Contact } from '@/types'

interface FooterProps {
  company: Record<string, any> | null
  contacts: Contact[]
  t: Record<string, any>
}

export default function Footer({ company, contacts, t }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Company Catalog</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              {company?.description || 'Your trusted partner for quality products and services.'}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              {company?.address && (
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{company.address}</span>
                </div>
              )}
              {company?.phone && (
                <div className="flex items-center text-gray-300">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{company.phone}</span>
                </div>
              )}
              {company?.email && (
                <div className="flex items-center text-gray-300">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{company.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Contact Persons */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.contact.contactPerson}</h4>
            <div className="space-y-4">
              {contacts?.map((contact) => (
                <div key={contact._id} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    {contact.image && (
                      <img
                        src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${contact.image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`}
                        alt={contact.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                    )}
                    <div>
                      <h5 className="font-medium">{contact.name}</h5>
                      <p className="text-sm text-gray-400">{contact.position}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center text-gray-300">
                      <Phone className="h-3 w-3 mr-2" />
                      <span>{contact.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Mail className="h-3 w-3 mr-2" />
                      <span>{contact.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.company.socialMedia}</h4>
            <div className="flex space-x-4">
              {company?.socialMedia?.facebook && (
                <a
                  href={company.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              )}
              {company?.socialMedia?.instagram && (
                <a
                  href={company.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              )}
              {company?.socialMedia?.twitter && (
                <a
                  href={company.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                </a>
              )}
              {company?.socialMedia?.linkedin && (
                <a
                  href={company.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{t.footer.copyright}</p>
          <p className="text-sm mt-2">{t.footer.poweredBy}</p>
        </div>
      </div>
    </footer>
  )
} 
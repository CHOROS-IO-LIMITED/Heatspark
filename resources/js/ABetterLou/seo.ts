// schema.org structured data so Google understands who Heat Spark is, what they do and how to verify them.
import { ACCREDITATIONS, ADDRESS, EMAIL, FACEBOOK_URL, PHONE } from '@/ABetterLou/business';
import { FAQ_GROUPS } from '@/ABetterLou/FaqSection';

const SITE = 'https://heatsparkenergy.co.uk';

const SERVICES = [
    { name: 'Commercial gas servicing and breakdowns (boilers & plant)', serviceType: 'Commercial gas engineering' },
    { name: 'LPG servicing for caravans and boats',    serviceType: 'LPG gas engineering' },
    { name: 'Domestic gas and boiler services',        serviceType: 'Gas engineering' },
    { name: 'Plumbing services',                       serviceType: 'Plumbing' },
    { name: 'Electrical services',                     serviceType: 'Electrical installation' },
];

export function buildBusinessSchema() {
    return {
        '@context': 'https://schema.org',
        // More specific LocalBusiness subtypes help Google match trade searches.
        '@type': ['Plumber', 'HVACBusiness', 'Electrician'],
        '@id': `${SITE}/#business`,
        name: 'Heat Spark Energy Services Ltd',
        description: 'Swansea-based Gas Safe registered engineers covering South & Mid Wales and the Bristol Channel: commercial gas servicing and breakdowns, LPG for caravans and boats, domestic gas, plumbing and electrical work.',
        url: SITE,
        logo: `${SITE}/images/Untitled-1.webp`,
        image: `${SITE}/images/Untitled-1.webp`,
        telephone: `+44${PHONE.slice(1)}`,
        email: EMAIL,
        founder: { '@type': 'Person', name: 'Owen Davies' },
        sameAs: [FACEBOOK_URL],
        address: {
            '@type': 'PostalAddress',
            streetAddress: ADDRESS.street,
            addressLocality: ADDRESS.town,
            addressRegion: 'Wales',
            postalCode: ADDRESS.postcode,
            addressCountry: 'GB',
        },
        // Client covers South & Mid Wales and the Bristol Channel (Oct 2026).
        areaServed: [
            { '@type': 'City', name: 'Swansea' },
            { '@type': 'AdministrativeArea', name: 'South Wales' },
            { '@type': 'AdministrativeArea', name: 'Mid Wales' },
            { '@type': 'Place', name: 'Bristol Channel' },
        ],
        openingHoursSpecification: [
            { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '07:00', closes: '19:00' },
        ],
        hasCredential: ACCREDITATIONS.filter(a => a.number || a.verifyUrl).map(a => ({
            '@type': 'EducationalOccupationalCredential',
            name: a.number ? `${a.name} (No. ${a.number})` : a.name,
            ...(a.verifyUrl ? { url: a.verifyUrl } : {}),
        })),
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Services',
            itemListElement: SERVICES.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', ...s } })),
        },
    };
}

export function buildFaqSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_GROUPS.flatMap(g => g.items).map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
    };
}

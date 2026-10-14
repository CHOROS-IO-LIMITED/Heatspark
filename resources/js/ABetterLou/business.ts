// Single source of truth for Heat Spark's contact details and accreditations.
// Accreditation details supplied by the client (Dan, Oct 2026).

export const PHONE = '07865435946';
export const PHONE_DISPLAY = '07865 435 946';
export const EMAIL = 'admin@heatsparkenergy.co.uk';
export const FACEBOOK_URL = 'https://www.facebook.com/HeatsparkenergY';

const WHATSAPP_NUMBER = '447865435946';
const WHATSAPP_DEFAULT_MESSAGE = "Hi Heat Spark, I'd like a quote please.";

/** wa.me link that opens WhatsApp with a pre-filled message. */
export function whatsappUrl(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type Accreditation = {
    name: string;
    /** What the accreditation covers, shown under the name. */
    desc: string;
    /** Registration / licence number, if the client supplied one. */
    number?: string;
    /** Public register where a customer can verify it. */
    verifyUrl?: string;
};

export const ACCREDITATIONS: Accreditation[] = [
    { name: 'Gas Safe Register', desc: 'Registered gas business',      number: '978573',  verifyUrl: 'https://www.gassaferegister.co.uk/' },
    { name: 'OFTEC',             desc: 'Oil heating',                    number: 'C504180', verifyUrl: 'https://www.oftec.org/consumers/find-an-oftec-registered-technician' },
    { name: 'NAPIT',             desc: 'Electrical installations',                          verifyUrl: 'https://search.napit.org.uk/' },
    { name: 'City & Guilds',     desc: 'Qualified engineers' },
    // Shown without ® until the client confirms the mark is registered (not just applied for).
    { name: 'Trade mark',        desc: 'Heat Spark brand',               number: '4271344' },
];

export const GAS_SAFE_NUMBER = '978573';

/** Options for the "Service required" dropdown on the contact form and quote modal. */
export const QUOTE_SERVICES = [
    'Commercial Gas — Servicing',
    'Commercial Gas — Breakdown',
    'LPG — Caravan',
    'LPG — Boat',
    'Gas — Boiler Installation',
    'Gas — Boiler Service / Repair',
    'Gas — Landlord Safety Certificate (CP12)',
    'Plumbing — General',
    'Plumbing — Emergency',
    'Electrical — Rewire',
    'Electrical — Consumer Unit Upgrade',
    'Electrical — EICR',
    'Electrical — General',
    'Other',
];

import { ACCREDITATIONS, GAS_SAFE_NUMBER, whatsappUrl } from '@/ABetterLou/business';

const NAV_COLS = [
    {
        label: 'Services',
        links: [
            { label: 'Commercial Gas', href: '/services#commercial-gas' },
            { label: 'LPG — Caravans & Boats', href: '/services#lpg' },
            { label: 'Domestic Gas', href: '/services#gas' },
            { label: 'Plumbing', href: '/services#plumbing' },
            { label: 'Electrical', href: '/services#electrical' },
            { label: 'Portfolio', href: '/portfolio' },
        ],
    },
    {
        label: 'Company',
        links: [
            { label: 'About Us', href: '/about' },
            { label: 'Contact', href: '/contact' },
            { label: 'Facebook', href: 'https://www.facebook.com/HeatsparkenergY' },
        ],
    },
    {
        label: 'Accreditations',
        links: [
            // TODO: add 'Privacy Policy' back once a /privacy page exists.
            ...ACCREDITATIONS.map(a => {
                const label = a.number ? `${a.name} · ${a.number}` : a.name;
                return a.verifyUrl ? { label, href: a.verifyUrl } : { label };
            }),
        ],
    },
    {
        label: 'Contact',
        links: [
            { label: '07865 435 946', href: 'tel:07865435946' },
            { label: 'admin@heatsparkenergy.co.uk', href: 'mailto:admin@heatsparkenergy.co.uk' },
            { label: 'heatsparkenergy.co.uk', href: 'https://heatsparkenergy.co.uk' },
        ],
    },
];

export default function SiteFooter() {
    return (
        <footer className="site_footer">
            <div className="wrapper_general">
                <div className="wrapper_footer">
                    <div className="flex_footer">
                        {/* Brand column */}
                        <div className="footer_brand">
                            <img src="/images/Untitled-1.webp" alt="Heat Spark Energy Services" style={{ height: '72px', width: 'auto', display: 'block', alignSelf: 'flex-start', marginBottom: '0.75rem' }} />
                            <div className="footer_tagline base_p">
                                Commercial gas, LPG, plumbing and electrical engineers for homes and businesses.
                            </div>
                            <div className="subscription_form">
                                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                                    <a
                                        href="https://www.facebook.com/HeatsparkenergY"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="footer_link base_p"
                                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                                    >
                                        Facebook
                                    </a>
                                    <a
                                        href={whatsappUrl()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="footer_link base_p"
                                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                                    >
                                        WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Nav columns */}
                        <div className="grid_links">
                            {NAV_COLS.map(col => (
                                <div key={col.label} className="footer_col">
                                    <div className="footer_col_label">{col.label}</div>
                                    {col.links.map(link => ('href' in link ? (
                                        <a key={link.label} href={link.href} className="footer_link base_p" {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                                            {link.label}
                                        </a>
                                    ) : (
                                        <span key={link.label} className="footer_link base_p" style={{ cursor: 'default' }}>
                                            {link.label}
                                        </span>
                                    )))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="bottom_footer">
                        <div className="footer_copy base_p">
                            © {new Date().getFullYear()} Heat Spark Energy Services Ltd. All rights reserved.
                        </div>
                        <div className="footer_legal base_p">
                            {`Gas Safe Register no. ${GAS_SAFE_NUMBER}. OFTEC no. C504180. NAPIT registered. City & Guilds qualified engineers. Trade mark no. 4271344.`} Heat Spark Energy Services Ltd is registered in England and Wales.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

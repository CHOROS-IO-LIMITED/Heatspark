import { useEffect, useState } from 'react';
import PageShell from '@/ABetterLou/PageShell';
import PlaceholderGraphic, { type GraphicType } from '@/ABetterLou/PlaceholderGraphic';
import { CallButton, CtaBand, PageHero, QuoteButton, SectionHead, Testimonials, type Testimonial } from '@/ABetterLou/PageBlocks';
import { CheckIcon } from '@/ABetterLou/icons';
import { type Photo, PHOTOS } from '@/ABetterLou/photos';
import { GAS_SAFE_NUMBER } from '@/ABetterLou/business';
import { AccreditationStrip, COMMERCIAL_SERVICES, LPG_SERVICES } from '@/ABetterLou/SpecialistSections';
import { WhatsAppButton } from '@/ABetterLou/WhatsAppFloat';

type Service = {
    id: string; num: string; tab: string; title: string; graphic: GraphicType; photo: Photo;
    desc: string; items: string[]; whatsapp: string;
};

// Commercial gas leads the page — the client wants it pushed hardest.
const SERVICES: Service[] = [
    {
        id: 'commercial-gas', num: '01', tab: 'Commercial Gas', title: 'Commercial Gas Servicing & Breakdowns', graphic: 'gas', photo: PHOTOS.cateringKitchen,
        desc: `Gas Safe registered (no. ${GAS_SAFE_NUMBER}) engineers keeping restaurants, pubs, schools, offices and landlords' properties running — planned servicing to prevent breakdowns, and fast repairs when they happen.`,
        items: [...COMMERCIAL_SERVICES, 'Gas interlock & ventilation checks', 'Maintenance contracts for multiple sites', 'Emergency breakdown call-out'],
        whatsapp: "Hi Heat Spark, I'd like to ask about commercial gas servicing / a breakdown.",
    },
    {
        id: 'gas', num: '02', tab: 'Domestic Gas', title: 'Domestic Gas & Boilers', graphic: 'gas', photo: PHOTOS.boilerInstall,
        desc: 'Gas Safe registered engineers providing boiler installations, servicing, safety certificates, and emergency gas work.',
        items: ['New boiler installation and replacement', 'Annual boiler servicing', 'Boiler repairs and fault finding', 'Landlord gas safety certificates (CP12)', 'Gas appliance installation and commissioning', 'Gas leak detection and repair', 'Gas meter relocation', 'Flue and ventilation checks', 'Power flushing'],
        whatsapp: "Hi Heat Spark, I'd like a quote for boiler / gas work.",
    },
    {
        id: 'lpg', num: '03', tab: 'LPG', title: 'LPG — Caravans & Boats', graphic: 'gas', photo: PHOTOS.staticCaravans,
        desc: 'Fully LPG qualified. We service, test and repair LPG systems and appliances in static and touring caravans, narrowboats and other boats — for private owners and holiday parks.',
        items: [...LPG_SERVICES, 'Static & touring caravans', 'Narrowboats & cruisers', 'Holiday park maintenance'],
        whatsapp: "Hi Heat Spark, I'd like to book an LPG service for my caravan / boat.",
    },
    {
        id: 'plumbing', num: '04', tab: 'Plumbing', title: 'Plumbing Services', graphic: 'plumbing', photo: PHOTOS.plumbingPipes,
        desc: 'Complete domestic and commercial plumbing — from emergency repairs to full bathroom and kitchen installations.',
        items: ['Emergency plumbing repairs', 'Leak detection and repair', 'Bathroom and en-suite installation', 'Kitchen plumbing and re-plumbing', 'Central heating and radiator work', 'Pipe repair and replacement', 'Drainage and unblocking', 'Water pressure problems', 'Outdoor tap installation'],
        whatsapp: "Hi Heat Spark, I'd like a quote for some plumbing work.",
    },
    {
        id: 'electrical', num: '05', tab: 'Electrical', title: 'Electrical Services', whatsapp: "Hi Heat Spark, I'd like a quote for some electrical work.", graphic: 'electrical', photo: PHOTOS.panelTesting,
        desc: 'NAPIT registered electricians delivering safe, compliant electrical work for residential and commercial properties.',
        items: ['Full and partial electrical rewires', 'Consumer unit (fuse board) upgrades', 'Electrical Installation Condition Reports (EICR)', 'Socket, switch and light fitting installation', 'Fault finding and rectification', 'EV charger installation', 'Security and external lighting', 'Smoke and CO alarm installation', 'Emergency electrical call-out'],
    },
];

const TESTIMONIALS: Testimonial[] = [
    { text: 'Heat Spark replaced our boiler quickly and at a great price. Professional, tidy, and explained everything clearly. Couldn\'t recommend them more.', name: 'Sarah M.', role: 'Homeowner' },
    { text: 'Used Heat Spark for all our commercial electrical work. Reliable, properly certified, and always on time. Five stars without hesitation.', name: 'James T.', role: 'Property Manager' },
    { text: 'Called for an emergency gas issue late at night. Arrived quickly, sorted the problem professionally, gave us a full safety report. Brilliant.', name: 'David H.', role: 'Homeowner' },
];

/** Highlights the jump tab for whichever service block is in view. */
function useActiveSection(ids: string[]) {
    const [active, setActive] = useState(ids[0]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
            { rootMargin: '-40% 0px -55% 0px' },
        );
        ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
        return () => observer.disconnect();
    }, [ids]);
    return active;
}

const SERVICE_IDS = SERVICES.map(s => s.id);

export default function Services() {
    const active = useActiveSection(SERVICE_IDS);

    return (
        <PageShell>
            {openQuote => (
                <>
                    <PageHero
                        crumb="Services"
                        tag="What We Offer"
                        title={<>Our <span className="highlight">Services</span></>}
                        subtitle="Commercial gas, LPG, domestic gas, plumbing and electrical — delivered by fully qualified, registered engineers."
                        photo={PHOTOS.heatingPump}
                        actions={<><QuoteButton onClick={openQuote} /><CallButton light /></>}
                    />

                    <nav className="jump_tabs" aria-label="Jump to service">
                        <div className="wrapper_general jump_tabs_inner">
                            {SERVICES.map(s => (
                                <a key={s.id} href={`#${s.id}`} className={`jump_tab${active === s.id ? ' is-active' : ''}`}>
                                    {s.tab}
                                </a>
                            ))}
                        </div>
                    </nav>

                    {SERVICES.map((s, i) => (
                        <section key={s.id} id={s.id} className={`page_section service_block${i % 2 === 1 ? ' section_alt' : ''}`}>
                            <div className={`wrapper_general page_split is-top${i % 2 === 1 ? ' is-reversed' : ''}`}>
                                <PlaceholderGraphic type={s.graphic} className="media_card" photo={s.photo} />
                                <div>
                                    <div className="service_num">{s.num}</div>
                                    <h2 className="h2 biege" style={{ margin: '0.5rem 0 1rem' }}>{s.title}</h2>
                                    <p className="base_p" style={{ marginBottom: '1.75rem' }}>{s.desc}</p>
                                    <ul className="check_list is-two" style={{ marginBottom: '2rem' }}>
                                        {s.items.map(item => (
                                            <li key={item}><span className="why_check"><CheckIcon /></span>{item}</li>
                                        ))}
                                    </ul>
                                    <div className="abl-btn-row">
                                        <QuoteButton onClick={openQuote} label={`Quote for ${s.tab}`} />
                                        <WhatsAppButton message={s.whatsapp} />
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}

                    <section className="page_section">
                        <div className="wrapper_general">
                            <SectionHead tag="Accreditations" title={<>Registered &amp; <span className="highlight">verifiable</span></>} desc="Check any of our registration numbers on the official register." />
                            <AccreditationStrip />
                        </div>
                    </section>

                    <Testimonials items={TESTIMONIALS} title={<>What Our <span className="highlight">Customers Say</span></>} />

                    <CtaBand
                        title={<>Need a <span className="highlight">quote?</span></>}
                        desc="Contact us today — we'll get back to you quickly with a fair, fixed price."
                        onQuote={openQuote}
                    />
                </>
            )}
        </PageShell>
    );
}

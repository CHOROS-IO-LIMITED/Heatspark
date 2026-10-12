import { useEffect, useState } from 'react';
import PageShell from '@/ABetterLou/PageShell';
import PlaceholderGraphic, { type GraphicType } from '@/ABetterLou/PlaceholderGraphic';
import { CallButton, CtaBand, PageHero, QuoteButton, Testimonials, type Testimonial } from '@/ABetterLou/PageBlocks';
import { CheckIcon } from '@/ABetterLou/icons';
import { type Photo, PHOTOS } from '@/ABetterLou/photos';

type Service = { id: string; num: string; title: string; graphic: GraphicType; photo: Photo; desc: string; items: string[] };

const SERVICES: Service[] = [
    {
        id: 'plumbing', num: '01', title: 'Plumbing Services', graphic: 'plumbing', photo: PHOTOS.plumbingPipes,
        desc: 'Complete domestic and commercial plumbing — from emergency repairs to full bathroom and kitchen installations.',
        items: ['Emergency plumbing repairs', 'Leak detection and repair', 'Bathroom and en-suite installation', 'Kitchen plumbing and re-plumbing', 'Central heating and radiator work', 'Pipe repair and replacement', 'Drainage and unblocking', 'Water pressure problems', 'Outdoor tap installation'],
    },
    {
        id: 'gas', num: '02', title: 'Gas Services', graphic: 'gas', photo: PHOTOS.boilerInstall,
        desc: 'Gas Safe registered engineers providing boiler installations, servicing, safety certificates, and emergency gas work.',
        items: ['New boiler installation and replacement', 'Annual boiler servicing', 'Boiler repairs and fault finding', 'Landlord gas safety certificates (CP12)', 'Gas appliance installation and commissioning', 'Gas leak detection and repair', 'Gas meter relocation', 'Flue and ventilation checks', 'Power flushing'],
    },
    {
        id: 'electrical', num: '03', title: 'Electrical Services', graphic: 'electrical', photo: PHOTOS.panelTesting,
        desc: 'NICEIC approved electricians delivering safe, compliant electrical work for residential and commercial properties.',
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
        <PageShell
            title="Services — Plumbing, Gas & Electrical | Heat Spark Energy"
            description="Expert plumbing, gas and electrical services for homes and businesses. Gas Safe registered and NICEIC approved. Emergency call-out available."
            path="/services"
        >
            {openQuote => (
                <>
                    <PageHero
                        crumb="Services"
                        tag="What We Offer"
                        title={<>Our <span className="highlight">Services</span></>}
                        subtitle="Domestic and commercial plumbing, gas and electrical services delivered by fully qualified, registered engineers."
                        photo={PHOTOS.heatingPump}
                        actions={<><QuoteButton onClick={openQuote} /><CallButton light /></>}
                    />

                    <nav className="jump_tabs" aria-label="Jump to service">
                        <div className="wrapper_general jump_tabs_inner">
                            {SERVICES.map(s => (
                                <a key={s.id} href={`#${s.id}`} className={`jump_tab${active === s.id ? ' is-active' : ''}`}>
                                    {s.title.replace(' Services', '')}
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
                                        <QuoteButton onClick={openQuote} label={`Quote for ${s.title.replace(' Services', '').toLowerCase()}`} />
                                        <CallButton light />
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}

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

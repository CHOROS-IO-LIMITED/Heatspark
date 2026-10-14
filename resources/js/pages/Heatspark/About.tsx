import type { ReactNode } from 'react';
import PageShell from '@/ABetterLou/PageShell';
import PlaceholderGraphic from '@/ABetterLou/PlaceholderGraphic';
import { CallButton, CtaBand, PageHero, QuoteButton, SectionHead } from '@/ABetterLou/PageBlocks';
import { CheckIcon, ClockIcon, ShieldIcon, TagIcon, WrenchIcon } from '@/ABetterLou/icons';
import { PHOTOS } from '@/ABetterLou/photos';
import { AccreditationStrip } from '@/ABetterLou/SpecialistSections';

const VALUES: { icon: ReactNode; title: string; desc: string }[] = [
    { icon: <ShieldIcon />, title: 'Safety First',         desc: 'Every job completed to the highest safety standards. Gas Safe and NAPIT registered — your safety is non-negotiable.' },
    { icon: <ClockIcon />,  title: 'Reliable & On Time',   desc: 'We respect your time. Engineers arrive when we say, and complete work within the agreed timeframe.' },
    { icon: <TagIcon />,    title: 'Transparent Pricing',  desc: 'No hidden fees, no surprises. Clear quotes before work begins — and we stick to them.' },
    { icon: <WrenchIcon />, title: 'Quality Workmanship',  desc: 'From the smallest repair to a full installation, every job is done right. We take pride in our work.' },
];

const CHECKLIST = [
    'Boiler servicing & landlord gas safety certs',
    'Full kitchen & bathroom re-plumbs',
    'Commercial electrical fit-outs',
    'EICR certificates for landlords & businesses',
    'Emergency call-out 24/7',
];


export default function About() {
    return (
        <PageShell>
            {openQuote => (
                <>
                    <PageHero
                        crumb="About"
                        tag="Our Story"
                        title={<>About <span className="highlight">Heat Spark</span></>}
                        subtitle="Honest, reliable tradespeople committed to delivering quality plumbing, gas and electrical work for homes and businesses."
                        photo={PHOTOS.radiatorPipe}
                        actions={<><QuoteButton onClick={openQuote} /><CallButton light /></>}
                    />

                    {/* Story */}
                    <section className="page_section">
                        <div className="wrapper_general page_split">
                            <div>
                                <SectionHead tight tag="Who We Are" title={<>Built on Trust, <span className="highlight">Driven by Quality</span></>} />
                                <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                                    <p className="base_p">Heat Spark Energy Services Ltd was founded by Owen Davies with one goal: genuinely excellent trade services at fair prices.</p>
                                    <p className="base_p">We work with homeowners, landlords, and businesses to solve plumbing, gas and electrical problems — big and small. Our engineers bring years of hands-on experience and an unwavering commitment to doing the job properly.</p>
                                    <p className="base_p">Whether you need a leaking pipe fixed, a new boiler installed, or a full electrical rewire, we treat every property as if it were our own.</p>
                                </div>
                                <div className="abl-btn-row">
                                    <QuoteButton onClick={openQuote} />
                                    <a href="/services" className="button general plan_btn_light"><div className="buble_button">Our Services</div></a>
                                </div>
                            </div>
                            <PlaceholderGraphic type="team" className="media_card" photo={PHOTOS.team} />
                        </div>
                    </section>

                    {/* Values */}
                    <section className="page_section section_alt">
                        <div className="wrapper_general">
                            <SectionHead tag="Our Principles" title={<>Why Customers <span className="highlight">Choose Us</span></>} center />
                            <div className="feature_grid">
                                {VALUES.map(v => (
                                    <div key={v.title} className="feature_card">
                                        <div className="feature_icon">{v.icon}</div>
                                        <h3 className="feature_title">{v.title}</h3>
                                        <p className="base_p">{v.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Commitment */}
                    <section className="page_section">
                        <div className="wrapper_general page_split">
                            <PlaceholderGraphic type="engineer" className="media_card" photo={PHOTOS.panelWork} />
                            <div>
                                <SectionHead
                                    tight
                                    tag="Our Commitment"
                                    title={<>Domestic &amp; <span className="highlight">Commercial</span> Specialists</>}
                                    desc="From single-property repairs to multi-site commercial contracts. Our engineers are fully qualified, regularly trained, and equipped for any job."
                                />
                                <ul className="check_list" style={{ marginBottom: '2rem' }}>
                                    {CHECKLIST.map(item => (
                                        <li key={item}><span className="why_check"><CheckIcon /></span>{item}</li>
                                    ))}
                                </ul>
                                <a href="/portfolio" className="button general"><div className="buble_button">View Our Work</div></a>
                            </div>
                        </div>
                    </section>

                    {/* Accreditations */}
                    <section className="page_section section_alt">
                        <div className="wrapper_general">
                            <SectionHead tag="Accredited & Certified" title={<>You're in <span className="highlight">Safe Hands</span></>} desc="Fully qualified and registered — every number below can be checked on the official register." />
                            <AccreditationStrip />
                        </div>
                    </section>

                    <CtaBand
                        title={<>Ready to <span className="highlight">work together?</span></>}
                        desc="Get a free, no-obligation quote on any job — big or small."
                        onQuote={openQuote}
                    />
                </>
            )}
        </PageShell>
    );
}

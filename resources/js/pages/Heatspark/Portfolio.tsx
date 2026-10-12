import { useState } from 'react';
import PageShell from '@/ABetterLou/PageShell';
import PlaceholderGraphic, { type GraphicType } from '@/ABetterLou/PlaceholderGraphic';
import { CtaBand, PageHero, QuoteButton, Testimonials, type Testimonial } from '@/ABetterLou/PageBlocks';
import { type Photo, PHOTOS } from '@/ABetterLou/photos';

type Category = 'Gas' | 'Plumbing' | 'Electrical';

const CAT_GRAPHIC: Record<Category, GraphicType> = { Gas: 'gas', Plumbing: 'plumbing', Electrical: 'electrical' };

const PROJECTS: { cat: Category; photo: Photo; title: string; desc: string }[] = [
    { cat: 'Gas',        photo: PHOTOS.boilerInstall, title: 'Worcester Bosch Greenstar Installation', desc: 'Full boiler replacement with a new Worcester Bosch Greenstar combi. Completed same day, no disruption to the household.' },
    { cat: 'Gas',        photo: PHOTOS.boilerService, title: 'Vaillant EcoTec Combi Replacement',      desc: 'New Vaillant EcoTec Plus installed including full system flush and magnetic filter. 10-year warranty registered.' },
    { cat: 'Gas',        photo: PHOTOS.heatingPump,   title: 'Logic System — Commercial Premises',     desc: 'Logic System boiler fitted for a commercial site. Full commissioning, gas safety check, and landlord certification.' },
    { cat: 'Plumbing',   photo: PHOTOS.bathroom,      title: 'Full Bathroom Re-Fit',                   desc: 'Complete bathroom strip-out and re-fit including new suite, tiling, and all associated plumbing for a residential property.' },
    { cat: 'Plumbing',   photo: PHOTOS.radiatorValve, title: 'Central Heating System Upgrade',         desc: 'Full central heating upgrade including new radiators, pipework, and smart thermostat controls throughout a 4-bed house.' },
    { cat: 'Electrical', photo: PHOTOS.consumerUnit,  title: 'Consumer Unit Upgrade',                  desc: 'Full consumer unit replacement with new RCD-protected board, tested and certified to current BS7671 standards.' },
];

const FILTERS: ('All' | Category)[] = ['All', 'Gas', 'Plumbing', 'Electrical'];

const TESTIMONIALS: Testimonial[] = [
    { text: 'Owen and the team sorted our bathroom from scratch — stripped it out and fitted a brand new suite. Immaculate finish. Absolutely delighted.', name: 'Mrs. Williams', role: 'Residential Customer' },
    { text: 'Heat Spark fitted a new boiler and serviced the whole heating system. Everything running perfectly. Professional from start to finish.', name: 'Mr. Thompson', role: 'Landlord' },
    { text: 'Had them rewire our kitchen and upgrade the consumer unit. Clean, tidy, no fuss. Great communication throughout. Would definitely use again.', name: 'Rachel P.', role: 'Homeowner' },
];

export default function Portfolio() {
    const [filter, setFilter] = useState<'All' | Category>('All');
    const visible = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.cat === filter);

    return (
        <PageShell
            title="Portfolio — Our Work | Heat Spark Energy Services"
            description="See examples of our plumbing, gas and electrical work. Boiler installations, bathroom fits, consumer units and more."
            path="/portfolio"
        >
            {openQuote => (
                <>
                    <PageHero
                        crumb="Portfolio"
                        tag="Our Work"
                        title={<>Recent <span className="highlight">Projects</span></>}
                        subtitle="A selection of completed plumbing, gas and electrical installations across residential and commercial properties."
                        photo={PHOTOS.sockets}
                        actions={<QuoteButton onClick={openQuote} />}
                    />

                    <section className="page_section">
                        <div className="wrapper_general">
                            <div className="filter_row" role="group" aria-label="Filter projects">
                                {FILTERS.map(f => (
                                    <button
                                        key={f}
                                        type="button"
                                        className={`filter_chip${filter === f ? ' is-active' : ''}`}
                                        aria-pressed={filter === f}
                                        onClick={() => setFilter(f)}
                                    >
                                        {f}
                                        <span className="filter_count">{f === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.cat === f).length}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="page_cards">
                                {visible.map(p => (
                                    <article key={p.title} className="project_card">
                                        <div className="project_media">
                                            <span className="project_pill">{p.cat}</span>
                                            <PlaceholderGraphic
                                                type={CAT_GRAPHIC[p.cat]}
                                                photo={p.photo}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                        <div className="project_body">
                                            <h3 className="project_title">{p.title}</h3>
                                            <p className="base_p">{p.desc}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    <Testimonials items={TESTIMONIALS} title={<><span className="highlight">Happy</span> Customers</>} />

                    <CtaBand
                        title={<>Want <span className="highlight">results like these?</span></>}
                        desc="Get in touch for a free quote on your next project."
                        onQuote={openQuote}
                    />
                </>
            )}
        </PageShell>
    );
}

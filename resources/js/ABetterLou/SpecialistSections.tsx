import '@/ABetterLou/blocks.css';
import PlaceholderGraphic from '@/ABetterLou/PlaceholderGraphic';
import { QuoteButton } from '@/ABetterLou/PageBlocks';
import { WhatsAppButton } from '@/ABetterLou/WhatsAppFloat';
import { ACCREDITATIONS, PHONE, PHONE_DISPLAY } from '@/ABetterLou/business';
import { CheckIcon, PhoneIcon, ShieldIcon } from '@/ABetterLou/icons';
import { PHOTOS } from '@/ABetterLou/photos';

/* ── Accreditations with registration numbers ───────────── */

export function AccreditationStrip() {
    return (
        <div className="accred_strip">
            {ACCREDITATIONS.map(a => {
                const body = (
                    <>
                        <span className="accred_name"><ShieldIcon />{a.name}</span>
                        {a.number && <span className="accred_num">No. {a.number}</span>}
                        <span className="accred_desc">{a.desc}</span>
                        {a.verifyUrl && <span className="accred_verify">Check the register</span>}
                    </>
                );
                return a.verifyUrl ? (
                    <a key={a.name} href={a.verifyUrl} target="_blank" rel="noopener noreferrer" className="accred_item">{body}</a>
                ) : (
                    <div key={a.name} className="accred_item">{body}</div>
                );
            })}
        </div>
    );
}

export function AccreditationBand() {
    return (
        <section className="accred_band" aria-labelledby="accred-title">
            <div className="wrapper_general">
                <div className="accred_band_head">
                    <div id="accred-title" className="section_tag">Registered &amp; accredited</div>
                    <p className="base_p">Every registration number can be checked on the official register.</p>
                </div>
                <AccreditationStrip />
            </div>
        </section>
    );
}

/* ── Commercial gas ──────────────────────────────────────── */

// No catering/kitchen work: the client isn't qualified for commercial catering yet (Oct 2026).
export const COMMERCIAL_SECTORS = ['Offices & workplaces', 'Schools', 'Pubs & hotels', 'Landlords & letting agents', 'Shops & small businesses'];

export const COMMERCIAL_SERVICES = [
    'Planned commercial gas servicing',
    'Breakdown call-outs & fault finding',
    'Commercial boilers & plant rooms',
    'Commercial heating & hot water',
    'Commercial gas safety certificates',
    'Gas tightness testing & purging',
];

export function CommercialGasSection({ onGetQuote }: { onGetQuote: () => void }) {
    return (
        <section id="commercial-gas" className="specialist section_alt">
            <div className="wrapper_general specialist_grid">
                <div className="specialist_media">
                    <PlaceholderGraphic type="gas" className="media_card" photo={PHOTOS.plantRoom} sizes="(max-width: 900px) 50vw, 25vw" />
                    <PlaceholderGraphic type="gas" className="media_card" photo={PHOTOS.heatingPump} sizes="(max-width: 900px) 50vw, 25vw" />
                    <div className="specialist_badge">
                        <strong>Breakdown?</strong>
                        <span>Fast response to get your business running again.</span>
                    </div>
                </div>

                <div>
                    <div className="section_tag">Commercial Gas</div>
                    <h2 className="h2 biege">
                        Commercial gas <span className="highlight">servicing &amp; breakdowns</span>
                    </h2>
                    <p className="base_p specialist_lead">
                        Keep your heating and hot water running. Our Gas Safe registered engineers service and repair commercial boilers,
                        gas appliances and plant rooms — with planned maintenance to stop breakdowns before they cost you a day's trading.
                    </p>

                    <div className="sector_row">
                        {COMMERCIAL_SECTORS.map(s => <span key={s} className="sector_chip">{s}</span>)}
                    </div>

                    <ul className="check_list is-two" style={{ marginBottom: '2rem' }}>
                        {COMMERCIAL_SERVICES.map(item => (
                            <li key={item}><span className="why_check"><CheckIcon /></span>{item}</li>
                        ))}
                    </ul>

                    <div className="abl-btn-row">
                        <QuoteButton onClick={onGetQuote} label="Book a commercial service" />
                        <WhatsAppButton message="Hi Heat Spark, I'd like to ask about commercial gas servicing / a breakdown." />
                    </div>

                    <div className="emergency_note">
                        <PhoneIcon />
                        <span>Gas appliance broken down? Call us now on <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a></span>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ── LPG: caravans & boats ───────────────────────────────── */

// PlaceholderGraphic sets position:relative inline, so the card background has to be positioned inline too.
const FILL = { position: 'absolute', inset: 0 } as const;

export const LPG_SERVICES = [
    'LPG appliance servicing',
    'Gas safety checks & certificates',
    'Leak detection & tightness testing',
    'Appliance installation & repairs',
];

export function LpgSection({ onGetQuote }: { onGetQuote: () => void }) {
    return (
        <section id="lpg" className="specialist">
            <div className="wrapper_general">
                <div className="section_head">
                    <div className="section_tag">LPG Specialists</div>
                    <h2 className="h2 biege">
                        Fully LPG qualified — <span className="highlight">caravans &amp; boats</span>
                    </h2>
                    <p className="base_p">
                        Bottled or bulk LPG, on land or on the water. We service, test and repair LPG systems and appliances so your holiday home or boat is safe to use.
                    </p>
                </div>

                <div className="lpg_cards">
                    <article className="lpg_card">
                        <PlaceholderGraphic type="gas" photo={PHOTOS.staticCaravans} sizes="(max-width: 900px) 100vw, 50vw" style={FILL} />
                        <div className="lpg_card_body">
                            <h3 className="lpg_card_title">Caravans</h3>
                            <p>Static and touring caravans — LPG servicing, safety checks and appliance repairs for owners and holiday parks.</p>
                        </div>
                    </article>
                    <article className="lpg_card">
                        <PlaceholderGraphic type="gas" photo={PHOTOS.narrowboat} sizes="(max-width: 900px) 100vw, 50vw" style={FILL} />
                        <div className="lpg_card_body">
                            <h3 className="lpg_card_title">Boats</h3>
                            <p>Narrowboats, cruisers and liveaboards — LPG system checks, servicing and repairs to keep you safe on board.</p>
                        </div>
                    </article>
                </div>

                <div className="lpg_foot">
                    <ul className="check_list is-two">
                        {LPG_SERVICES.map(item => (
                            <li key={item}><span className="why_check"><CheckIcon /></span>{item}</li>
                        ))}
                    </ul>
                    <div className="abl-btn-row">
                        <QuoteButton onClick={onGetQuote} label="Book an LPG service" />
                        <WhatsAppButton message="Hi Heat Spark, I'd like to book an LPG service for my caravan / boat." />
                    </div>
                </div>
            </div>
        </section>
    );
}

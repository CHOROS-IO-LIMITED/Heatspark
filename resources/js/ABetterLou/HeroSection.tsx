import { BoltIcon, ClockIcon, ShieldIcon } from '@/ABetterLou/icons';
import { WhatsAppButton } from '@/ABetterLou/WhatsAppFloat';
import { GAS_SAFE_NUMBER } from '@/ABetterLou/business';

const TRUST_ITEMS = [
    { icon: <ShieldIcon />, title: 'Gas Safe Registered', desc: `Registration no. ${GAS_SAFE_NUMBER} — domestic, commercial & LPG.` },
    { icon: <BoltIcon />,   title: 'NAPIT Registered',    desc: 'Qualified electricians on every job.' },
    { icon: <ClockIcon />,  title: '24/7 Emergency',      desc: 'Emergency call-out available around the clock.' },
];

type HeroSectionProps = {
    onGetQuote: () => void;
};

export default function HeroSection({ onGetQuote }: HeroSectionProps) {
    return (
        <main className="hero" data-section="hero">
            <div className="wrapper_hero">
                <div className="heading_hero">
                    <h1 className="h1">
                        Expert <span className="highlight">Plumbing, Gas<br />&amp; Electrical</span> Services
                    </h1>

                    <div className="ch_box_hero">
                        <div className="base_paragraph">
                            Commercial gas servicing and breakdowns, LPG for caravans and boats, plus domestic plumbing, gas and electrical. Gas Safe registered and available 24/7 for emergencies.
                        </div>
                    </div>

                    <div className="abl-btn-row">
                        <button
                            type="button"
                            onClick={onGetQuote}
                            className="button general"
                            style={{ cursor: 'pointer', border: 'none' }}
                        >
                            <div className="buble_button">Get a Free Quote</div>
                        </button>
                        <a href="tel:07865435946" className="button general">
                            <div className="buble_button">Call 07865 435 946</div>
                        </a>
                        <WhatsAppButton />
                    </div>
                </div>

                <div className="heading_bottom">
                    <div className="heading_bottom_txt">Built on trust.&nbsp; Focused on quality.</div>
                </div>

                <div className="bottom_side">
                    {TRUST_ITEMS.map((item, i) => (
                        <div key={item.title} className={`box_side${i === 2 ? ' last' : ''}`}>
                            <div className="circle_icon">
                                {item.icon}
                            </div>
                            <div className="box_hero">
                                <div className="heading_box">{item.title}</div>
                                <div className="paragraph_box">{item.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="background_hero">
                <div className="overlay" />
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                >
                    <source src="https://res.cloudinary.com/dqw9fo2w1/video/upload/v1781260911/14077529_4096_2160_30fps_ipurs6.mp4" type="video/mp4" />
                </video>
            </div>
        </main>
    );
}

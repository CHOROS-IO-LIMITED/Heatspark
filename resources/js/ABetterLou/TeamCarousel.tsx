import { useCallback, useEffect, useRef, useState } from 'react';
import PlaceholderGraphic from '@/ABetterLou/PlaceholderGraphic';
import { PHOTOS } from '@/ABetterLou/photos';

const SERVICES = [
    {
        num: '01',
        name: 'Plumbing',
        photo: PHOTOS.radiatorPipe,
        role: 'Emergency repairs, bathroom & kitchen fits',
        bullets: ['Emergency call-out', 'Leak detection & repair', 'Bathroom installation', 'Central heating'],
    },
    {
        num: '02',
        name: 'Boiler Installation',
        photo: PHOTOS.boilerInstall,
        role: 'Worcester Bosch, Vaillant, and all leading brands',
        bullets: ['New boiler supply & fit', 'Like-for-like replacement', 'Full system flush', '10-year warranty reg.'],
    },
    {
        num: '03',
        name: 'Gas Services',
        photo: PHOTOS.gasFlame,
        role: 'Gas Safe registered — CP12 certs, servicing & repairs',
        bullets: ['Annual boiler service', 'CP12 landlord certs', 'Gas leak detection', 'Fault finding & repair'],
    },
    {
        num: '04',
        name: 'Electrical',
        photo: PHOTOS.sockets,
        role: 'NICEIC approved — rewires, consumer units, EICRs',
        bullets: ['Full & partial rewires', 'Consumer unit upgrades', 'EICR inspections', 'EV charger installation'],
    },
];

const CARD_W = 320;
const GAP    = 24;
const STEP   = CARD_W + GAP;

const SWIPE_MIN = 40; // px of horizontal travel before a drag counts as a swipe

export default function TeamCarousel() {
    const [offset, setOffset]       = useState(0);
    const [maxOffset, setMaxOffset] = useState(0);
    const viewportRef               = useRef<HTMLDivElement>(null);
    const trackRef                  = useRef<HTMLDivElement>(null);
    const swipeStartX               = useRef<number | null>(null);

    // The end of the track is "last card flush with the right edge", which depends on
    // how many cards fit — measure it instead of assuming one card per step.
    useEffect(() => {
        const viewport = viewportRef.current;
        const track    = trackRef.current;
        if (!viewport || !track) return;
        const measure = () => {
            const max = Math.max(0, track.scrollWidth - viewport.clientWidth);
            setMaxOffset(max);
            setOffset(o => Math.min(o, max));
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(viewport);
        return () => ro.disconnect();
    }, []);

    const prev = useCallback(() => setOffset(o => Math.max(0, o - STEP)), []);
    const next = useCallback(() => setOffset(o => Math.min(maxOffset, o + STEP)), [maxOffset]);

    const onPointerDown = (e: React.PointerEvent) => { swipeStartX.current = e.clientX; };
    const onPointerUp   = (e: React.PointerEvent) => {
        if (swipeStartX.current === null) return;
        const dx = e.clientX - swipeStartX.current;
        swipeStartX.current = null;
        if (dx <= -SWIPE_MIN) next();
        else if (dx >= SWIPE_MIN) prev();
    };

    return (
        <section className="carousel_interviews section_alt">
            <div className="heading_arrows">
                <div>
                    <div className="section_tag">Our Services</div>
                    <h2 className="h2">What we <span className="highlight">do</span></h2>
                </div>
                <div className="carousel-controls">
                    <button type="button" className="carousel-btn" onClick={prev} aria-label="Previous" disabled={offset === 0}>←</button>
                    <button type="button" className="carousel-btn" onClick={next} aria-label="Next" disabled={offset >= maxOffset}>→</button>
                </div>
            </div>

            <div className="slider_wrap specific_guided">
                <div
                    ref={viewportRef}
                    className="container guided_by"
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                    onPointerCancel={() => { swipeStartX.current = null; }}
                    onDragStart={e => e.preventDefault()} // native image drag would cancel the swipe
                    style={{ touchAction: 'pan-y', userSelect: 'none' }}
                >
                    <div
                        ref={trackRef}
                        style={{
                            display: 'flex',
                            gap: GAP,
                            transform: `translateX(-${offset}px)`,
                            transition: 'transform 0.55s cubic-bezier(0.42, 0, 0.58, 1)',
                        }}
                    >
                        {SERVICES.map(svc => (
                            <div
                                key={svc.name}
                                style={{
                                    flexShrink: 0,
                                    width: CARD_W,
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: 16,
                                    padding: '2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.25rem',
                                }}
                            >
                                {/* Photo */}
                                <PlaceholderGraphic
                                    type={svc.name === 'Electrical' ? 'electrical' : svc.name === 'Plumbing' ? 'plumbing' : 'gas'}
                                    photo={svc.photo}
                                    sizes={`${CARD_W}px`}
                                    style={{ height: 180, borderRadius: 10 }}
                                />

                                {/* Number + name */}
                                <div>
                                    <div style={{ fontFamily: 'var(--abl-font-heading)', fontSize: '3rem', fontWeight: 700, color: 'rgba(255,106,0,0.18)', lineHeight: 1, marginBottom: '0.5rem' }}>{svc.num}</div>
                                    <div style={{ fontFamily: 'var(--abl-font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--abl-accent)', fontStyle: 'italic' }}>{svc.name}</div>
                                    <div style={{ fontFamily: 'var(--abl-font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.3rem' }}>{svc.role}</div>
                                </div>

                                {/* Divider */}
                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

                                {/* Bullet list */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                    {svc.bullets.map(b => (
                                        <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--abl-accent)', flexShrink: 0 }} />
                                            <span style={{ fontFamily: 'var(--abl-font-body)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{b}</span>
                                        </div>
                                    ))}
                                </div>
            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

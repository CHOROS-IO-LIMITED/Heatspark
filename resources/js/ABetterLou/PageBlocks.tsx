import type { ReactNode } from 'react';
import '@/ABetterLou/blocks.css';
import { type Photo, pexelsSrcSet, pexelsUrl } from '@/ABetterLou/photos';

const ARROW = 'https://cdn.prod.website-files.com/6939a31d6f0751cc94b4a574/6951317f9e7c4fc62f2c0c81_arrow.svg';

/* ── Buttons ─────────────────────────────────────────── */

export function QuoteButton({ onClick, label = 'Get a Free Quote', light = false }: { onClick: () => void; label?: string; light?: boolean }) {
    return (
        <button type="button" onClick={onClick} className={`button general${light ? ' plan_btn_light' : ''}`} style={{ cursor: 'pointer', border: 'none' }}>
            <div className="buble_button">{label}</div>
            <div className={`circle_general${light ? ' circle_light' : ''}`}>
                <div className="arrow_general"><img src={ARROW} loading="lazy" alt="" className="image" /></div>
                <div className="abs_arrow"><img src={ARROW} loading="lazy" alt="" className="image" /></div>
            </div>
        </button>
    );
}

export function CallButton({ light = false }: { light?: boolean }) {
    return (
        <a href="tel:07865435946" className={`button general${light ? ' plan_btn_light' : ''}`}>
            <div className="buble_button">Call 07865 435 946</div>
        </a>
    );
}

/* ── Page hero (photo background + breadcrumb) ───────── */

type PageHeroProps = {
    tag: string;
    title: ReactNode;
    subtitle: string;
    photo: Photo;
    crumb: string;
    actions?: ReactNode;
};

export function PageHero({ tag, title, subtitle, photo, crumb, actions }: PageHeroProps) {
    return (
        <section className="page_hero">
            <img
                src={pexelsUrl(photo.id, 1920)}
                srcSet={pexelsSrcSet(photo.id)}
                sizes="100vw"
                alt=""
                className="page_hero_img"
                fetchPriority="high"
            />
            <div className="page_hero_overlay" />
            <div className="wrapper_general page_hero_inner">
                <nav className="breadcrumb" aria-label="Breadcrumb">
                    <a href="/">Home</a>
                    <span aria-hidden="true">/</span>
                    <span aria-current="page">{crumb}</span>
                </nav>
                <div className="section_tag">{tag}</div>
                <h1 className="h1 page_hero_title">{title}</h1>
                <p className="base_p page_hero_sub">{subtitle}</p>
                {actions && <div className="abl-btn-row">{actions}</div>}
            </div>
        </section>
    );
}

/* ── Section heading ─────────────────────────────────── */

export function SectionHead({ tag, title, desc, center = false, tight = false }: { tag: string; title: ReactNode; desc?: string; center?: boolean; tight?: boolean }) {
    return (
        <div className={`section_head${center ? ' is-center' : ''}${tight ? ' is-tight' : ''}`}>
            <div className="section_tag">{tag}</div>
            <h2 className="h2 biege">{title}</h2>
            {desc && <p className="base_p">{desc}</p>}
        </div>
    );
}

/* ── Testimonials ────────────────────────────────────── */

export type Testimonial = { text: string; name: string; role: string };

export function Testimonials({ items, title }: { items: Testimonial[]; title: ReactNode }) {
    return (
        <section className="page_section section_alt">
            <div className="wrapper_general">
                <SectionHead tag="Reviews" title={title} center />
                <div className="review_grid">
                    {items.map(t => (
                        <figure key={t.name} className="review_card">
                            <div className="review_stars" aria-label="5 out of 5 stars">★★★★★</div>
                            <blockquote className="base_p review_text">“{t.text}”</blockquote>
                            <figcaption className="review_author">
                                <span className="avatar_initials" aria-hidden="true">{t.name.charAt(0)}</span>
                                <span>
                                    <span className="review_name">{t.name}</span>
                                    <span className="review_role">{t.role}</span>
                                </span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── Closing CTA band ────────────────────────────────── */

export function CtaBand({ title, desc, onQuote }: { title: ReactNode; desc: string; onQuote: () => void }) {
    return (
        <section className="page_section">
            <div className="wrapper_general">
                <div className="cta_band">
                    <div>
                        <h2 className="h2 cta_band_title">{title}</h2>
                        <p className="base_p cta_band_desc">{desc}</p>
                    </div>
                    <div className="abl-btn-row">
                        <QuoteButton onClick={onQuote} />
                        <CallButton light />
                    </div>
                </div>
            </div>
        </section>
    );
}

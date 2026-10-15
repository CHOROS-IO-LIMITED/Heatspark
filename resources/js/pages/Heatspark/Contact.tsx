import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import PageShell from '@/ABetterLou/PageShell';
import { PageHero, SectionHead } from '@/ABetterLou/PageBlocks';
import { ChatIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon, ShieldIcon } from '@/ABetterLou/icons';
import { PHOTOS } from '@/ABetterLou/photos';
import { ACCREDITATIONS, ADDRESS_LINE, QUOTE_SERVICES, SERVICE_AREA, whatsappUrl } from '@/ABetterLou/business';

type FormState = { firstName: string; lastName: string; email: string; phone: string; service: string; message: string };
const EMPTY: FormState = { firstName: '', lastName: '', email: '', phone: '', service: '', message: '' };

// Google Maps for the client's base address (Oct 2026). No API key needed for these URL forms.
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_LINE)}&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_LINE)}`;

const CONTACTS: { icon: ReactNode; label: string; value: string; hint: string; href?: string; external?: boolean }[] = [
    { icon: <PhoneIcon />, label: 'Phone',    value: '07865 435 946',               hint: 'Mon–Sat 7am–7pm · Emergencies 24/7', href: 'tel:07865435946' },
    { icon: <ChatIcon />,  label: 'WhatsApp', value: 'Message us',                  hint: 'Send photos of the job for a faster quote', href: whatsappUrl("Hi Heat Spark, I'd like a quote. Here are some photos of the job:"), external: true },
    { icon: <MailIcon />,  label: 'Email',    value: 'admin@heatsparkenergy.co.uk', hint: 'We aim to reply within 2 hours', href: 'mailto:admin@heatsparkenergy.co.uk' },
    { icon: <ClockIcon />, label: 'Hours',    value: 'Mon–Sat, 7am–7pm',            hint: '24/7 for genuine emergencies' },
    { icon: <PinIcon />,   label: 'Based in', value: ADDRESS_LINE,                hint: `Covering ${SERVICE_AREA}`, href: MAP_LINK, external: true },
];

export default function Contact() {
    const [form, setForm]     = useState<FormState>(EMPTY);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const change = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        if (status === 'sending') return;
        setStatus('sending');
        try {
            const res = await fetch('/contact/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '' },
                body: JSON.stringify(form),
            });
            setStatus(res.ok ? 'success' : 'error');
            if (res.ok) setForm(EMPTY);
        } catch { setStatus('error'); }
    };

    return (
        <PageShell>
            {() => (
                <>
                    <PageHero
                        crumb="Contact"
                        tag="Get in Touch"
                        title={<>Contact <span className="highlight">Us</span></>}
                        subtitle="Fill in the form or give us a call — we'll get back to you with a free, no-obligation quote."
                        photo={PHOTOS.house}
                    />

                    <section className="page_section">
                        <div className="wrapper_general page_split is-top is-contact">
                            {/* Info column */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                <div>
                                    <SectionHead tight tag="Contact Details" title={<>Let's <span className="highlight">talk</span></>} />
                                    <div className="contact_cards">
                                        {CONTACTS.map(c => {
                                            const body = (
                                                <>
                                                    <div className="feature_icon">{c.icon}</div>
                                                    <div>
                                                        <div className="contact_label">{c.label}</div>
                                                        <div className="contact_value">{c.value}</div>
                                                        <div className="contact_hint">{c.hint}</div>
                                                    </div>
                                                </>
                                            );
                                            return c.href ? (
                                                <a key={c.label} href={c.href} className="contact_card" {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{body}</a>
                                            ) : (
                                                <div key={c.label} className="contact_card">{body}</div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <div className="contact_label" style={{ marginBottom: '1rem' }}>What happens next</div>
                                    <ol className="next_steps">
                                        <li>We review your enquiry and reply — usually within 2 hours.</li>
                                        <li>We arrange a site visit, or quote straight away for simple jobs.</li>
                                        <li>You get a clear, written, fixed price before any work starts.</li>
                                    </ol>
                                </div>

                                <div className="badge_row">
                                    {ACCREDITATIONS.map(a => (
                                        <span key={a.name} className="badge"><ShieldIcon />{a.number ? `${a.name} · ${a.number}` : a.name}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Form */}
                            <div className="form_card">
                                <h2 className="feature_title" style={{ fontSize: '1.5rem' }}>Request a Free Quote</h2>
                                <p className="base_p" style={{ marginBottom: '1.75rem' }}>Tell us about your project and we'll get back to you fast.</p>

                                {status === 'success' && <div className="alert is-success" role="status">Quote request received! We'll be in touch shortly.</div>}
                                {status === 'error' && <div className="alert is-error" role="alert">Something went wrong. Please call 07865 435 946 instead.</div>}

                                {status !== 'success' && (
                                    <form onSubmit={submit} className="form_stack">
                                        <div className="form_row">
                                            <div><label className="field_label" htmlFor="firstName">First name *</label><input id="firstName" name="firstName" type="text" autoComplete="given-name" required value={form.firstName} onChange={change} className="field_input" /></div>
                                            <div><label className="field_label" htmlFor="lastName">Last name *</label><input id="lastName" name="lastName" type="text" autoComplete="family-name" required value={form.lastName} onChange={change} className="field_input" /></div>
                                        </div>
                                        <div className="form_row">
                                            <div><label className="field_label" htmlFor="email">Email address *</label><input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={change} className="field_input" placeholder="you@example.com" /></div>
                                            <div><label className="field_label" htmlFor="phone">Phone number</label><input id="phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={change} className="field_input" placeholder="07700 900000" /></div>
                                        </div>
                                        <div>
                                            <label className="field_label" htmlFor="service">Service required</label>
                                            <select id="service" name="service" value={form.service} onChange={change} className="field_input" style={{ cursor: 'pointer' }}>
                                                <option value="">Select a service…</option>
                                                {QUOTE_SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="field_label" htmlFor="message">Tell us about your job *</label>
                                            <textarea id="message" name="message" required value={form.message} onChange={change} className="field_input" placeholder="Please describe the work needed — any relevant details help us give an accurate quote." />
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                                            <button type="submit" className="button general" disabled={status === 'sending'} style={{ cursor: status === 'sending' ? 'not-allowed' : 'pointer', border: 'none', opacity: status === 'sending' ? 0.65 : 1 }}>
                                                <div className="buble_button">{status === 'sending' ? 'Sending…' : 'Send Enquiry'}</div>
                                            </button>
                                            <span className="form_note">We never share your details with third parties.</span>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="page_section section_alt">
                        <div className="wrapper_general">
                            <SectionHead tag="Find Us" title={<>Where we <span className="highlight">work</span></>} desc={`Based in Swansea, covering ${SERVICE_AREA}.`} />
                            <div className="map_frame">
                                <iframe
                                    src={MAP_EMBED}
                                    title="Heat Spark Energy Services location"
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </section>
                </>
            )}
        </PageShell>
    );
}

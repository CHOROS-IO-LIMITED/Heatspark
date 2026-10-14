import { useCallback, useEffect, useRef, useState } from 'react';
import { QUOTE_SERVICES } from '@/ABetterLou/business';

// Inline so it inherits the beige text colour (the old CDN icon was dark brown on the dark modal).
function CloseIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="cross_icon">
            <path d="M14.5 4.8 4.8 14.5M4.8 4.8l9.7 9.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

type ReserveModalProps = {
    open: boolean;
    onClose: () => void;
};

export default function ReserveModal({ open, onClose }: ReserveModalProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [service, setService] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [sending, setSending] = useState(false);
    const firstInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            setSubmitted(false);
            setError(false);
            setTimeout(() => firstInputRef.current?.focus(), 80);
        }
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    // Stop the page scrolling behind the modal.
    useEffect(() => {
        if (!open) return;
        const html = document.documentElement;
        const prev = html.style.overflow;
        html.style.overflow = 'hidden';
        return () => { html.style.overflow = prev; };
    }, [open]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (sending) return;
        if (!firstName || !lastName || !email) { setError(true); return; }
        setError(false);
        setSending(true);

        try {
            const res = await fetch('/contact/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '',
                },
                body: JSON.stringify({ firstName, lastName, phone, email, service, message: `Quote request via modal. Service: ${service || 'Not specified'}` }),
            });
            if (res.ok) {
                setSubmitted(true);
            } else {
                setError(true);
            }
        } catch {
            setError(true);
        } finally {
            setSending(false);
        }
    }, [sending, firstName, lastName, phone, email, service]);

    return (
        <div
            className={`modal_form${open ? ' is-open' : ''}`}
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
            aria-modal="true"
            role="dialog"
            aria-label="Get a free quote"
        >
            <div className="modal_window">
                <div className="wrapper_modal">
                    <div className="modal_form_box">
                        {!submitted ? (
                            <form onSubmit={handleSubmit}>
                                <div className="heading_modal">
                                    <div className="modal_heading">Get a Free Quote</div>
                                    <button type="button" className="close_modal" onClick={onClose} aria-label="Close">
                                        <CloseIcon />
                                    </button>
                                </div>

                                <div className="description_modal">
                                    <div className="base_p brown">
                                        Fill in your details and we'll get back to you quickly with a free, no-obligation quote.
                                    </div>
                                </div>

                                <div className="form_grid">
                                    <div className="input_field_modal">
                                        <label htmlFor="hs-first-name" className="label_input">First name *</label>
                                        <input
                                            ref={firstInputRef}
                                            id="hs-first-name"
                                            className="input_field_base"
                                            type="text"
                                            placeholder="Enter first name"
                                            maxLength={256}
                                            required
                                            value={firstName}
                                            onChange={e => setFirstName(e.target.value)}
                                        />
                                    </div>

                                    <div className="input_field_modal">
                                        <label htmlFor="hs-last-name" className="label_input">Last name *</label>
                                        <input
                                            id="hs-last-name"
                                            className="input_field_base"
                                            type="text"
                                            placeholder="Enter last name"
                                            maxLength={256}
                                            required
                                            value={lastName}
                                            onChange={e => setLastName(e.target.value)}
                                        />
                                    </div>

                                    <div className="input_field_modal" style={{ gridColumn: '1 / -1' }}>
                                        <label htmlFor="hs-phone" className="label_input">Phone number</label>
                                        <input
                                            id="hs-phone"
                                            className="input_field_base"
                                            type="tel"
                                            inputMode="numeric"
                                            autoComplete="tel"
                                            placeholder="07700 900000"
                                            maxLength={20}
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                        />
                                    </div>

                                    <div className="input_field_modal" style={{ gridColumn: '1 / -1' }}>
                                        <label htmlFor="hs-email" className="label_input">Email address *</label>
                                        <input
                                            id="hs-email"
                                            className="input_field_base"
                                            type="email"
                                            placeholder="Enter email address"
                                            maxLength={256}
                                            required
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="input_field_modal" style={{ gridColumn: '1 / -1' }}>
                                        <label htmlFor="hs-service" className="label_input">Service required</label>
                                        <select
                                            id="hs-service"
                                            className="input_field_base"
                                            value={service}
                                            onChange={e => setService(e.target.value)}
                                            style={{ background: 'transparent' }}
                                        >
                                            <option value="">Select a service…</option>
                                            {QUOTE_SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>

                                    <input type="submit" className="form_submit" value={sending ? 'Sending…' : 'Request Quote'} disabled={sending} />
                                </div>

                                {error && (
                                    <div className="w-form-fail visible" style={{ marginTop: '1rem' }}>
                                        Please fill in all required fields, or call us on 07865 435 946.
                                    </div>
                                )}

                                <div className="note_box">
                                    <div className="base_desc">
                                        By submitting, you agree that we may contact you about your enquiry. We never share your details with third parties.
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div>
                                <div className="heading_modal">
                                    <div className="modal_heading">Quote Request Received!</div>
                                    <button type="button" className="close_modal" onClick={onClose} aria-label="Close">
                                        <CloseIcon />
                                    </button>
                                </div>
                                <div className="w-form-done visible" style={{ marginTop: '1.5rem' }}>
                                    Thank you! We'll be in touch shortly with your free quote.
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

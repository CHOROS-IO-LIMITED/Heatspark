// Small stroke icons shared across the site. They inherit `currentColor`.

const SVG_PROPS = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
} as const;

export const ShieldIcon = () => <svg {...SVG_PROPS}><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>;
export const BoltIcon   = () => <svg {...SVG_PROPS}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>;
export const ClockIcon  = () => <svg {...SVG_PROPS}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
export const CheckIcon  = () => <svg {...SVG_PROPS} strokeWidth={2.5}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>;
export const PhoneIcon  = () => <svg {...SVG_PROPS}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>;
export const MailIcon   = () => <svg {...SVG_PROPS}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>;
export const ChatIcon   = () => <svg {...SVG_PROPS}><path d="M21 12a8 8 0 01-11.8 7L4 20l1.1-4.6A8 8 0 1121 12z" /></svg>;
export const TagIcon    = () => <svg {...SVG_PROPS}><path d="M20 12l-8 8-9-9V3h8l9 9z" /><circle cx="7.5" cy="7.5" r="1.5" /></svg>;
export const StarIcon   = () => <svg {...SVG_PROPS}><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3z" /></svg>;
export const WrenchIcon = () => <svg {...SVG_PROPS}><path d="M14.7 6.3a4 4 0 00-5.4 5.2L3 17.8V21h3.2l6.3-6.3a4 4 0 005.2-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6z" /></svg>;
export const PinIcon    = () => <svg {...SVG_PROPS}><path d="M12 21s-7-6.2-7-12a7 7 0 0114 0c0 5.8-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>;

import { useCallback, useState, type ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import '@/ABetterLou/abl.css';
import Nav from '@/ABetterLou/Nav';
import MobileMenu from '@/ABetterLou/MobileMenu';
import ReserveModal from '@/ABetterLou/ReserveModal';
import SiteFooter from '@/ABetterLou/SiteFooter';
import WhatsAppFloat from '@/ABetterLou/WhatsAppFloat';

type PageShellProps = {
    title: string;
    description: string;
    /** Path only, e.g. "/about". */
    path: string;
    /** Receives `openQuote` so page content can open the quote modal. */
    children: (openQuote: () => void) => ReactNode;
};

/** Shared chrome for the inner pages: head tags, nav, mobile menu, quote modal, footer, WhatsApp. */
export default function PageShell({ title, description, path, children }: PageShellProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const openMobile  = useCallback(() => setMobileOpen(true), []);
    const closeMobile = useCallback(() => setMobileOpen(false), []);
    const openModal   = useCallback(() => setModalOpen(true), []);
    const closeModal  = useCallback(() => setModalOpen(false), []);

    return (
        <div className="abl-root">
            <Head title={title}>
                <meta name="description" content={description} />
                <link rel="canonical" href={`https://heatsparkenergy.co.uk${path}`} />
            </Head>

            <Nav onMenuOpen={openMobile} onGetQuote={openModal} />
            <MobileMenu open={mobileOpen} onClose={closeMobile} onGetQuote={openModal} />
            <ReserveModal open={modalOpen} onClose={closeModal} />

            {children(openModal)}

            <SiteFooter />
            <WhatsAppFloat />
        </div>
    );
}

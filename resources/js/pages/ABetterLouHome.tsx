import { useCallback, useState } from 'react';
import { Head } from '@inertiajs/react';
import '@/ABetterLou/abl.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/roboto/400.css';

import Nav from '@/ABetterLou/Nav';
import MobileMenu from '@/ABetterLou/MobileMenu';
import ReserveModal from '@/ABetterLou/ReserveModal';
import HeroSection from '@/ABetterLou/HeroSection';
import ClockSection from '@/ABetterLou/ClockSection';
import TeamCarousel from '@/ABetterLou/TeamCarousel';
import MovementSection from '@/ABetterLou/MovementSection';
import HowItWorksSection from '@/ABetterLou/HowItWorksSection';
import MetabolicSection from '@/ABetterLou/MetabolicSection';
import MindsetSection from '@/ABetterLou/MindsetSection';
import ProgramsSection from '@/ABetterLou/ProgramsSection';
import FaqSection from '@/ABetterLou/FaqSection';
import BlogSection from '@/ABetterLou/BlogSection';
import QuoteSection from '@/ABetterLou/QuoteSection';
import CtaSection from '@/ABetterLou/CtaSection';
import SiteFooter from '@/ABetterLou/SiteFooter';
import WhatsAppFloat from '@/ABetterLou/WhatsAppFloat';

const PAGE_TITLE = 'Heat Spark Energy Services — Plumbing, Gas & Electrical';
const PAGE_DESC =
    'Expert domestic and commercial plumbing, gas and electrical services. Gas Safe registered and NICEIC approved engineers. Emergency call-out available 24/7.';

const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Heat Spark Energy Services Ltd',
    description: 'Expert domestic and commercial plumbing, gas and electrical services. Gas Safe registered and NICEIC approved.',
    url: 'https://heatsparkenergy.co.uk',
    logo: {
        '@type': 'ImageObject',
        url: 'https://heatsparkenergy.co.uk/images/Brand-Logo-2.avif',
    },
    telephone: '07865435946',
    email: 'admin@heatsparkenergy.co.uk',
    founder: { '@type': 'Person', name: 'Owen Davies' },
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services',
        itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Plumbing Services', serviceType: 'Plumbing' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gas Services', serviceType: 'Gas Engineering' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Electrical Services', serviceType: 'Electrical Engineering' } },
        ],
    },
};

export default function ABetterLouHome() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const openMobile  = useCallback(() => setMobileOpen(true), []);
    const closeMobile = useCallback(() => setMobileOpen(false), []);
    const openModal   = useCallback(() => setModalOpen(true), []);
    const closeModal  = useCallback(() => setModalOpen(false), []);

    return (
        <div className="abl-root">
            <Head title={PAGE_TITLE}>
                <meta name="description" content={PAGE_DESC} />
                <meta property="og:title" content="Heat Spark Energy Services Ltd" />
                <meta property="og:description" content={PAGE_DESC} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Heat Spark Energy Services Ltd" />
                <meta name="twitter:description" content={PAGE_DESC} />
                <meta name="robots" content="index,follow" />
                <link rel="canonical" href="https://heatsparkenergy.co.uk/" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
            </Head>

            {/* Navigation */}
            <Nav onMenuOpen={openMobile} onGetQuote={openModal} />

            {/* Mobile drawer */}
            <MobileMenu open={mobileOpen} onClose={closeMobile} onGetQuote={openModal} />

            {/* Quote modal */}
            <ReserveModal open={modalOpen} onClose={closeModal} />

            {/* Page sections */}
            <HeroSection onGetQuote={openModal} />
            <ClockSection />
            <TeamCarousel />
            <MovementSection onGetQuote={openModal} />
            <HowItWorksSection onGetQuote={openModal} />
            <MetabolicSection onGetQuote={openModal} />
            <MindsetSection onGetQuote={openModal} />
            <ProgramsSection onGetQuote={openModal} />
            <FaqSection />
            <BlogSection />
            <QuoteSection />
            <CtaSection onGetQuote={openModal} />
            <SiteFooter />

            <WhatsAppFloat />
        </div>
    );
}

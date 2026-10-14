import { useCallback, useState } from 'react';
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
import { AccreditationBand, CommercialGasSection, LpgSection } from '@/ABetterLou/SpecialistSections';
import { buildBusinessSchema, buildFaqSchema } from '@/ABetterLou/seo';
import SeoHead from '@/ABetterLou/SeoHead';
import useHashScroll from '@/ABetterLou/useHashScroll';

export default function ABetterLouHome() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const openMobile  = useCallback(() => setMobileOpen(true), []);
    const closeMobile = useCallback(() => setMobileOpen(false), []);
    const openModal   = useCallback(() => setModalOpen(true), []);
    const closeModal  = useCallback(() => setModalOpen(false), []);
    useHashScroll();

    return (
        <div className="abl-root">
            <SeoHead>
                <script head-key="ld-business" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBusinessSchema()) }} />
                <script head-key="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema()) }} />
            </SeoHead>

            {/* Navigation */}
            <Nav onMenuOpen={openMobile} onGetQuote={openModal} />

            {/* Mobile drawer */}
            <MobileMenu open={mobileOpen} onClose={closeMobile} onGetQuote={openModal} />

            {/* Quote modal */}
            <ReserveModal open={modalOpen} onClose={closeModal} />

            {/* Page sections */}
            <HeroSection onGetQuote={openModal} />
            <AccreditationBand />
            <CommercialGasSection onGetQuote={openModal} />
            <ClockSection />
            <TeamCarousel />
            <LpgSection onGetQuote={openModal} />
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

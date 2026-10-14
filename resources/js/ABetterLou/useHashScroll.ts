import { useEffect } from 'react';

/**
 * Scroll to `#section` links (e.g. /services#lpg) once React has rendered the page.
 * The browser's own jump happens before the content exists, so it lands at the top.
 */
export default function useHashScroll() {
    useEffect(() => {
        const id = decodeURIComponent(window.location.hash.slice(1));
        if (!id) return;
        // Wait a frame so layout (images, sticky bars) has settled.
        const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
        return () => cancelAnimationFrame(frame);
    }, []);
}

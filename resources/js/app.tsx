import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
// Removed initializeTheme since we want to force light mode
// import { initializeTheme } from './hooks/use-appearance';

// Force light mode by ensuring the 'dark' class is not present
document.documentElement.classList.remove('dark');

createInertiaApp({
    // Page titles are complete already (HeatsparkController::META). Don't append APP_NAME —
    // it was still "Auld Heating & Plumbing" from the template this site was built from.
    title: (title) => title,
    resolve: (name: string) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }: { el: HTMLElement; App: any; props: any }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// Removed initializeTheme() call to prevent overriding our forced white mode
// initializeTheme();

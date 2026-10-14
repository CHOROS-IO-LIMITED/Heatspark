import type { ReactNode } from 'react';
import { Head, usePage } from '@inertiajs/react';

type PageMeta = { path: string; title: string; description: string };

const SITE = 'https://heatsparkenergy.co.uk';
const OG_IMAGE = 'https://images.pexels.com/photos/17303438/pexels-photo-17303438.jpeg?auto=compress&cs=tinysrgb&w=1200';

/**
 * Title, description, canonical and social tags from the controller's `meta` prop
 * (HeatsparkController::META). app.blade.php renders the same tags server-side; the
 * matching `head-key`s let Inertia swap them in place instead of duplicating them.
 */
export default function SeoHead({ children }: { children?: ReactNode }) {
    const { meta } = usePage<{ meta?: PageMeta }>().props;
    if (!meta) return null;
    const url = `${SITE}${meta.path}`;

    return (
        <Head>
            <title>{meta.title}</title>
            <meta head-key="description" name="description" content={meta.description} />
            <link head-key="canonical" rel="canonical" href={url} />
            <meta head-key="og:type" property="og:type" content="website" />
            <meta head-key="og:site_name" property="og:site_name" content="Heat Spark Energy Services" />
            <meta head-key="og:title" property="og:title" content={meta.title} />
            <meta head-key="og:description" property="og:description" content={meta.description} />
            <meta head-key="og:url" property="og:url" content={url} />
            <meta head-key="og:image" property="og:image" content={OG_IMAGE} />
            <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
            {children}
        </Head>
    );
}

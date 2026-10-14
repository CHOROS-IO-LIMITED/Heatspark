// Stock photography from Pexels (free to use, no attribution required).
// Swap any ID for a real Heat Spark job photo when the client supplies them.

export type Photo = { id: number; alt: string };

export const PHOTOS = {
    plumbingPipes:   { id: 6419128,  alt: 'Plumber fitting steel pipework under a sink' },
    radiatorPipe:    { id: 29226620, alt: 'Plumber connecting pipework to a radiator' },
    boilerService:   { id: 7859953,  alt: 'Gas engineer servicing a combi boiler' },
    boilerInstall:   { id: 34938442, alt: 'Engineer installing a wall-mounted gas boiler' },
    heatingPump:     { id: 7937300,  alt: 'Central heating pump and pressure gauge on a manifold' },
    radiatorValve:   { id: 12644994, alt: 'Adjusting a thermostatic radiator valve' },
    gasFlame:        { id: 12590017, alt: 'Blue gas flame on a burner' },
    sockets:         { id: 5691588,  alt: 'Electrician wiring new wall sockets' },
    panelTesting:    { id: 34054464, alt: 'Electrician testing a panel with a multimeter' },
    panelWork:       { id: 27928762, alt: 'Electrician working on a commercial distribution board' },
    consumerUnit:    { id: 32497160, alt: 'Electrician inspecting a domestic consumer unit' },
    engineer:        { id: 8486975,  alt: 'Engineer in hard hat and hi-vis holding a pipe wrench' },
    team:            { id: 5773087,  alt: 'Team of engineers in safety gear' },
    house:           { id: 39060777, alt: 'Red brick UK home with a bay window' },
    bathroom:        { id: 7018243,  alt: 'Newly fitted bathroom with glass shower enclosure' },
    commercialRange: { id: 17303438, alt: 'Commercial gas range in a restaurant kitchen' },
    cateringKitchen: { id: 34276646, alt: 'Stainless steel catering kitchen with gas cooking equipment' },
    plantRoom:       { id: 10290629, alt: 'Commercial plant room with pumps and pipework' },
    staticCaravans:  { id: 18026360, alt: 'Static caravans on a UK coastal holiday park' },
    narrowboat:      { id: 18115341, alt: 'Narrowboat moored on a canal' },
} satisfies Record<string, Photo>;

const WIDTHS = [640, 1280, 1920];

export function pexelsUrl(id: number, width: number): string {
    return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

export function pexelsSrcSet(id: number): string {
    return WIDTHS.map(w => `${pexelsUrl(id, w)} ${w}w`).join(', ');
}

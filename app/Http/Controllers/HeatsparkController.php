<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class HeatsparkController extends Controller
{
    /**
     * Per-page SEO. Rendered server-side in app.blade.php (for crawlers and link
     * previews that don't run JavaScript) and reused by the React pages' <Head>.
     */
    private const META = [
        'home' => [
            'path'        => '/',
            'title'       => 'Gas Engineers Swansea & South Wales — Commercial Gas, LPG, Plumbing & Electrical | Heat Spark',
            'description' => 'Swansea-based Gas Safe registered (978573) engineers covering South & Mid Wales and the Bristol Channel. Commercial gas servicing & breakdowns, LPG for caravans & boats, plumbing and NAPIT electrical work.',
        ],
        'about' => [
            'path'        => '/about',
            'title'       => 'About Us — Swansea Gas, Plumbing & Electrical Engineers | Heat Spark',
            'description' => 'Heat Spark Energy Services Ltd, Swansea — Gas Safe (978573), OFTEC (C504180) and NAPIT (84695) registered, City & Guilds qualified engineers covering South & Mid Wales.',
        ],
        'services' => [
            'path'        => '/services',
            'title'       => 'Commercial Gas, LPG, Plumbing & Electrical Services in South Wales | Heat Spark',
            'description' => 'Commercial gas servicing & breakdowns, LPG for caravans & boats, domestic gas, plumbing and electrical across Swansea, South & Mid Wales and the Bristol Channel. Gas Safe registered (978573).',
        ],
        'portfolio' => [
            'path'        => '/portfolio',
            'title'       => 'Our Work — Gas, Plumbing & Electrical Projects in South Wales | Heat Spark',
            'description' => 'Examples of our gas, plumbing and electrical work — boiler installations, bathroom fits, consumer units and more.',
        ],
        'contact' => [
            'path'        => '/contact',
            'title'       => 'Contact Heat Spark — Gas Engineers in Swansea & South Wales',
            'description' => 'Get a free quote from Heat Spark Energy Services in Swansea, covering South & Mid Wales. Call 07865 435 946, WhatsApp us, or use our contact form.',
        ],
    ];

    private function page(string $component, string $key)
    {
        return Inertia::render($component, ['meta' => self::META[$key]]);
    }

    public function home()
    {
        return $this->page('ABetterLouHome', 'home');
    }

    public function about()
    {
        return $this->page('Heatspark/About', 'about');
    }

    public function services()
    {
        return $this->page('Heatspark/Services', 'services');
    }

    public function portfolio()
    {
        return $this->page('Heatspark/Portfolio', 'portfolio');
    }

    public function contact()
    {
        return $this->page('Heatspark/Contact', 'contact');
    }

    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'firstName' => ['required', 'string', 'max:100'],
            'lastName'  => ['required', 'string', 'max:100'],
            'email'     => ['required', 'email', 'max:255'],
            'phone'     => ['nullable', 'string', 'max:30'],
            'service'   => ['nullable', 'string', 'max:100'],
            'message'   => ['required', 'string', 'max:2000'],
        ]);

        try {
            Mail::raw(
                "New enquiry from {$validated['firstName']} {$validated['lastName']}\n\n"
                . "Email: {$validated['email']}\n"
                . "Phone: " . ($validated['phone'] ?? 'Not provided') . "\n"
                . "Service: " . ($validated['service'] ?? 'Not specified') . "\n\n"
                . "Message:\n{$validated['message']}",
                function ($message) use ($validated) {
                    $message->to('admin@heatsparkenergy.co.uk')
                            ->from(config('mail.from.address'), 'Heat Spark Website')
                            ->replyTo($validated['email'], "{$validated['firstName']} {$validated['lastName']}")
                            ->subject("New Quote Request — {$validated['firstName']} {$validated['lastName']}");
                }
            );
        } catch (\Exception $e) {
            return response()->json(['message' => 'Mail error'], 500);
        }

        return response()->json(['message' => 'Sent']);
    }
}

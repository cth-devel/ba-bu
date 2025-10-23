import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://babusalon.com";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "BA-BU Family Salon is Kerala’s trusted destination for expert beauty, grooming, and haircare services across North Paravur and Mathilmoola, Thrissur.",
  alternates: { canonical: `${siteUrl}/aboutus` },
  openGraph: {
    title: "About Us | BA-BU Family Salon",
    description:
      "BA-BU Family Salon – affordable luxury and professional care for the whole family in North Paravur and Mathilmoola, Thrissur, Kerala.",
    url: `${siteUrl}/aboutus`,
    siteName: siteConfig.siteName,
    type: "article",
    images: [
      {
        url: `${siteUrl}BABU-White.svg`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.siteName} – BA-BU Family Salon`,
      },
    ],
  },
};

const AboutUsPage = () => {
  return (
    <main role="main" aria-label="About BA-BU Family Salon" className="bg-primary text-white">
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">
              About Us – BA-BU Family Salon, North Paravur & Mathilmoola, Thrissur, Kerala
            </h1>
            <div className="w-24 h-1 bg-gold mt-4" aria-hidden="true"></div>
          </header>

          <div className="space-y-10 leading-relaxed text-gray-200 tracking-widest">
            <p>
              BA-BU Family Salon is the premier destination for families seeking expert beauty, grooming, and haircare
              services in North Paravur (Andipillikkav and Mannam) and Mathilmoola, Thrissur, Kerala. For over five
              years, BA-BU has set the standard for affordable luxury and professional salon care in Kerala. The name
              BA-BU is a heartfelt tribute to our founder’s late father, KK BABU, whose legacy of warmth and hospitality
              inspires everything we do.
            </p>

            <section aria-labelledby="mission-vision">
              <h2 id="mission-vision" className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Our Mission & Vision
              </h2>
              <p>
                Our mission is simple: to deliver affordable luxury and everyday comfort through expert styling, modern
                techniques, and a touch of warmth that makes every family feel at home. We are dedicated to creating a
                one-stop salon experience that blends professional expertise with personal care, ensuring every
                generation—kids, parents, and grandparents—can enjoy beauty and grooming under one roof. Our vision is to
                become Kerala’s first choice for family salon services, combining contemporary trends with timeless
                hospitality in North Paravur and Mathilmoola.
              </p>
            </section>

            <section aria-labelledby="family-care">
              <h2 id="family-care" className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Family-Friendly Atmosphere & Comprehensive Care
              </h2>
              <p>
                At BA-BU, we pride ourselves on being a true family salon. From a toddler’s first haircut to senior care
                services, our <em>skilled professionals</em> deliver personalized attention and superior results to clients of
                all ages. Our salons offer a warm, safe, and comfortable environment, making us the most trusted salon for
                families in North Paravur and Thrissur. We believe every visit should be worry-free, so we maintain
                modern, sanitized facilities and premium hygiene standards.
              </p>
            </section>

            <section aria-labelledby="services">
              <h2 id="services" className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Our Services & Specializations
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Creative haircuts for kids, women, and men</li>
                <li>Facials, skin treatments, and hair coloring</li>
                <li>Bridal beauty packages and special occasion styling</li>
                <li>Protein treatments, waxing, manicures, pedicures, and spa therapies</li>
                <li>Seniors’ grooming and care services</li>
              </ul>
              <p className="mt-4">
                All services are delivered by experienced stylists using only the finest products and the latest
                techniques, at affordable prices suited for every family.
              </p>
            </section>

            <section aria-labelledby="why-choose">
              <h2 id="why-choose" className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Why Choose BA-BU Family Salon
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>All-in-One Care:</strong> Comprehensive services for kids, parents, and grandparents</li>
                <li><strong>Family-Friendly Environment:</strong> Welcoming, comfortable, and safe atmosphere</li>
                <li><strong>Affordable Luxury:</strong> High-quality services at prices that fit every budget</li>
                <li><strong>Skilled Professionals:</strong> Trained experts in hair, skin, and beauty care</li>
                <li><strong>Hygiene & Safety First:</strong> Modern, clean, sanitized space for every client</li>
                <li><strong>Convenient Access:</strong> Easily accessible ground floor salons with ample parking</li>
              </ul>
            </section>

            <section aria-labelledby="visit-us">
              <h2 id="visit-us" className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Visit Us Today
              </h2>
              <p>
                Join the BA-BU Family Salon community and experience what makes us Kerala’s most trusted name in family
                beauty and grooming. Our locations in <em>North Paravur (Andipillikkav and Mannam)</em> and
                <em> Mathilmoola, Thrissur</em> provide easy access, great parking, and a personal touch you won’t find anywhere
                else.
              </p>
              <p className="mt-4">
                Whether you want a stylish haircut, a relaxing facial, bridal makeover, or senior care service, BA-BU
                Family Salon promises you’ll leave feeling confident, refreshed, and truly cared for. Book your
                appointment today and discover affordable luxury, professional care, and a family-first approach—all right
                here in Kerala.
              </p>
            </section>
          </div>

          <div className="mt-10">
            <a
              href={siteConfig.contact.whatsapp}
              aria-label="Book your appointment on WhatsApp"
              tabIndex={0}
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-yellow-300/30"
            >
              Book Appointment on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;



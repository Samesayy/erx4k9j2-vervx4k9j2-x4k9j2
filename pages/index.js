// pages/index.js
import Head from 'next/head';
import Navbar from '../components/Navbar';
import HeroContainer from '../components/hero/HeroContainer';
import OfficeCategories from '../components/OfficeCategories';
import PopularCities from '../components/hero/PopularCities';
import FeaturedWorkspaces from '../components/FeaturedWorkspaces';
import BeyondWorkspaces from '../components/BeyondWorkspaces'; // <-- ADD THIS IMPORT
import HowItWorks from '../components/HowItWorks';
import Verve99 from '../components/Verve99';
import Clients from '../components/Clients';
import WorkspacesForEveryone from '../components/WorkspacesForEveryone';
import EnterpriseSolutions from '../components/EnterpriseSolutions';
import NewsFeaturedVerve99 from '../components/NewsFeaturedVerve99';
import Testimonials from '../components/Testimonials';
import FAQWithForm from '../components/FAQWithForm';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Verve99 | Find Your Perfect Workspace</title>
        <meta
          name="description"
          content="Verve99 - A Strategic Horizon for Flexible Workspaces"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="bg-primary-light">
        <Navbar />

        {/* Hero Section */}
        <section className="bg-white">
          <HeroContainer />
        </section>

        {/* Office Categories */}
        <section className="bg-white pt-8">
          <OfficeCategories />
        </section>

        {/* Popular Cities & Featured Workspaces */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary-dark">
                Explore by Popular Cities
              </h2>
            </div>
            <PopularCities />
            <div className="mt-16">
              <FeaturedWorkspaces />
            </div>
          </div>
        </section>

        {/* --- ADD THE NEW SECTION HERE --- */}
        <BeyondWorkspaces />

        {/* How It Works Section */}
        <section className="py-16 bg-primary-light">
          <HowItWorks />
        </section>

        {/* Verve99 Section */}
        <Verve99 />

        {/* Our Esteemed Clients */}
        <section className="py-16 bg-primary-light">
          <div className="max-w-7xl mx-auto px-4">
            <Clients />
          </div>
        </section>

        {/* Workspaces for Everyone */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <WorkspacesForEveryone />
          </div>
        </section>

        {/* Enterprise Solutions */}
        <section className="py-16 bg-primary-light">
          <EnterpriseSolutions />
        </section>

        {/* News & Featured in Verve99 */}
        <section className="py-16 bg-white">
          <NewsFeaturedVerve99 />
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-primary-light">
          <div className="max-w-7xl mx-auto px-4">
            <Testimonials />
          </div>
        </section>

        {/* FAQ with Form */}
        <section className="py-16 bg-white">
          <FAQWithForm />
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

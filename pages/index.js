// pages/index.js

import Head from 'next/head';
import Navbar from '../components/Navbar';
import HeroContainer from '../components/hero/HeroContainer';
import OfficeCategories from '../components/OfficeCategories';
import PopularCities from '../components/hero/PopularCities';
import FeaturedWorkspaces from '../components/FeaturedWorkspaces';
import HowItWorks from '../components/HowItWorks';
import Verve99 from '../components/Verve99';
import Clients from '../components/Clients';
import WorkspacesForEveryone from '../components/WorkspacesForEveryone';
import EnterpriseSolutions from '../components/EnterpriseSolutions';
import NewsFeaturedVerve99 from '../components/NewsFeaturedVerve99';
import FAQWithForm from '../components/FAQWithForm';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Verve99 | Find Your Perfect Workspace</title>
        <meta name="description" content="Verve99 - A Strategic Horizon for Flexible Workspaces" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex flex-col min-h-screen bg-primary-light">
        {/* 1) Top Navigation */}
        <Navbar />

        {/* 2) Hero Section – full‐width white */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <HeroContainer />
          </div>
        </section>

        {/* 3) Office Categories – white */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <OfficeCategories />
          </div>
        </section>

        {/* 4) Popular Cities – gray */}
        <section className="py-8 bg-primary-light">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary-dark mb-6 text-center">
              Popular Cities
            </h2>
            <PopularCities />
          </div>
        </section>

        {/* 5) Featured Workspaces – white */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <FeaturedWorkspaces />
          </div>
        </section>

        {/* 6) How It Works – gray */}
        <section className="py-16 bg-primary-light">
          <div className="max-w-7xl mx-auto px-4">
            <HowItWorks />
          </div>
        </section>

        {/* 7) Why Verve99 – white */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <Verve99 />
          </div>
        </section>

        {/* 8) Our Esteemed Clients – gray */}
        <section className="py-16 bg-primary-light">
          <div className="max-w-7xl mx-auto px-4">
            <Clients />
          </div>
        </section>

        {/* 9) Workspaces for Everyone (Tabbed) – white */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <WorkspacesForEveryone />
          </div>
        </section>

        {/* 10) Core Enterprise Solutions – gray */}
        <section className="py-16 bg-primary-light">
          <div className="max-w-7xl mx-auto px-4">
            <EnterpriseSolutions />
          </div>
        </section>

        {/* 11) “Featured In” Carousel – white */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <NewsFeaturedVerve99 />
          </div>
        </section>

        {/* ─────────────── Divider / White Space ─────────────── */}
        {/* If “border-medium-gray” isn’t showing, try “border-gray-300” to confirm */}
        <div className="border-t border-medium-gray my-16" />

        {/* 12) FAQ + Get a Quote (side by side on lg+) – gray background */}
        <FAQWithForm />

        {/* 13) Footer – always white */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <Footer />
          </div>
        </section>
      </div>
    </>
  );
}

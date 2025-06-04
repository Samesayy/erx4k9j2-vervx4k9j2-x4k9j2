import Link from 'next/link';
import Image from 'next/image';
import { FiBriefcase, FiUsers, FiGlobe, FiCloud, FiShare2, FiRefreshCw } from 'react-icons/fi';

export default function EnterpriseSolutions() {
  // List of features with updated terminology, icons, and descriptions
  const features = [
    {
      id: 'managed-office',
      icon: <FiBriefcase size={24} />,
      title: 'Managed Office Solutions',
      description:
        'Fully furnished, turnkey office environments managed end‐to‐end—so your team can hit the ground running.',
    },
    {
      id: 'business-continuity',
      icon: <FiRefreshCw size={24} />,
      title: 'Business Continuity Planning',
      description:
        'Seamless backup & disaster‐recovery workplaces, ensuring zero downtime for critical teams.',
    },
    {
      id: 'enterprise-coworking',
      icon: <FiUsers size={24} />,
      title: 'Enterprise Co-Working Hubs',
      description:
        'Curated co-working campuses built to foster collaboration and innovation at scale.',
    },
    {
      id: 'hybrid-workspaces',
      icon: <FiCloud size={24} />,
      title: 'Hybrid Workspace Models',
      description:
        'Flexible “office + remote” blends, empowering your workforce to choose where and how they work.',
    },
    {
      id: 'multi-city-deployments',
      icon: <FiGlobe size={24} />,
      title: 'Multi-City Deployments',
      description:
        'Deploy hubs across multiple cities with centralized billing, reporting, and management.',
    },
    {
      id: 'hub-and-spoke-networks',
      icon: <FiShare2 size={24} />,
      title: 'Hub-and-Spoke Networks',
      description:
        'A central flagship office plus satellite “spoke” locations—designed to keep teams connected.',
    },
  ];

  return (
    <section className="py-16 bg-primary-light">
      <div className="max-w-7xl mx-auto px-4 lg:flex lg:items-center lg:space-x-12">
        {/* Left Column: Text + List */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-semibold text-primary-dark mb-4">
            Core Enterprise Solutions
          </h2>
          <p className="text-medium-gray mb-8">
            One single‐source provider for all your enterprise‐grade workplace needs—scale with confidence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feat) => (
              <div
                key={feat.id}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-glass">
                  <span className="text-brand-primary">{feat.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-primary-dark">{feat.title}</h3>
                  <p className="text-medium-gray mt-1">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            {/* The 'a' tag is removed, and its classes are moved to the Link component */}
            <Link href="/enterprise-solutions" className="inline-block px-6 py-3 bg-brand-primary text-white font-medium rounded-lg shadow hover:bg-opacity-90 transition">
              Explore Now
            </Link>
          </div>

          <div className="mt-4">
            {/* The 'a' tag is removed, and its classes are moved to the Link component */}
            <Link href="/enterprise-solutions#how-it-works" className="flex items-center text-brand-primary font-medium hover:underline">
              <FiRefreshCw className="mr-2" />
              Discover how Enterprise Solutions work
            </Link>
          </div>
        </div>

        {/* Right Column: Illustration */}
        <div className="mt-10 lg:mt-0 lg:w-1/2 flex justify-center">
          <div className="relative w-full h-72 md:h-96">
            {/* Place an illustrative SVG or PNG in public/images/enterprise-illustration.png 
              (Dimensions roughly 800×600 recommended)
            */}
            <Image
              src="/images/enterprise-illustration.png"
              alt="Enterprise solutions illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
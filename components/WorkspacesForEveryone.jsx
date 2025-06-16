// components/WorkspacesForEveryone.jsx
import { useState } from 'react';
import Link from 'next/link';
import {
  BsBuilding,
  BsBarChartLine,
  BsRocketTakeoff,
  BsPersonWorkspace,
  BsGlobe,
  BsMap,
  BsEasel2,
  BsDoorOpen,
  BsHouseDoor,
  BsPersonBadge,
  BsPersonVideo,
  BsWallet2,
} from 'react-icons/bs';

// 1. THE NEW, NESTED DATA STRUCTURE
// Each persona has an array of recommended 'solutions'.
// Each solution maps to a real page on your site.
const personas = [
  {
    id: 'enterprise',
    title: 'For Enterprise',
    icon: <BsBuilding size={28} />,
    solutions: [
      { icon: <BsHouseDoor />, title: 'Managed Office', desc: 'A private, custom-built HQ.', href: '/enterprise-solutions' },
      { icon: <BsDoorOpen />, title: 'Serviced Office', desc: 'For large, flexible teams.', href: '/listing?service=Serviced Office' },
      { icon: <BsPersonWorkspace />, title: 'Coworking Space', desc: 'Hubs for distributed teams.', href: '/listing?service=Coworking Space' },
      { icon: <BsBuilding />, title: 'Commercial Space', desc: 'Conventional leases, managed.', href: '/enterprise-solutions' },
    ],
  },
  {
    id: 'small-teams',
    title: 'For Small Teams',
    icon: <BsBarChartLine size={28} />,
    solutions: [
      { icon: <BsPersonWorkspace />, title: 'Coworking Space', desc: 'Vibrant, collaborative desks.', href: '/listing?service=Coworking Space' },
      { icon: <BsPersonVideo />, title: 'Meeting Rooms', desc: 'For client and team meetings.', href: '/listing?service=Meeting Room' },
      { icon: <BsPersonBadge />, title: 'Virtual Office', desc: 'A premium business address.', href: '/listing?service=Virtual Office' },
      { icon: <BsEasel2 />, title: 'Training Rooms', desc: 'For workshops and upskilling.', href: '/listing?service=Training Room' },
    ],
  },
  {
    id: 'startups',
    title: 'For Startups',
    icon: <BsRocketTakeoff size={28} />,
    solutions: [
      { icon: <BsPersonWorkspace />, title: 'Coworking Space', desc: 'Flexible desks to scale fast.', href: '/listing?service=Coworking Space' },
      { icon: <BsWallet2 />, title: 'Day Pass', desc: 'Cost-effective, on-demand access.', href: '/listing?service=Day Office' },
      { icon: <BsPersonBadge />, title: 'Virtual Office', desc: 'For registration and mail.', href: '/listing?service=Virtual Office' },
    ],
  },
  {
    id: 'freelancers',
    title: 'For Freelancers',
    icon: <BsPersonWorkspace size={28} />,
    solutions: [
        { icon: <BsPersonBadge />, title: 'Virtual Office', desc: 'Look professional anywhere.', href: '/listing?service=Virtual Office' },
        { icon: <BsWallet2 />, title: 'Day Pass', desc: 'Productive space, when needed.', href: '/listing?service=Day Office' },
        { icon: <BsDoorOpen />, title: 'Private Office', desc: 'A dedicated, lockable cabin.', href: '/listing?service=Serviced Office' },
    ],
  },
  {
    id: 'remote-teams',
    title: 'For Remote Teams',
    icon: <BsGlobe size={28} />,
    solutions: [
        { icon: <BsWallet2 />, title: 'Day Pass', desc: 'Drop-in access across cities.', href: '/listing?service=Day Office' },
        { icon: <BsPersonVideo />, title: 'Meeting Rooms', desc: 'For physical team sync-ups.', href: '/listing?service=Meeting Room' },
    ],
  },
  {
    id: 'expanding-biz',
    title: 'For Expanding Business',
    icon: <BsMap size={28} />,
    solutions: [
        { icon: <BsBuilding />, title: 'Commercial Space', desc: 'Your next flagship location.', href: '/enterprise-solutions' },
        { icon: <BsPersonBadge />, title: 'Virtual Office', desc: 'Test new markets instantly.', href: '/listing?service=Virtual Office' },
        { icon: <BsEasel2 />, title: 'Training Rooms', desc: 'Onboard your new city team.', href: '/listing?service=Training Room' },
        { icon: <BsPersonVideo />, title: 'Meeting Rooms', desc: 'Meet local clients.', href: '/listing?service=Meeting Room' },
    ],
  },
];


export default function WorkspacesForEveryone() {
  // 2. STATE TO TRACK THE ACTIVE PERSONA
  const [activePersonaId, setActivePersonaId] = useState(personas[0].id);

  const activePersona = personas.find((p) => p.id === activePersonaId);

  return (
    <section className="py-20 bg-primary-light">
      <div className="max-w-7xl mx-auto px-4">
        {/* --- Section Heading --- */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark">
            The Right Space for Every Pace
          </h2>
          <p className="text-lg text-medium-gray mt-3 max-w-3xl mx-auto">
            From large enterprises to individual freelancers, we provide tailored solutions to meet your unique workspace needs.
          </p>
        </div>

        {/* 3. THE PERSONA GRID (ACTS AS TABS) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {personas.map((persona) => (
            <button
              key={persona.id}
              onClick={() => setActivePersonaId(persona.id)}
              className={`
                flex flex-col items-center justify-center text-center p-4 rounded-xl 
                border-2 transition-all duration-300
                ${activePersonaId === persona.id
                  ? 'bg-brand-primary text-white border-brand-primary shadow-lg'
                  : 'bg-white text-primary-dark border-transparent hover:border-brand-primary hover:-translate-y-1'
                }
              `}
            >
              <div className="mb-2">{persona.icon}</div>
              <span className="font-semibold text-sm">{persona.title}</span>
            </button>
          ))}
        </div>
        
        {/* 4. THE DYNAMIC SOLUTIONS GRID */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
           <h3 className="text-2xl font-bold text-primary-dark mb-6">Recommended Solutions for <span className="text-brand-primary">{activePersona.title}</span></h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {activePersona.solutions.map((solution) => (
                    <Link
                        key={solution.title}
                        href={solution.href}
                        className="group block p-6 bg-primary-light rounded-xl hover:bg-accent/20 transition-colors"
                    >
                        <div className="text-brand-primary mb-3">{solution.icon}</div>
                        <h4 className="font-bold text-primary-dark mb-1">{solution.title}</h4>
                        <p className="text-sm text-medium-gray">{solution.desc}</p>
                    </Link>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}
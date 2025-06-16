// components/navbar/menuData.js

import {
  BsBuilding,
  BsPersonWorkspace,
  BsJournalCheck,
  BsLaptop,
  BsBinoculars,
  BsShieldCheck,
  BsHeadset,
  BsBuildingAdd,
  BsBriefcase,
  BsInfoCircle,    // <-- Make sure this icon is imported
} from 'react-icons/bs';

export const solutionsData = {
  byType: [ // <-- "About Us" moved into this section
    {
      name: 'Coworking Space',
      desc: 'Shared spaces for collaboration',
      href: '/services/coworking-space',
      icon: <BsPersonWorkspace />
    },
    {
      name: 'Serviced Office',
      desc: 'Fully-equipped, private offices',
      href: '/services/serviced-office',
      icon: <BsBuilding />
    },
    {
      name: 'Virtual Office',
      desc: 'A premium address for your business',
      href: '/services/virtual-office',
      icon: <BsJournalCheck />
    },
    {
      name: 'Meeting Room',
      desc: 'On-demand rooms for your meetings',
      href: '/services/meeting-room',
      icon: <BsLaptop />
    },
    {
      name: 'About Us',                     // <-- New About Us link here
      desc: 'Learn more about our mission and team',
      href: '/about-us',
      icon: <BsInfoCircle />
    },
  ],
  byNeed: [  // <-- "About Us" removed from here
    {
      name: 'For Enterprise',
      desc: 'Custom solutions for large teams',
      href: '/enterprise-solutions',
      icon: <BsShieldCheck />
    },
    {
      name: 'List Your Space',
      desc: 'Partner with us to monetize your property',
      href: '/list-your-space',
      icon: <BsBuildingAdd />
    },
    {
      name: 'Find a Space',
      desc: 'Explore thousands of options',
      href: '/listing',
      icon: <BsBinoculars />
    },
    {
      name: 'Careers',
      desc: 'Join our team to shape the future of work',
      href: '/careers',
      icon: <BsBriefcase />
    },
    {
      name: 'Get a Callback',
      desc: 'Our experts are here to help',
      href: '/contact',
      icon: <BsHeadset />
    },
  ]
};

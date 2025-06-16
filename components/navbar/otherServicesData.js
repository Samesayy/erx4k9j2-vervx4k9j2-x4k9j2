// components/navbar/otherServicesData.js
import { Mail, PhoneCall, UserCheck, Warehouse, Box, Tent, Mountain } from 'lucide-react';

export const otherServicesData = {
  virtual: [
    { name: 'Virtual Office', desc: 'A premium address for your business.', href: '/virtual-office-solutions', icon: <UserCheck /> },
    { name: 'Mail Handling', desc: 'Securely receive and forward your business mail.', href: '/virtual-office-solutions', icon: <Mail /> },
    { name: 'Call Answering', desc: 'Never miss a call with our dedicated answering services.', href: '/virtual-office-solutions', icon: <PhoneCall /> },
  ],
  specialty: [
    { 
      name: 'Event Spaces', 
      desc: 'Book unique venues for your next corporate event.', 
      href: '/event-spaces', // CORRECTED LINK
      icon: <Tent /> 
    },
    { 
      name: 'E-commerce Storage', 
      desc: 'Secure, flexible storage for your inventory.', 
      href: '/warehousing?type=ecommerce', // CORRECTED LINK (sub-category)
      icon: <Box /> 
    },
    { 
      name: 'Warehousing', 
      desc: 'Large-scale warehousing and logistics support.', 
      href: '/warehousing', // CORRECTED LINK
      icon: <Warehouse /> 
    },
    { 
      name: 'Hill Station Workspaces', 
      desc: 'Inspiring workspaces in serene mountain locations.', 
      href: '/hill-station-workspaces', // CORRECTED LINK
      icon: <Mountain /> 
    },
  ]
};
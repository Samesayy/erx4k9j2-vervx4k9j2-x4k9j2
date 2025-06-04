import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

/**
 * FAQ (Accordion) Component
 *
 * - Renders a list of questions and hides/shows answers on click.
 * - Only one answer can be open at a time (accordion behavior).
 * - Uses Strategic Horizon color palette via Tailwind classes:
 * • bg-primary-light (#ECF0F1) for background
 * • text-primary-dark (#2C3E50) for headings/text
 * • text-medium-gray (#95A5A6) for secondary text
 * • brand-primary (#3498DB) for accent icons/buttons
 * - Fully responsive: mobile, tablet, desktop.
 */

const faqData = [
  {
    question: 'What is Verve99?',
    answer:
      'Verve99 is a strategic platform offering flexible workspace solutions for individuals, teams, and enterprises. We connect you with a wide range of coworking spaces, private offices, managed offices, and more—tailored to your specific needs and budget—across various cities.',
  },
  {
    question: 'What types of workspaces does Verve99 offer?',
    answer:
      'We offer a diverse portfolio including:\n\n' +
      'Coworking Desks: Hot desks and dedicated desks in shared environments.\n' +
      'Private Offices: Fully furnished and serviced private cabins for teams of all sizes.\n' +
      'Managed Office Solutions: Custom-built and managed office spaces tailored to your enterprise requirements.\n' +
      'Meeting Rooms & Event Spaces: On-demand access to professional meeting rooms and venues for events.\n' +
      'Hybrid & Hub-and-Spoke Models: Solutions designed for flexible work arrangements across multiple locations.',
  },
  {
    question: 'How do I find and book a workspace on Verve99?',
    answer:
      'You can easily search for workspaces on our platform using criteria such as location, team size, budget, and desired amenities. Once you find a suitable option, you can submit an inquiry directly through our website, and our workspace experts will guide you through the booking process.',
  },
  {
    question: 'Is Verve99 suitable for individuals, startups, or large enterprises?',
    answer:
      'Yes—Verve99 caters to all. We have solutions for solo entrepreneurs looking for a flexible hot desk, growing startups needing private offices, and large corporations seeking custom-built managed offices or multi-city deployments.',
  },
  {
    question: 'What are the benefits of using Verve99 instead of booking directly with a workspace provider?',
    answer:
      'Verve99 acts as a single point of contact, offering:\n\n' +
      '- **Extensive Selection**: Access to a vast network of verified spaces.\n' +
      '- **Expert Guidance**: Our team helps you navigate options and find the best fit.\n' +
      '- **Cost-Effectiveness**: We often secure preferential rates and simplify negotiations.\n' +
      '- **Simplified Process**: Centralized billing and management, especially for multiple locations or large teams.\n' +
      '- **Flexibility**: Easily scale up or down as your needs change.',
  },
  {
    question: 'Do I have to pay Verve99 for its services?',
    answer:
      'For most individual and small to medium-sized business inquiries, our service is free for you, the user. We receive a commission from our partner workspace providers. For highly customized enterprise solutions, specific service fees might apply, which will be clearly communicated upfront.',
  },
  {
    question: 'Can I visit a workspace before committing to a booking?',
    answer:
      'Absolutely! We highly recommend scheduling a tour of any workspace you are considering. Our team will help arrange site visits at your convenience so you can experience the environment firsthand.',
  },
  {
    question: 'What kind of amenities can I expect in Verve99 listed workspaces?',
    answer:
      'Amenities vary by location and workspace type but commonly include high-speed internet, ergonomic furniture, meeting rooms, printing facilities, pantry access, reception services, security, cleaning, and sometimes wellness programs or event spaces. Each listing will detail its specific amenities.',
  },
  {
    question: 'How long are the commitment periods for Verve99 workspaces?',
    answer:
      'Verve99 offers flexible terms. You can find workspaces available for daily, weekly, monthly, or longer-term commitments. Managed office solutions can be tailored for custom lease durations to meet enterprise needs.',
  },
  {
    question: 'What if my team grows or shrinks? Can Verve99 help us adapt?',
    answer:
      'Yes, flexibility is a core advantage of Verve99. If your team grows, we can help you find larger spaces or additional desks. If your team shrinks, we can assist in negotiating reduced space or finding a more suitable smaller option, minimizing your overhead and hassle.',
  },
];

export default function FAQ() {
  // Track the index of the currently open question. -1 means all closed.
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleQuestion = (idx) => {
    // If this question is already open, close it. Otherwise, open it.
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    // **KEY CHANGE:** Removed "py-16 bg-primary-light" from this section.
    // The overall section padding and background are now handled by FAQWithForm.jsx
    // This allows the content to align properly with the QuoteForm.
    <div className="max-w-3xl mx-auto px-4">
      {/* Section Title */}
      <h2 className="text-3xl font-semibold text-primary-dark text-center mb-6">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-medium-gray mb-12">
        Have questions? We’ve got answers. Click any question to reveal the response.
      </p>

      {/* FAQ items */}
      <div className="space-y-4">
        {faqData.map((item, idx) => {
          const isOpen = idx === openIndex;
          return (
            <div
              key={idx}
              className="
                bg-white
                rounded-lg
                shadow-md
                overflow-hidden
                border
                border-transparent
                hover:border-brand-primary
                transition-colors
                duration-200
              "
            >
              {/* Question */}
              <button
                onClick={() => toggleQuestion(idx)}
                className={`
                  w-full
                  px-6 py-4
                  flex justify-between items-center
                  text-left
                  ${
                    isOpen
                      ? 'bg-brand-primary text-primary-light'
                      : 'bg-white text-primary-dark'
                  }
                  focus:outline-none
                  transition
                `}
              >
                <span className="font-medium text-lg">{item.question}</span>
                {isOpen ? (
                  <FiMinus className="text-xl" />
                ) : (
                  <FiPlus className="text-xl text-brand-primary" />
                )}
              </button>

              {/* Answer */}
              <div
                className={`
                  px-6
                  pb-4
                  text-medium-gray
                  prose prose-sm
                  ${isOpen ? 'block' : 'hidden'}
                `}
              >
                {/*
                  - We preserve line breaks in some answers by splitting on "\n"
                    and rendering <p> for each paragraph.
                */}
                {item.answer.split('\n').map((paragraph, pidx) => (
                  <p key={pidx} className="mb-2">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
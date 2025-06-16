// components/WhyVerve99Banner.jsx
import { FiThumbsUp, FiCheckCircle, FiStar, FiClock } from 'react-icons/fi';

const whyVerve99Data = [
    {
        icon: <FiThumbsUp className="h-8 w-8 text-accent" />,
        title: 'Best Price Guarantee',
        description: 'We negotiate for you to ensure you get the most competitive rates available.',
    },
    {
        icon: <FiCheckCircle className="h-8 w-8 text-accent" />,
        title: 'Verified Properties',
        description: 'Every workspace is physically verified by our team for quality and accuracy.',
    },
    {
        icon: <FiClock className="h-8 w-8 text-accent" />,
        title: 'Quick Response',
        description: 'Our experts get back to you within hours, not days. Fast and reliable service.',
    },
    {
        icon: <FiStar className="h-8 w-8 text-accent" />,
        title: 'No Brokerage',
        description: 'Our services are completely free for you. No hidden fees or commissions.',
    },
];

const WhyVerve99Banner = () => {
    return (
        <div className="bg-primary-dark text-primary-light rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-center mb-6 text-white">Why Verve99?</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                {whyVerve99Data.map((item) => (
                    <div key={item.title} className="text-center">
                        <div className="flex justify-center mb-2">{item.icon}</div>
                        <h4 className="font-semibold text-white">{item.title}</h4>
                        <p className="text-xs text-medium-gray mt-1">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyVerve99Banner;
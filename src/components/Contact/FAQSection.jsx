import FAQItem from './FAQItem';
import { faqs } from '../Contact/data/contactData';

const FAQSection = () => {
  return (
    <div className="lg:col-span-1">
      <h3 className="text-2xl font-bold text-white mb-6">
        Frequently Asked Questions
      </h3>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
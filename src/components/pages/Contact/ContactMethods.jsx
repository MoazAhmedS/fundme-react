import ContactInfoCard from './ContactInfoCard';
import { contactMethods } from '../Contact/data/contactData';

const ContactMethods = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {contactMethods.map((method, index) => (
        <ContactInfoCard key={index} {...method} />
      ))}
    </div>
  );
};

export default ContactMethods;
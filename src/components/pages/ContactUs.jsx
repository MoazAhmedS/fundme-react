import Navbar from '../NavigationComponents/Navbar';
import Footer from '../NavigationComponents/Footer';
import ContactHeader from '../Contact/ContactHeader';
import ContactMethods from '../Contact/ContactMethods'

const ContactUs = () => {
  return (
   <> 
    <Navbar/>
    <div className="min-h-screen bg-gray-900 text-white">
      <ContactHeader />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ContactMethods />
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;
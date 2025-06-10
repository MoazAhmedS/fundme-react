import Navbar from '../NavigationComponents/Navbar';
import Footer from '../NavigationComponents/Footer';
import ContactHeader from '../Contact/ContactHeader';


const ContactUs = () => {
  return (
   <> 
    <Navbar/>
    <div className="min-h-screen bg-gray-900 text-white">
      <ContactHeader />
      
     
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;
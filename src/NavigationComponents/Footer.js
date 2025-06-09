import { Mail, Phone, MapPin } from "lucide-react";
import ProjectName from "./ProjectName";

function Footer(){
  return (
    <footer className="bg-[#0B0B2B] text-white py-12 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        <div className="text-left">
          <ProjectName />
          <p className="text-gray-300 my-4" >
            Empowering innovators and connecting them with supporters worldwide.
            Together, we're building the future one project at a time.
          </p>
          <div className="flex space-x-4 text-gray-400 text-xl">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin-in"></i>
          </div>
        </div>

        <div className="text-left">
          <h3 className="font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>How it Works</li>
            <li>Start a Project</li>
            <li>Browse Projects</li>
            <li>Success Stories</li>
            <li>Help Center</li>
          </ul>
        </div>

        <div className="text-left">
          <h3 className="font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-gray-300">
            <li>FAQ</li>
            <li>Trust & Safety</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>

        <div className="text-left">
          <h3 className="font-semibold text-white mb-4">Contact Us</h3>
          <div className="space-y-3 text-gray-300">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> support@fundme.com
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +1 (555) 123-4567
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> San Francisco, CA
            </p>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-700" />

      <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
        <p>&copy; 2024 FundMe. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#">Accessibility</a>
          <a href="#">Careers</a>
          <a href="#">Press</a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
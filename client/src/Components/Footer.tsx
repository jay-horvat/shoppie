import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">About Us</h2>
            <p className="text-gray-400">
              We’re committed to providing you with the best products and services.
              Our goal is to help you find what you need effortlessly.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white">About</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-400">123 Tailwind Ave, Suite 100</p>
            <p className="text-gray-400">Somewhere, World 12345</p>
            <p className="text-gray-400">Email: contact@yourdomain.com</p>
            <p className="text-gray-400">Phone: +123 456 7890</p>
          </div>
        </div>

        {/* Social Icons & Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center md:text-left">
          <div className="flex justify-center md:justify-start space-x-6 mb-4">
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin"></i></a>
          </div>
          <p className="text-gray-400">© 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>

  );
};

export default Footer;

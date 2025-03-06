import React, { useState } from 'react';

const AboutHelp = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const faqs = [
    {
      question: "How do I report a lost item?",
      answer: "You can report a lost item by navigating to the \"Report Lost Item\" page, filling in the required details, and submitting the form. Make sure to include a detailed description to increase the chances of finding your item."
    },
    {
      question: "How do I search for a found item?",
      answer: "To search for a found item, go to the \"View Found Items\" page and use the search filters to look for items that match your description."
    },
    {
      question: "How can I claim a found item?",
      answer: "When you find an item that matches your lost item's description, you can click on the \"Claim\" button to initiate the claiming process."
    },
    {
      question: "Who can I contact for further assistance?",
      answer: "You can contact our support team via email at support@lostfoundtracker.com for any additional help or questions."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden p-8">
        {/* Header */}
        <div className="bg-[#018C79] text-white p-6 -mx-8 -mt-8 mb-6 rounded-t-2xl">
          <h1 className="text-3xl font-bold mb-2">About Lost & Found Tracker</h1>
        </div>

        {/* Application Description */}
        <p className="text-gray-700 mb-6 leading-relaxed">
          The Lost & Found Tracker is a web application designed to help users report lost items, search for found items, and manage notifications and settings related to their lost items. Our goal is to simplify the process of finding lost belongings and provide a platform for users to connect with others who may have found their lost items.
        </p>

        {/* FAQs Section */}
        <h2 className="text-2xl font-semibold text-[#018C79] mb-4 border-b-2 border-[#018C79] pb-2">
          Frequently Asked Questions (FAQs)
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button 
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <span className="text-left font-medium text-[#018C79]">
                  {faq.question}
                </span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-6 w-6 transform transition-transform text-[#018C79] ${
                    openAccordion === index ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openAccordion === index && (
                <div className="p-4 bg-white text-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[#018C79] mb-4 border-b-2 border-[#018C79] pb-2">
            Contact Us
          </h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#018C79]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="font-medium text-[#018C79]">Email</p>
                <p className="text-gray-700">support@lostfoundtracker.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#018C79]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h3m-3-9a9 9 0 01-9 9m9-9a9 9 0 00-9 9m0 0c0 3.042 1.135 5.824 3 7.938" />
              </svg>
              <div>
                <p className="font-medium text-[#018C79]">Phone</p>
                <p className="text-gray-700">+1 (234) 567-8900</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHelp;
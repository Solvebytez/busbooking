import Link from "next/link";
import React from "react";

interface AboutFooterSection {
    title: string;
    links: string[];
  }
  
  const footerSections: AboutFooterSection[] = [
    {
      title: "PRODUCT OFFERING",
      links: [
        "Flights", "International Flights", "Charter Flights", "Hotels", "International Hotels", 
        "Homestays and Villas", "Activities", "Holidays in India", "International Holidays", 
        "Book Hotels From UAE", "myBiz for Corporate Travel", "Book Online Cabs", 
        "Book Bus Tickets", "Book Train Tickets", "Cheap Tickets to India", "Book Flights From US",
        "Book Flights From UAE", "Trip Planner", "Gift Cards", "Trip Money", "Trip Ideas", 
        "Travel Blog", "PNR Status", "MakeMyTrip Advertising Solutions", "One Way Cab"
      ]
    },
    {
      title: "MAKEMYTRIP",
      links: [
        "About Us", "Investor Relations", "Careers", "MMT Foundation", "CSR Policy", 
        "myPartner - Travel Agent Portal", "Foreign Exchange", "List your hotel", 
        "Partners- Redbus", "Partners- Goibibo", "Advertise with Us"
      ]
    },
    {
      title: "ABOUT THE SITE",
      links: [
        "Customer Support", "Payment Security", "Privacy Policy", "User Agreement", 
        "Terms of Service", "More Offices", "Make A Payment", "Work From Home"
      ]
    },
    {
      title: "QUICK LINKS",
      links: [
        "Delhi Chennai Flights", "Delhi Mumbai Flights", "Delhi Goa Flights", 
        "Chennai Mumbai Flights", "Mumbai Hyderabad Flights", "Kolkata to Rupsi Flights",
        "Rupsi to Guwahati Flights", "Pasighat to Guwahati Flights", "Delhi to Khajuraho Flights",
        "Cochin to Agatti Island Flights", "Hotels in Delhi", "Hotels in Mumbai", 
        "Hotels in Goa", "Hotels in Jaipur", "Hotels in Ooty", "Hotels in Udaipur",
        "Hotels in Puri", "Hotels in North Goa", "Hotels in Rishikesh", "Honeymoon Packages",
        "Kerala Packages", "Kashmir Packages", "Ladakh Packages", "Goa Packages", 
        "Thailand Packages", "Sri Lanka Visa", "Thailand Visa", "Explore Goa", 
        "Explore Manali", "Explore Shimla", "Explore Jaipur", "Explore Srinagar"
      ]
    },
    {
      title: "IMPORTANT LINKS",
      links: [
        "Cheap Flights", "Flight Status", "Kumbh Mela", "Domestic Airlines", 
        "International Airlines", "Indigo", "SpiceJet", "GoAir", "Air Asia", "Air India",
        "Indian Railways", "Trip Ideas", "Beaches", "Honeymoon Destinations", 
        "Romantic Destinations", "Popular Destinations", "Resorts In Udaipur", 
        "Resorts In Munnar", "Villas In Lonavala", "Hotels in Thailand", "Villas In Goa",
        "Domestic Flight Offers", "International Flight Offers", "UAE Flight Offers",
        "USA", "UAE", "Saudi Arabia", "UK", "Oman"
      ]
    },
    {
      title: "CORPORATE TRAVEL",
      links: [
        "Corporate Travel", "Corporate Hotel Booking", "Corporate Flight Booking",
        "Business Travel for SME", "GST Invoice for International Flights",
        "Business Travel Solutions", "GST Invoice for Bus", "Corporate Bus booking",
        "myBiz - Best Business Travel Platform", "GST Invoice for Flights",
        "GST Invoice for Corporate Travel", "GST Invoice for Hotels",
        "myBiz for Small Business", "Free cancellation on International Flights"
      ]
    }
  ];
  
  export default function AboutFooter() {
    return (
      <footer className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {footerSections.map((section) => (
            <div key={section.title} className="mb-8">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">
                {section.title}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {section.links.map((link, index) => (
                  <React.Fragment key={link}>
                    <Link
                      href="#"
                      className="hover:text-gray-900 hover:underline"
                    
                    >
                      {link}
                    </Link>
                    {index < section.links.length - 1 && (
                      <span className="text-gray-400 mx-1">|</span>
                    )}
                  </React.Fragment>
                ))}
              </p>
            </div>
          ))}
        </div>
      </footer>
    );
  }
  
  
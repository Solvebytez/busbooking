import React from "react";
import LeadershipSection from "./Leaders";
import BreadcumBanner from "@/components/Global/BreadcumBanner";
import FootprintSection from "./OurFootprint";
import CultureSection from "./CultureSection";
import AchievementsSection from "./Achievements-section";
import AboutFooter from "./AboutFooter";

const AboutPage = () => {
  return (
    <div>
      <BreadcumBanner
        pageText={"About"}
        bgImage="https://imgak.mmtcdn.com/seo/cms-staticpages/sites/all/themes/custom/makemytrip/images/aboutus/topimg.jpg"
      />
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full">
          <h1 className="mb-8">
            <span className="block text-4xl font-normal text-gray-600">
              We are
            </span>
            <span className="block text-5xl font-bold text-gray-800">
            Sanchar6t
            </span>
          </h1>

          <div className="space-y-6 text-gray-600 text-lg">
            <p>
              Nurtured from the seed of a single idea &apos;to empower the
              traveller with easy & instant travel bookings providing
              comprehensive choices&apos;, MakeMyTrip is a pioneer in
              India&apos;s online travel space. Founded by Deep Kalra in the
              year 2000, MakeMyTrip began its journey by serving the US-India
              travel market with best-value products & services, powered by
              robust technology and round-the-clock customer support.
            </p>

            <p>
              After successfully consolidating its position as a customer-first
              brand, known for its reliability and transparency, MakeMyTrip
              launched its India operations in 2005.
            </p>

            <p>
              As low-cost flight carriers were introduced in India, the number
              of Indians opting for online travel solutions also increased
              rapidly. And MakeMyTrip answered the call of the hour, by bringing
              the convenience of booking flights, hotels, and holiday packages
              in just a few clicks.
            </p>

            <p>
              Over the years, we have partnered with many leading brands from
              the aviation & hospitality industries, creating fruitful partner
              relations for business expansion opportunities. We also entered
              the <span className="font-medium">homestays & villas</span> and
              continue to procure increased market share market in the same.
              With this, we also entered the ground transport space and
              commenced offering cab, bus & train booking services.
            </p>

            <p>
              What makes our story even stronger is the performance of our newly
              launched segments, like myBiz—our comprehensive business travel
              suite and myPartner—an exclusive platform for travel agents.
              Entering the Gulf market is our latest feat, where we offer
              power-packed deals on flights & hotels.
            </p>
          </div>
        </div>
      </section>
      <LeadershipSection />
      <FootprintSection />
      <AchievementsSection/>
      <CultureSection/>
      <AboutFooter/>
    </div>
  );
};

export default AboutPage;

interface Metric {
    value: string;
    label: string;
  }
  
  const metrics: Metric[] = [
    {
      value: "69 Mn.+",
      label: "Lifetime Transacted Users",
    },
    {
      value: "68 Mn.+",
      label: "Monthly Active Users",
    },
    {
      value: "420 Mn.+",
      label: "App Download",
    },
    {
      value: "3/10",
      label: "Domestic Flyers Book with Us",
    },
    {
      value: "2,000",
      label: "Cities Covered via Hotels",
    },
    {
      value: "1,250",
      label: "Cities Covered via Homestays",
    },
    {
      value: "202K",
      label: "Instagram Followers for MakeMyTrip",
    },
    {
      value: "85K",
      label: "Instagram Followers for Goibibo",
    },
  ];
  
  export default function FootprintSection() {
    return (
      <section className="relative bg-primary px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/4 -left-1/4 w-full h-full border-2 border-primary rounded-full opacity-20" />
          <div className="absolute -top-1/2 -left-1/2 w-[150%] h-[150%] border-2 border-primary rounded-full opacity-10" />
        </div>
  
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Footprint</h2>
            <p className="text-xl text-blue-100">
              The expanse of our business and customer reach
            </p>
          </div>
  
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center shadow-lg transform transition-transform hover:scale-105"
              >
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {metric.value}
                </div>
                <div className="text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  
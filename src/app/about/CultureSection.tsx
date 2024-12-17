import Image from "next/image";

interface CultureValue {
    title: string;
    description: string;
    image: string;
  }
  
  const values: CultureValue[] = [
    {
      title: "Curious",
      description: "We are inquisitive. We ask questions to absorb, reflect and solve.",
      image: "/placeholder.svg",
    },
    {
      title: "Creative",
      description: "We are inventive. We are experimental. We create innovative solutions bringing endless possibilities to our customers.",
      image: "/placeholder.svg",
    },
    {
      title: "Caring",
      description: "We help. We support. We are available to our users round-the-clock.",
      image: "/placeholder.svg",
    },
    {
      title: "Customer Focus",
      description: "We use the customer lens proactively to anticipate and understand their expectations and champion their interests.",
      image: "/placeholder.svg",
    },
    {
      title: "Commitment to Results",
      description: "We take complete ownership of every task at hand, to achieve superior results, in the face of all odds.",
      image: "/placeholder.svg",
    },
    {
      title: "Continuous Improvement",
      description: "We make endless efforts to enhance our products, services, and processes. We believe that incremental changes are the cornerstones of breakthrough innovations.",
      image: "/placeholder.svg",
    },
  ];
  
  export default function CultureSection() {
    return (
      <section className="max-w-7xl mx-auto px-4 pb-16 sm:px-6 lg:px-8 bg-transparent">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Culture</h2>
          <p className="text-xl text-gray-600">
            The 6 core values that we stand by, that make us who we are
          </p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-8 transform transition-transform hover:scale-105"
            >
              <div className="flex justify-center mb-6">
                <div className="w-48 h-48 bg-[#FFF5F1] rounded-full flex items-center justify-center">
                  <Image
                    src={value.image}
                    alt=""
                    className="w-32 h-32 object-contain"
                    aria-hidden="true"
                    width={300}
                    height={300}
                  />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 text-center mb-4">
                {value.title}
              </h3>
              <p className="text-gray-600 text-center">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  
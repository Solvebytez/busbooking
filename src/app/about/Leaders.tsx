import Image from "next/image";

interface Leader {
    name: string;
    role: string;
    image: string;
  }
  
  const leaders: Leader[] = [
    {
      name: "Deep Kalra",
      role: "Founder & Chairman",
      image: "placeholder.svg",
    },
    {
      name: "Rajesh Magow",
      role: "Co-Founder & Group CEO",
      image: "placeholder.svg",
    },
    {
      name: "Sanjay Mohan",
      role: "Group Chief Technology Officer",
      image: "placeholder.svg",
    },
    {
      name: "Mohit Kabra",
      role: "Group Chief Financial Officer",
      image: "placeholder.svg",
    },
  ];
  
  export default function LeadershipSection() {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Leaders</h2>
          <p className="text-xl text-gray-600 mb-4">
            The thought pioneers that inspire & shape us
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Get to know the members of our leadership team. Their deep insights and
            decades of unparalleled market expertise set us apart from the
            competition and help us in providing our customers with super-smooth
            travel booking experiences.
          </p>
        </div>
  
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {leaders.map((leader) => (
            <div key={leader.name} className="text-center">
              <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover"
                  width={300}
                  height={300}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {leader.name}
              </h3>
              <p className="text-gray-600">{leader.role}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  
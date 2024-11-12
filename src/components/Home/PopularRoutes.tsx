'use client'
import Image from "next/image";
import Conatiner from "../Global/Conatiner";
const routes = [
    { title: 'Hyderabad - Visakhapatnam', imageUrl: 'https://busbooking.one67.in/public/frontend/images/route2.jpg' },
    { title: 'Tirupati - Chennai', imageUrl: 'https://busbooking.one67.in/public/frontend/images/route3.jpg' },
    { title: 'Hyderabad - Tirupati', imageUrl: 'https://busbooking.one67.in/public/frontend/images/route4.jpg' },
    { title: 'Bangalore - Tirupati', imageUrl: 'https://busbooking.one67.in/public/frontend/images/route5.jpg' },
    { title: 'Hyderabad - Nellore', imageUrl: 'https://busbooking.one67.in/public/frontend/images/route6.jpg' },
    { title: 'Hyderabad - Ongole', imageUrl: 'https://busbooking.one67.in/public/frontend/images/route7.jpg' },
    { title: 'Vijayawada - Tirupati', imageUrl: 'https://busbooking.one67.in/public/frontend/images/route8.jpg' },
    { title: 'Vijayawada - Hyderabad', imageUrl: 'https://busbooking.one67.in/public/frontend/images/route9.jpg' },
    { title: 'Vijayawada - Bangalore', imageUrl: 'https://busbooking.one67.in/public/frontend/images/route10.jpg' },
    { title: 'Visakhapatnam - Hyderabad', imageUrl: 'https://busbooking.one67.in/public/frontend/images/route11.jpg' },
    { title: 'Nellore - Bangalore', imageUrl: 'https://busbooking.one67.in/public/frontend/images/route12.jpg' },
    { title: 'Chennai - Tirupati', imageUrl: 'https://busbooking.one67.in/public/frontend/images/route13.jpg' },
    { title: 'Bangalore - Vijayawada', imageUrl: 'https://busbooking.one67.in/public/frontend/images/route1.jpg' },
    { title: 'Tirupati - Hyderabad', imageUrl: 'https://busbooking.one67.in/public/frontend/images/route10.jpg' },
    { title: 'Tirupati - Bangalore', imageUrl: 'https://busbooking.one67.in/public/frontend/images/route7.jpg' },
  ];

const PopularRoutes = () => {
  return (
    <Conatiner>
        <div className="mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6">Popular <span className="text-red-500 font-bold">Routes</span></h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {routes.map((route, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg group h-[10rem] w-[15rem]"
          >
            <Image
            fill
              src={route.imageUrl}
              alt={route.title}
              className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white p-2 text-center">
              <p className="text-sm font-medium">{route.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Conatiner>
  )
}

export default PopularRoutes
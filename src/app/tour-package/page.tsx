import Conatiner from "@/components/Global/Conatiner";
import Image from "next/image";

const travelPackages = [
  {
    id: 1,
    title: "From Bengaluru (BNG) To Jog Falls Packages (JFLPKG)",
    packageCode: "2230BNGJFLPKG",
    type: "NON AC SLEEPER",
    image:
      "https://images.pexels.com/photos/15021282/pexels-photo-15021282/free-photo-of-bangalore-palace-in-bangalore-india.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    departureInfo: {
      date: "Day 1 (Night journey), 22:30",
      breakfastTime: "07:00-07:15",
    },
    returnInfo: {
      from: "22:00 Night from Sagar",
      lunchTime: "12:45 - 13:15",
    },
    arrivalInfo: {
      date: "Day3 (morning), 5:00",
      dinnerTime: "19:00-20:00",
    },
    hotel: "Day 2 Sagar (05:30)",
    kannadaDescription:
      "ಬೆಂಗಳೂರಿನಿಂದ ರಾತ್ರಿ 22:30ಕ್ಕೆ ಹೊರಟು ಎರಡನೇ ದಿನ (ಮಾರನೇ ದಿನ) ಬೆಳಿಗ್ಗೆ 05:30ಕ್ಕೆ ಸಾಗರಕ್ಕೆ ತಲುಪುವುದು. ಸಾಗರದ ಸ್ಥಳೀಯ ಹೋಟೆಲ್ ನಲ್ಲಿ ಫ್ರೆಶ್ ಅಪ್ ಹಾಗೂ ವಿಶ್ರಾಂತಿ 05:30 ರಿಂದ 07:00 ರವರೆಗೆ, ಉಪಹಾರ 07:00 ರಿಂದ 07:15, ವರದಹಳ್ಳಿ-07:30, ವರದಮೂಲ 09:00, ಜೊಗ್ಗಳ್ಳಿ 09:30, ಕೈಗ 11:00, ಸಾಗರದಲ್ಲಿ ಮಧ್ಯಾಹ್ನದ ಊಟ 12:45 ರಿಂದ 13:15, ಜೋಗಕ್ಕೆ 14:15, ಬಾಪೂಜಿ ಸಾಗರಕ್ಕೆ, ಬಂದು ಶಾಪಿಂಗ್ ಗೆ ಅವಕಾಶ 19:00 ರಿಂದ 20:00, ರಾತ್ರಿ ಊಟ 20:30, ಸಾಗರದಿಂದ ರಾತ್ರಿ 22:00 ಕ್ಕೆ ಹೊರಟು ಮೂರನೇ ದಿನ ಬೆಳಿಗ್ಗೆ 05:00 ಕ್ಕೆ ಬೆಂಗಳೂರಿಗೆ ಬರುವುದು.",
  },
  {
    id: 2,
    title: "From Mysuru (MYS) To Coorg Packages (CRGPKG)",
    packageCode: "1830MYSCRGPKG",
    type: "AC SLEEPER",
    image:
      "https://images.pexels.com/photos/3581916/pexels-photo-3581916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    departureInfo: {
      date: "Day 1 (Evening), 18:30",
      breakfastTime: "06:30-07:00",
    },
    returnInfo: {
      from: "21:00 Night from Madikeri",
      lunchTime: "13:00 - 13:30",
    },
    arrivalInfo: {
      date: "Day3 (morning), 6:00",
      dinnerTime: "20:00-21:00",
    },
    hotel: "Day 2 Madikeri (06:00)",
    kannadaDescription:
      "ಮೈಸೂರಿನಿಂದ ಸಂಜೆ 18:30ಕ್ಕೆ ಹೊರಟು ಎರಡನೇ ದಿನ ಬೆಳಿಗ್ಗೆ 06:00ಕ್ಕೆ ಮಡಿಕೇರಿಗೆ ತಲುಪುವುದು. ಮಡಿಕೇರಿಯ ಸ್ಥಳೀಯ ಹೋಟೆಲ್ ನಲ್ಲಿ ಫ್ರೆಶ್ ಅಪ್ ಹಾಗೂ ವಿಶ್ರಾಂತಿ 06:00 ರಿಂದ 07:30 ರವರೆಗೆ, ಉಪಹಾರ 06:30 ರಿಂದ 07:00, ರಾಜಾ ಸೀಟ್-08:00, ಅಬ್ಬಿ ಜಲಪಾತ 10:00, ದುಬಾರೆ ಆನೆ ಕ್ಯಾಂಪ್ 11:30, ಮಡಿಕೇರಿಯಲ್ಲಿ ಮಧ್ಯಾಹ್ನದ ಊಟ 13:00 ರಿಂದ 13:30, ತಳಕಾವೇರಿ 15:00, ಗೋಲ್ಡನ್ ಟೆಂಪಲ್ 17:00, ಮಡಿಕೇರಿಗೆ ಬಂದು ಶಾಪಿಂಗ್ ಗೆ ಅವಕಾಶ 18:30 ರಿಂದ 19:30, ರಾತ್ರಿ ಊಟ 20:00, ಮಡಿಕೇರಿಯಿಂದ ರಾತ್ರಿ 21:00 ಕ್ಕೆ ಹೊರಟು ಮೂರನೇ ದಿನ ಬೆಳಿಗ್ಗೆ 06:00 ಕ್ಕೆ ಮೈಸೂರಿಗೆ ಬರುವುದು.",
  },
  {
    id: 3,
    title: "From Mangaluru (MNG) To Gokarna Packages (GKRPKG)",
    packageCode: "2030MNGGKRPKG",
    type: "SEMI SLEEPER",
    image:
      "https://images.pexels.com/photos/12519526/pexels-photo-12519526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    departureInfo: {
      date: "Day 1 (Night), 20:30",
      breakfastTime: "07:30-08:00",
    },
    returnInfo: {
      from: "23:00 Night from Gokarna",
      lunchTime: "13:30 - 14:00",
    },
    arrivalInfo: {
      date: "Day3 (morning), 5:30",
      dinnerTime: "19:30-20:30",
    },
    hotel: "Day 2 Gokarna (06:30)",
    kannadaDescription:
      "ಮಂಗಳೂರಿನಿಂದ ರಾತ್ರಿ 20:30ಕ್ಕೆ ಹೊರಟು ಎರಡನೇ ದಿನ ಬೆಳಿಗ್ಗೆ 06:30ಕ್ಕೆ ಗೋಕರ್ಣಕ್ಕೆ ತಲುಪುವುದು. ಗೋಕರ್ಣದ ಸ್ಥಳೀಯ ಹೋಟೆಲ್ ನಲ್ಲಿ ಫ್ರೆಶ್ ಅಪ್ ಹಾಗೂ ವಿಶ್ರಾಂತಿ 06:30 ರಿಂದ 08:00 ರವರೆಗೆ, ಉಪಹಾರ 07:30 ರಿಂದ 08:00, ಓಂ ಬೀಚ್-09:00, ಕುಡಲೆ ಬೀಚ್ 11:00, ಹಾಫ್ ಮೂನ್ ಬೀಚ್ 12:30, ಗೋಕರ್ಣದಲ್ಲಿ ಮಧ್ಯಾಹ್ನದ ಊಟ 13:30 ರಿಂದ 14:00, ಮಹಾಬಲೇಶ್ವರ ದೇವಾಲಯ 15:30, ಪಾರಡೈಸ್ ಬೀಚ್ 17:00, ಗೋಕರ್ಣಕ್ಕೆ ಬಂದು ಶಾಪಿಂಗ್ ಗೆ ಅವಕಾಶ 18:30 ರಿಂದ 19:30, ರಾತ್ರಿ ಊಟ 19:30, ಗೋಕರ್ಣದಿಂದ ರಾತ್ರಿ 23:00 ಕ್ಕೆ ಹೊರಟು ಮೂರನೇ ದಿನ ಬೆಳಿಗ್ಗೆ 05:30 ಕ್ಕೆ ಮಂಗಳೂರಿಗೆ ಬರುವುದು.",
  },
];

const TourPackagePage = () => {
  return (
    <Conatiner className="h-full mx-auto w-full max-w-screen-2xl px-2.5 md:px-20">
      <div className="relative min-h-[300px]">
        {travelPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="relative p-0 text-white flex gap-4 bg-white rounded-lg shadow-lg overflow-hidden my-8"
          >
            <div className="relative h-[313px] w-[30%]">
              <Image
                alt={pkg.title}
                fill
                className="object-cover rounded-md"
                src={pkg.image}
              />
            </div>
            <div className="flex-1 p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h1 className="text-2xl font-bold text-orange-400 md:text-xl">
                  {pkg.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-xl font-semibold text-black/85">
                    {pkg.packageCode}
                  </span>
                  <span className="rounded-full bg-orange-500/20 px-4 py-1 text-orange-400">
                    {pkg.type}
                  </span>
                </div>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-4">
                <div className="">
                  <h2 className="text-[16px] font-bold text-secondary/85 bg-secondary/5 rounded-full text-center py-1">
                    Departing on
                  </h2>
                  <p className="text-black/85 font-semibold text-sm text-center mt-1">
                    {pkg.departureInfo.date}
                  </p>
                  <div className="mt-8">
                    <h3 className="text-[16px] font-bold text-secondary/85 bg-secondary/5 rounded-full text-center py-1">
                      Breakfast Time
                    </h3>
                    <p className="text-black/85 font-semibold text-sm text-center mt-1">
                      {pkg.departureInfo.breakfastTime}
                    </p>
                  </div>
                </div>

                <div className="">
                  <h2 className="text-[16px] font-bold text-secondary/85 bg-secondary/5 rounded-full text-center py-1">
                    Returning from
                  </h2>
                  <p className="text-black/85 font-semibold text-sm text-center mt-1">
                    {pkg.returnInfo.from}
                  </p>
                  <div className="mt-8">
                    <h3 className="text-[16px] font-bold text-secondary/85 bg-secondary/5 rounded-full text-center py-1">
                      Lunch Time
                    </h3>
                    <p className="text-black/85 font-semibold text-sm text-center mt-1">
                      {pkg.returnInfo.lunchTime}
                    </p>
                  </div>
                </div>

                <div className="">
                  <h2 className="text-[16px] font-bold text-secondary/85 bg-secondary/5 rounded-full text-center py-1">
                    Returning on
                  </h2>
                  <p className="text-black/85 font-semibold text-sm text-center mt-1">
                    {pkg.arrivalInfo.date}
                  </p>
                  <div className="mt-8">
                    <h3 className="text-[16px] font-bold text-secondary/85 bg-secondary/5 rounded-full text-center py-1">
                      Dinner Time
                    </h3>
                    <p className="text-black/85 font-semibold text-sm text-center mt-1">
                      {pkg.arrivalInfo.dinnerTime}
                    </p>
                  </div>
                </div>
                <div className="">
                  <h2 className="text-[16px] font-bold text-secondary/85 bg-secondary/5 rounded-full text-center py-1">
                    Hotel
                  </h2>
                  <p className="text-black/85 font-semibold text-sm text-center mt-1">
                    {pkg.hotel}
                  </p>
                  <div className="mt-8">
                    <button className="rounded-lg bg-orange-500 px-6 py-2 font-medium text-white transition-colors hover:bg-orange-600 w-full">
                      Select Date
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-sm text-black">
                <p className="font-kannada">{pkg.kannadaDescription}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Conatiner>
  );
};

export default TourPackagePage;

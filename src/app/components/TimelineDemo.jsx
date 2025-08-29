import React from "react";
import { Timeline } from "./ui/timeline";
import { CheckCircle } from "lucide-react";

const TimelineDemo = () => {
  const data = [
    {
      title: "Early 2023",
      content: (
        <div className="">
          <p className="text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Launched Zeus Airline with our first international routes and a state-of-the-art fleet, delivering unparalleled travel experiences.
          </p>
          <p className="text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Partnered with top travel brands to offer exclusive vacation packages for Zeus Airline customers.
          </p>
          <p className="text-xs mb-10 font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Opened a state-of-the-art training academy for pilots and crew, ensuring world-class service standards.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://cdn.pixabay.com/photo/2021/12/13/07/06/airplane-6867678_960_720.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://cdn.pixabay.com/photo/2019/06/02/00/36/plane-4245416_640.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://cdn.pixabay.com/photo/2017/06/24/20/39/aircraft-2438799_640.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://cdn.pixabay.com/photo/2015/04/02/15/35/aircraft-703908_640.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <p className="text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Founded Zeus Airline with a vision to redefine air travel through innovation, affordability, and customer-first service.
          </p>
          <p className="text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Introduced our eco-friendly fleet and launched domestic routes, earning recognition for safety and comfort.
          </p>
          <p className="mb-10 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Unveiled the Zeus Sky Lounge, offering exclusive amenities at major airports for premium passengers.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://cdn.pixabay.com/photo/2017/03/10/12/16/airbus-2132610_640.jpg"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://cdn.pixabay.com/photo/2015/07/30/13/54/emirates-867773_640.jpg"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://cdn.pixabay.com/photo/2013/02/26/22/29/airbus-86445_640.jpg"
              alt="bento template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://cdn.pixabay.com/photo/2013/12/10/16/03/aircraft-226466_640.jpg"
              alt="cards template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Expanded our global reach with new routes and enhanced in-flight services for an unmatched travel experience.
          </p>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Launched routes to 20 new international destinations
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Introduced premium in-flight entertainment system
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Partnered with eco-friendly fuel suppliers
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Rolled out Zeus Loyalty Program for frequent flyers
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Opened new customer support centers worldwide
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://cdn.pixabay.com/photo/2019/11/03/09/35/cockpit-4598188_1280.jpg"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://cdn.pixabay.com/photo/2020/05/25/17/03/merry-christmas-5219496_960_720.jpg"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://cdn.pixabay.com/photo/2019/09/30/18/11/flight-4516478_1280.jpg"
              alt="bento template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://cdn.pixabay.com/photo/2021/03/26/13/40/airplane-6125969_640.jpg"
              alt="cards template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}

export default TimelineDemo
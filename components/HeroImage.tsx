"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";

interface HeroImageProps {
  currentMonth: Date;
}

export function HeroImage({ currentMonth }: HeroImageProps) {
  // Array of premium unsplash images mapped to each month for dynamic feel
  const MONTH_IMAGES = [
    "https://images.unsplash.com/photo-1445548671936-3a595f543e3f?q=80&w=800&auto=format&fit=crop", // Jan - Snow
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop", // Feb - Beach
    "https://images.unsplash.com/photo-1490750967868-88cb4ecb07cb?q=80&w=800&auto=format&fit=crop", // Mar - Spring
    "https://images.unsplash.com/photo-1463947628408-f8581a2f4aca?q=80&w=800&auto=format&fit=crop", // Apr - Showers
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=800&auto=format&fit=crop", // May - Forest
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", // Jun - Summer
    "https://images.unsplash.com/photo-1506526613346-608149ebaa68?q=80&w=800&auto=format&fit=crop", // Jul - Ocean
    "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=800&auto=format&fit=crop", // Aug - Warm Beach
    "https://images.unsplash.com/photo-1445264718234-a623be589d37?q=80&w=800&auto=format&fit=crop", // Sep - Autumn Leave
    "https://images.unsplash.com/photo-1509023464722-18d996393ca8?q=80&w=800&auto=format&fit=crop", // Oct - Halloween
    "https://images.unsplash.com/photo-1444837881208-4d46f5ba328c?q=80&w=800&auto=format&fit=crop", // Nov - Moody landscape
    "https://images.unsplash.com/photo-1543833215-d72b220371be?q=80&w=800&auto=format&fit=crop", // Dec - Winter Cabin
  ];

  const monthIndex = currentMonth.getMonth();
  const imageUrl = MONTH_IMAGES[monthIndex];

  return (
    <div className="relative w-full h-48 md:h-[400px] lg:h-full rounded-3xl overflow-hidden shadow-sm group">
      <motion.img
        key={imageUrl}
        src={imageUrl}
        alt={`${format(currentMonth, "MMMM")} theme`}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8">
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.3 }}
        >
          <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight">
            {format(currentMonth, "MMMM")}
          </h2>
          <p className="text-white/90 mt-1 md:mt-2 text-base md:text-xl font-medium tracking-wide">
            {format(currentMonth, "yyyy")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

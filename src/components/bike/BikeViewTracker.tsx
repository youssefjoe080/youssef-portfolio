"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

export function BikeViewTracker({ bikeId, bikeCode }: { bikeId: string; bikeCode: string }) {
  useEffect(() => {
    track("bike_view", { bikeId, bikeCode });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bikeId]);

  return null;
}

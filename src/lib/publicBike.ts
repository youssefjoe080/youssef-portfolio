import type { BikeImage, Motorcycle } from "@prisma/client";

export type BikeWithImages = Motorcycle & { images: BikeImage[] };

/** Strips seller-private fields. Always use this before sending bike data to
 * the client — either via a public API response or as props into a "use client"
 * component (Server Component props are serialized into the browser payload). */
export function toPublicBike<T extends Motorcycle>(bike: T) {
  const { ownerName: _ownerName, ownerPhone: _ownerPhone, ...publicBike } = bike;
  return publicBike;
}

export type PublicBike = ReturnType<typeof toPublicBike>;

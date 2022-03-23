import { CoffeeStore } from "../models/coffee-store";

const getUrlForCoffeeStores = (latLong: string, query: string, limit: string) => {
  return `
    https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}
  `;
};

export const fetchCoffeeStores = async () => {
  const response = await fetch(getUrlForCoffeeStores("-6.596211761550628,106.80527934402286", "coffee", "6"), {
    headers: new Headers({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY!,
    }),
  });
  const data = await response.json();

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?.results?.map((venue: any) => {
      const coffeeStore: CoffeeStore = {
        address: venue.location.address,
        name: venue.name,
        id: venue.fsq_id,
        imgUrl: "",
        neighbourhood: venue.location.neighborhood || "",
        websiteUrl: "",
      };
      return coffeeStore;
    }) || []
  );
};

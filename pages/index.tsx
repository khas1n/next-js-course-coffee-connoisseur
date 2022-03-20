import type { GetStaticProps, NextPage } from "next";
import HomePage from "../components/HomePage";
import { CoffeeStore } from "../models/coffee-store";
import coffeeStoreData from "../data/coffee-stores.json";

export const getStaticProps: GetStaticProps = async () => {
  const coffeeStores = coffeeStoreData;
  return {
    props: {
      coffeeStores,
    }, // will be passed to the page component as props
  };
};

interface HomeProps {
  coffeeStores: CoffeeStore[];
}

const Home: NextPage<HomeProps> = ({ coffeeStores }) => {
  return (
    <>
      <HomePage coffeeStoreData={coffeeStores} />
    </>
  );
};

export default Home;

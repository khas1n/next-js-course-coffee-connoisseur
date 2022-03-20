import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import CoffeeStorePage from "../../components/CoffeeStorePage";
import { CoffeeStore as CoffeeStoreModel } from "../../models/coffee-store";

import coffeeStoreData from "../../data/coffee-stores.json";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  id: string;
}

interface CoffeeStoreProps {
  coffeeStore: CoffeeStoreModel;
}

export const getStaticProps: GetStaticProps<CoffeeStoreProps, Params> = async (context) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const params = context.params!; // ! is a non-null assertion
  const id = +params.id;
  console.log("id: ", id);
  const coffeeStore = coffeeStoreData.find((coffeStore: CoffeeStoreModel) => coffeStore.id === +id);
  if (!coffeeStore) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      coffeeStore: coffeeStore,
    }, // will be passed to the page component as props
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = coffeeStoreData.map((coffeeStore) => ({
    params: {
      id: coffeeStore.id.toString(),
    },
  }));
  return {
    paths,
    fallback: true,
  };
};

const CoffeeStore: NextPage<CoffeeStoreProps> = ({ coffeeStore }) => {
  return <CoffeeStorePage coffeeStoreDetailData={coffeeStore} />;
};

export default CoffeeStore;

import type { NextPage } from "next";
import Head from "next/head";
import Card from "../Card/Card";
import styles from "../HomePage/HomePage.module.scss";
import Banner from "./Banner/Banner";
import coffeeStoreData from "../../data/coffee-stores.json";
import { CoffeeStore } from "../../models/coffee-store";

const Home: NextPage = () => {
  const handleOnBannerBtnClick = () => {
    console.log("Hi banner Button");
  };
  const coffeeStores: CoffeeStore[] = coffeeStoreData;
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner handleOnClick={handleOnBannerBtnClick} buttonText="View stores nearby" />
        <div className={styles.cardLayout}>
          {coffeeStores.map((coffeeStore) => (
            <Card
              name={coffeeStore.name}
              href={`/coffee-store/${coffeeStore.id}`}
              imgUrl={coffeeStore.imgUrl}
              className={styles.card}
              key={coffeeStore.id}
            />
          ))}
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;

import Head from "next/head";
import Card from "../Card";
import styles from "../HomePage/HomePage.module.scss";
import Banner from "./Banner";
import { CoffeeStore } from "../../models/coffee-store";

interface HomePageProps {
  coffeeStoreData: CoffeeStore[];
}

const HomePage: React.FC<HomePageProps> = ({ coffeeStoreData }) => {
  const handleOnBannerBtnClick = () => {
    console.log("Hi banner Button");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner handleOnClick={handleOnBannerBtnClick} buttonText="View stores nearby" />

        {coffeeStoreData.length && (
          <>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {coffeeStoreData.map((coffeeStore) => (
                <Card
                  name={coffeeStore.name}
                  href={`/coffee-store/${coffeeStore.id}`}
                  imgUrl={coffeeStore.imgUrl}
                  className={styles.card}
                  key={coffeeStore.id}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default HomePage;

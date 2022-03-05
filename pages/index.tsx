import type { NextPage } from "next";
import Head from "next/head";
import Banner from "../components/Banner";
import styles from "../scss/Home.module.scss";

const Home: NextPage = () => {
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
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;

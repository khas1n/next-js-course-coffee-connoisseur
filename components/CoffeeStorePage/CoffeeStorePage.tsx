import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import cls from "classnames";

import { CoffeeStore } from "../../models/coffee-store";
import styles from "./CoffeeStorePage.module.scss";
import { useContext, useEffect, useState } from "react";
import { isEmpty } from "../../utils";
import { StoreContext } from "../../store/store-context";

interface CoffeeStoreProps {
  coffeeStoreDetailData: CoffeeStore;
}

const CoffeeStorePage: React.FC<CoffeeStoreProps> = ({ coffeeStoreDetailData }) => {
  const router = useRouter();
  const {
    state: { coffeeStores },
  } = useContext(StoreContext);
  const id = router.query.id as string;

  const [coffeeStore, setCoffeeStore] = useState<CoffeeStore>(coffeeStoreDetailData || {});

  useEffect(() => {
    if (isEmpty(coffeeStoreDetailData)) {
      if (coffeeStores.length > 0) {
        const foundCoffeeStore = coffeeStores.find((coffeStore: CoffeeStore) => coffeStore.id.toString() === id);
        if (foundCoffeeStore) {
          setCoffeeStore(foundCoffeeStore);
        }
      }
    } else {
      setCoffeeStore(coffeeStoreDetailData);
    }
  }, [id, coffeeStoreDetailData, coffeeStores]);

  if (router.isFallback) {
    return <div>Loading Data</div>;
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { address, name, neighbourhood, imgUrl } = coffeeStore!;
  const handleUpvoteButton = () => {
    console.log("UPvote");
  };
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
        <meta name="description" content={`${name} coffee store`}></meta>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}></Image>
        </div>

        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/places.svg" width="24" height="24" alt="places icon" />
            <p className={styles.text}>{address}</p>
          </div>
          {neighbourhood && (
            <div className={styles.iconWrapper}>
              <Image src="/static/icons/nearMe.svg" width="24" height="24" alt="near me icon" />
              <p className={styles.text}>{neighbourhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width="24" height="24" alt="star icon" />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStorePage;

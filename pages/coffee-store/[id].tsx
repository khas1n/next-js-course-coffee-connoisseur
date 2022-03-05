import { useRouter } from "next/router";

const CoffeeStore: React.FC = () => {
  const router = useRouter();
  return <div>This is Coffee store {router.query.id}</div>;
};

export default CoffeeStore;

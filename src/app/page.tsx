import ShopNow from '../components/ShopNow';
import Logo from '../components/Logo';
import Arrivals from '../components/Arrivals';
import Selling from '../components/Selling';
import DressStyle from '../components/DressStyle';
import Customers from '../components/Customers';

export default function HomePage() {
  return (
    <>
      <ShopNow />
      <Logo />
      <Arrivals />
      <Selling />
      <DressStyle />
      <Customers />
    </>
  );
}

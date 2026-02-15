import { FiShoppingBag, FiTruck, FiUser } from "react-icons/fi";
import MenuItem from "./MenuItem";

const BuyerMenu = () => {
  return (
    <>
      <MenuItem icon={FiShoppingBag} label="My Orders" address="my-orders" />

      <MenuItem icon={FiUser} label="My Profile" address="profile" />
    </>
  );
};

export default BuyerMenu;

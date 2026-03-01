import { FiShoppingBag, FiUser, FiSettings, FiHome } from "react-icons/fi";
import MenuItem from "./MenuItem";

const BuyerMenu = () => {
  return (
    <>
      <MenuItem icon={FiHome} label="Overview" address="overview" />

      <MenuItem icon={FiShoppingBag} label="My Orders" address="my-orders" />

      <MenuItem icon={FiUser} label="My Profile" address="profile" />

      <MenuItem icon={FiSettings} label="Settings" address="settings" />
    </>
  );
};

export default BuyerMenu;

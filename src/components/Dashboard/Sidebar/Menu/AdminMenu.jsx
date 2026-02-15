import { FiUsers, FiPackage, FiShoppingCart } from "react-icons/fi";

import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FiUsers} label="Manage Users" address="manage-users" />

      <MenuItem icon={FiPackage} label="All Products" address="all-product" />

      <MenuItem icon={FiShoppingCart} label="All Orders" address="all-orders" />
    </>
  );
};

export default AdminMenu;

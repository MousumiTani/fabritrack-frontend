import {
  FiPlusSquare,
  FiEdit,
  FiClock,
  FiCheckCircle,
  FiUser,
} from "react-icons/fi";

import MenuItem from "./MenuItem";

const ManagerMenu = () => {
  return (
    <>
      <MenuItem icon={FiPlusSquare} label="Add Product" address="add-product" />

      <MenuItem
        icon={FiEdit}
        label="Manage Products"
        address="manage-products"
      />

      <MenuItem
        icon={FiClock}
        label="Pending Orders"
        address="pending-orders"
      />

      <MenuItem
        icon={FiCheckCircle}
        label="Approved Orders"
        address="approved-orders"
      />

      <MenuItem icon={FiUser} label="My Profile" address="profile" />
    </>
  );
};

export default ManagerMenu;

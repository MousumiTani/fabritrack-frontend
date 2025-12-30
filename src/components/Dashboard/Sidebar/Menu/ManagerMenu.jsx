import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "./MenuItem";
const ManagerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label="Add Product"
        address="add-product"
      />

      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Products"
        address="manage-products"
      />
      <MenuItem
        icon={BsFillHouseAddFill}
        label="Pending Orders"
        address="pending-orders"
      />
      <MenuItem
        icon={BsFillHouseAddFill}
        label="Approved Orders"
        address="approved-orders"
      />
    </>
  );
};

export default ManagerMenu;

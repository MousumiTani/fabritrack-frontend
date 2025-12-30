import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import MenuItem from "./MenuItem";

const BuyerMenu = () => {
  return (
    <>
      <MenuItem icon={BsFingerprint} label="My Orders" address="my-orders" />
      <MenuItem
        icon={BsFingerprint}
        label="Track Order"
        address="track-order"
      />
    </>
  );
};

export default BuyerMenu;

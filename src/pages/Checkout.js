import React from "react";
import CheckoutSummary from "../components/cart/CheckoutSummary";
import ShippingAddress from "../components/profile/address";
import { useSelector } from "react-redux";

import CartItems from "../components/cart/CartItems";

function Checkout() {

  const cartItems = useSelector((store) => store.cart.items);
  const selectedItems = cartItems
    ? cartItems.filter((item) => item.isSelected)
    : [];

  const addresses = useSelector((state) => state?.shippingAddresses?.addresses);
  const selectedAddressId = addresses.find((addr) => addr.selected)?.id || null;

    return (
      <div className="container mx-auto  bg-gray-100 min-h-screen">
        <div className="flex flex-col lg:flex-row justify-between items-start space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex flex-col w-full  lg:w-[70%]">
            <div className="w-full ">
              <ShippingAddress  />
            </div>
            <div className="w-full mt-5">
              <CartItems cartItems={selectedItems} isCheckingOut = {true}  />
            </div>
          </div>
          <div className="w-full lg:w-[30%]">
            <CheckoutSummary selectedAddress={selectedAddressId}  />
          </div>
        </div>
      </div>
    );
}

export default Checkout;

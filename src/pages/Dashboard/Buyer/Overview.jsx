import React from "react";

const Overview = () => {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard Overview</h1>
      <p>Welcome! Here’s a summary of your account and recent activity.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className=" shadow rounded p-4">Orders: 12</div>
        <div className=" shadow rounded p-4">Pending Shipments: 3</div>
        <div className="shadow rounded p-4">Wishlist Items: 7</div>
      </div>
    </section>
  );
};

export default Overview;

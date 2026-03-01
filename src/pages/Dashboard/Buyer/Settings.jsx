import React from "react";
import Button from "../../../components/Shared/Button";

const Settings = () => {
  return (
    <section className="p-6 max-w-md">
      <h1 className="text-2xl font-semibold mb-6">Account Settings</h1>

      <form className="space-y-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            placeholder="New password"
          />
        </div>

        <Button type="submit" variant="primary" size="md">
          Save Changes
        </Button>
      </form>
    </section>
  );
};

export default Settings;

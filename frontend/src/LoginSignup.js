import { act, useState } from "react";
import Tabs from "./Tabbar";
import Login from "./Login";
import Signup from "./Signup";

const LoginSignup = () => {
  const [activeTab, setActiveTab] = useState("signup");

  return (
    <div className="container">
      <h2>Book Tracker</h2>
      <Tabs activeTab={activeTab} onChange={setActiveTab} />
      <div>
        {activeTab === "login" && <Login />}
        {activeTab === "signup" && <Signup />}
      </div>
    </div>
  );
};

export default LoginSignup;

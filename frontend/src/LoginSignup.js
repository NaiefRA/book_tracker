import { useState } from "react";
import Tabs from "./Tabbar";
import Login from "./Login";
import Signup from "./Signup";

const LoginSignup = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="container">
      <h2>Book Tracker</h2>
      <Tabs activeTab={activeTab} onChange={setActiveTab} />
      <div>
        {activeTab === "login" && (
          <Login
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setMessage={setMessage}
          />
        )}
        {activeTab === "signup" && (
          <Signup
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setMessage={setMessage}
          />
        )}
      </div>
      <div style={{ color: "red" }}>{message}</div>
      <div>{isLoading && <div>...Loading</div>}</div>
    </div>
  );
};

export default LoginSignup;

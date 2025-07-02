import "./Tabs.css";

const tabItems = [
  { key: "signup", label: "Signup" },
  { key: "login", label: "Login" },
];

const Tabs = ({ activeTab, onChange }) => {
  return (
    <div className="tabbar">
      {tabItems.map((tab) => (
        <button
          key={tab.key}
          className={`tab-item ${activeTab === tab.key ? "active" : ""}`}
          onClick={() => onChange(tab.key)}
        >
          <span className="tab-text">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Tabs;

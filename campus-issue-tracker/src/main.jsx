import React from "react";
import ReactDOM from "react-dom/client";
import CampusIssueTrackerUI from "./CampusIssueTrackerUI.jsx";
import "./index.css"; // Tailwind + custom styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CampusIssueTrackerUI />
  </React.StrictMode>
);

import { useState } from "react";
import Toggle from "./Toggle";

function ToggleWrapper() {
  const [toggle, setToogle] = useState(false);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2 data-testid="toggle-text">{toggle ? "Yes" : "No"}</h2>
      <Toggle toggle={toggle} onToggle={() => setToogle(!toggle)} />
    </div>
  );
}
export default ToggleWrapper;

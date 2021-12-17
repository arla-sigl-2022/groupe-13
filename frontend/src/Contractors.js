import React from "react";
import { Comments } from "./Comments";

export function Contractors() {
  const [selectedContractor, setSelection] = React.useState("");
  const [contractors, setContractors] = React.useState([]);


  React.useEffect(() => {
    async function fetchContractors() {

      const apiResponse = await fetch(
        `${process.env.REACT_APP_API_HOST}/v1/contractor`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const document = await apiResponse.json();
      setContractors(document.contractors);
    }
    fetchContractors();
  }, []);

  return (
    <div className="contractors">
      <h1 className="contractors-title">Contractors</h1>
      <select
        className="contractors-select"
        value={selectedContractor}
        onChange={(e, d) => setSelection(e.target.value)}
      >
        <option value="-">{" - "}</option>
        {contractors.map((contractor, i) => (
          <option value={contractor.name} key={i}>
            {contractor.name}
          </option>
        ))}
      </select>
      <Comments contractor={selectedContractor} />
    </div>
  );
}

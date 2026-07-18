import { SiAuth0 } from "react-icons/si";

const CompanyLogo = ({ fontSize = "2rem" }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "0 1rem",
      }}
    >
      <SiAuth0 fontSize={fontSize} />
    </div>
  );
};

export default CompanyLogo;

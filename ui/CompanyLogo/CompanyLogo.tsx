import { SiAuth0 } from "react-icons/si";

const CompanyLogo = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <SiAuth0 fontSize={"2rem"} />
    </div>
  );
};

export default CompanyLogo;

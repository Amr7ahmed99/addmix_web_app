import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";


export default function SocialLinks() {
  return (
    <div className="d-flex justify-content-center gap-3">
      <a
        href="#1"
        className="btn btn-outline-light rounded-circle p-2"
        style={{
          width: "45px",
          height: "45px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.2)";
          e.target.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.1)";
          e.target.style.transform = "translateY(0)";
        }}
      >
        <FaFacebook size={20} className="text-white" />
      </a>
      <a
        href="#1"
        className="btn btn-outline-light rounded-circle p-2"
        style={{
          width: "45px",
          height: "45px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.2)";
          e.target.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.1)";
          e.target.style.transform = "translateY(0)";
        }}
      >
        <FaTwitter size={20} className="text-white" />
      </a>
      <a
        href="#1"
        className="btn btn-outline-light rounded-circle p-2"
        style={{
          width: "45px",
          height: "45px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.2)";
          e.target.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.1)";
          e.target.style.transform = "translateY(0)";
        }}
      >
        <FaYoutube size={20} className="text-white" />
      </a>
      <a
        href="#1"
        className="btn btn-outline-light rounded-circle p-2"
        style={{
          width: "45px",
          height: "45px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.2)";
          e.target.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.1)";
          e.target.style.transform = "translateY(0)";
        }}
      >
        <FaInstagram size={20} className="text-white" />
      </a>
      <a
        href="#1"
        className="btn btn-outline-light rounded-circle p-2"
        style={{
          width: "45px",
          height: "45px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.2)";
          e.target.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.1)";
          e.target.style.transform = "translateY(0)";
        }}
      >
        <FaTiktok size={20} className="text-white" />
      </a>
    </div>
  );
}

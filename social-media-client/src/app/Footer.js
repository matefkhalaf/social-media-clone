import React from "react";

export const Footer = () => {
  return (
    <footer
      className="page-footer font-small fixed-bottom"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <div className="footer-copyright text-center py-3">
        Made with <span>❤</span> by{" "}
        <a
          href="https://www.linkedin.com/in/matefkhalaf/"
          rel="noreferrer"
          target="_blank"
        >
          Mohamed Khalaf
        </a>
      </div>
    </footer>
  );
};


import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 text-center text-sm text-gray-500">
      <p>
        Made with ❤️ | Using{" "}
        <a 
          href="https://openweathermap.org/" 
          target="_blank" 
          rel="noreferrer"
          className="underline hover:text-primary"
        >
          OpenWeatherMap
        </a>{" "}
        &{" "}
        <a 
          href="https://quotable.io/" 
          target="_blank" 
          rel="noreferrer"
          className="underline hover:text-primary"
        >
          Quotable
        </a>
      </p>
    </footer>
  );
};

export default Footer;

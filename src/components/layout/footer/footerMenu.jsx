import React from "react";
import FooterSocialLinks from "./footerSocial";
import { Link } from "react-router-dom";

function FooterMenu() {
  return (
    <div className="flex flex-col text-center sm:text-left sm:flex-row text-white w-4/6 mx-auto flex-wrap gap-10 sm:gap-4 my-16 ">
      <ul className="footerli text-yellow ">
        <li>About</li>
        <Link to={`/contact`}>Contact Us</Link>
        <li>Visit Our Site</li>
        <li>Showcase</li>
      </ul>
      <ul className="footerli text-pink">
        <li>FAQs</li>
        <li>Privacy</li>
        <li>Terms & Conditions</li>
        <li>Returns Policy</li>
      </ul>
      <div className="flex-1">
        <h2 className="text-yellow font-medium mb-4">Pick A Neon</h2>
        <p>
          601 Vine St. 6th
          <br />
          Floor Los Angles, CA 90028
        </p>
      </div>
      <div className="flex-1">
        <h2 className="footerHeading">Contact Info</h2>
        <a href="mailto:info@customneon.com" className="inline-block">
          info@customneon.com
        </a>
        <a href="tel:+18882624851">8882624851</a>
        <FooterSocialLinks />
      </div>
    </div>
  );
}

export default FooterMenu;

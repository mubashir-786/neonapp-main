import React from "react";
import { Icon } from "@iconify/react";

function FooterSocialLinks() {
  return (
    <div className="flex justify-center sm:justify-start text-2xl gap-4 mt-4">
      <Icon icon="ic:baseline-facebook" />
      <Icon icon="mdi:twitter" />
      <Icon icon="mdi:youtube" />
      <Icon icon="ri:linkedin-box-fill" />
    </div>
  );
}

export default FooterSocialLinks;

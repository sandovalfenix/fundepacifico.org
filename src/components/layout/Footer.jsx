import React, { useState } from "react";

const menuItems = [
  {
    heading: "What we do",
    links: [
      ["Education", "https://higherlifefoundation.org/what-we-do/education"],
      ["Global Health", "https://higherlifefoundation.org/what-we-do/global-health"],
      ["Disaster Relief & Preparedness", "https://higherlifefoundation.org/what-we-do/disaster-relief-and-preparedness"],
      ["Sustainable Livelihoods", "https://higherlifefoundation.org/what-we-do/sustainable-livelihoods"],
    ],
  },
  {
    heading: "About us",
    links: [
      ["Our Story", "https://higherlifefoundation.org/about"],
      ["Meet the Team", "https://higherlifefoundation.org/about#leadership"],
      ["Our Partners", "https://higherlifefoundation.org/featured-grantees#our-grantees"],
      ["Our Impact", "https://higherlifefoundation.org/our-impact"],
    ],
  },
  {
    heading: "Insight & Resources",
    links: [
      ["Career", "https://higherlifefoundation.org/contact#careers"],
      ["Articles", "https://higherlifefoundation.org/blog"],
      ["Resources", "https://higherlifefoundation.org/resources"],
      ["Contact", "https://higherlifefoundation.org/contact"],
    ],
  },
  {
    heading: "Legal",
    links: [
      ["Privacy Policy", "https://higherlifefoundation.org/privacy-policy"],
      ["Terms & Conditions", "https://higherlifefoundation.org/terms-and-conditions"],
      ["Cookie Settings", "https://higherlifefoundation.org/cookie-policy"],
    ],
  },
];

const offices = [
  {
    title: "Head Office (Zimbabwe)",
    details: [
      ["58 Alpes Road, Vainona, Harare, Zimbabwe", "https://www.google.com/maps/place/58+Alpes+Rd,+Harare,+Zimbabwe/"],
      ["info@higherlifefoundation.com", "mailto:info@higherlifefoundation.com"],
      ["(+263) 772 222 922", "tel:+263772222922"],
    ],
  },
  {
    title: "Lesotho Office",
    details: [
      ["Main South One Road, Mazenod, Maseru, Lesotho", "https://www.google.com/maps/place/Main+South+1+Rd,+Lesotho/"],
      ["info@higherlifefoundation.com", "mailto:info@higherlifefoundation.com"],
      ["(+266) 22 350 306", "tel:+26622350306"],
    ],
  },
];

const socials = [
  ["Instagram", "https://www.instagram.com/higherlifefndtn/?hl=en", "/assets/ae2b6205894d4c5ac4115e8a17fdf42ccce49deb-20x20.svg"],
  ["Facebook", "https://www.facebook.com/HigherlifeFDN/", "/assets/bf88b28af146b91f385eb503c6a183cd44ba137b-20x20.svg"],
  ["LinkedIn", "https://www.linkedin.com/company/higher-life/", "/assets/0bfd88b63892f8bbfe5dbe9651c2149f73ed318d-20x20.svg"],
  ["Twitter", "https://x.com/higherlifefdn", "/assets/eff35b9a94105b50217497c0a9ac7153d15154d3-20x20.svg"],
];

function ArrowIcon({ open }) {
  return (
    <svg
      className={`footer_arrow__f0O6_${open ? " footer_open__D_Gw3" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      fill="none"
      viewBox="0 0 12 12"
    >
      {open ? <path stroke="#fff" d="M10 6H2" /> : <path stroke="#fff" d="M6 2v8M10 6H2" />}
    </svg>
  );
}

export default function Footer() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <footer className="footer_root__SOTzw">
      <div className="footer_top__Wxu9Z">
        <a
          className="link_root__iDASX link_noUnder__gFrbm footer_logoLink__original"
          aria-label="Fundepacifico home page"
          href="/"
        >
          <img
            className="footer_logo__iXql1"
            src="/branding/logo-fundepacifico-font.png"
            alt="Fundepacifico"
            width="594"
            height="366"
          />
        </a>

        <div className="footer_menu__jualy">
          {menuItems.map((item, index) => {
            const open = openIndex === index;
            return (
              <div className={`footer_item__dAiCz${open ? " footer_active__LFq_W" : ""}`} key={item.heading}>
                <button
                  className="footer_heading__YX7ls text_xs__SekJ2"
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span>{item.heading}</span>
                  <ArrowIcon open={open} />
                </button>
                <div
                  className="footer_accordionContent___Q4dn"
                  style={{ height: open ? `${item.links.length * 28 + 8}rem` : undefined }}
                >
                  <div className="footer_accordionLinks__lff_e">
                    {item.links.map(([label, href]) => (
                      <a
                        className="link_root__iDASX link_noUnder__gFrbm footer_link__pjK7O text_cta__jYwZ7"
                        href={href}
                        key={label}
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
                {item.links.map(([label, href]) => (
                  <a
                    className="link_root__iDASX link_noUnder__gFrbm footer_link__pjK7O text_cta__jYwZ7 footer_desktopLink__original"
                    href={href}
                    key={`desktop-${label}`}
                  >
                    {label}
                  </a>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="footer_middle__yIT3I">
        <div className="footer_newsletter__EEPoC">
          <div className="footer_title__QcupS text_xs__SekJ2">Newsletter</div>
          <div className="footer_body__RXJ8f text_p__79svp">
            Join our mailing list to stay up to date with what's happening at Higherlife Foundation
          </div>
          <button className="button_root__fMfbx button_standard__YccnH button_colorWhite__uKfX5 text_cta__jYwZ7">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14">
              <path stroke="#1A1A1A" d="M2 7h10m0 0L6.531 2M12 7l-5.469 5"></path>
            </svg>
            <span>Join Our Community</span>
          </button>
        </div>

        <div className="footer_locations__4fyaH">
          {offices.map((office) => (
            <div className="footer_location__ugVxD" key={office.title}>
              <div className="footer_title__QcupS text_xs__SekJ2">{office.title}</div>
              {office.details.map(([label, href]) => (
                <a
                  className="link_root__iDASX link_noUnder__gFrbm footer_item__dAiCz text_p__79svp"
                  href={href}
                  key={label}
                >
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="footer_bottom__FFkQv">
        <div className="footer_copyright__52pcN text_p__79svp">
          © {new Date().getFullYear()} Higherlife Foundation. All Rights Reserved.
        </div>
        <a className="link_root__iDASX footer_link__pjK7O text_p__79svp" href="https://dashdigital.studio">
          Website by DashDigital Studio
        </a>
        <div className="footer_platforms__Sh7Fl">
          {socials.map(([label, href, src]) => (
            <a className="link_root__iDASX link_noUnder__gFrbm" href={href} key={label} aria-label={label}>
              <img className="footer_icon__OKu4F" src={src} alt="" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

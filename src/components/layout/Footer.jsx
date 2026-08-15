import React, { useState } from "react";

const menuItems = [
  {
    heading: "¿Qué hacemos?",
    links: [
      ["Vivienda digna", "#what-we-do"],
      ["Capacitación y formación", "#what-we-do"],
      ["Emprendimiento y agroindustria", "#what-we-do"],
      ["Redes de apoyo", "#what-we-do"],
    ],
  },
  {
    heading: "¿Quiénes somos?",
    links: [
      ["Historia", "#team-block"],
      ["Liderazgo", "#team-block"],
      ["Valores", "#team-block"],
      ["Indicadores", "#indicadores"],
    ],
  },
  {
    heading: "Recursos y Alianzas",
    links: [
      ["Objeto social", "#team-block"],
      ["Servicios", "#what-we-do"],
      ["Contacto", "#contacto"],
    ],
  },
  {
    heading: "Legal",
    links: [
      ["Política de Privacidad", "#"],
      ["Términos y Condiciones", "#"],
      ["Configuración de Cookies", "#"],
    ],
  },
];

const offices = [
  {
    title: "Sede principal",
    details: [
      ["Calle 1 No. 10A-08, Buenaventura, Valle, Colombia", "#"],
      ["onginternacional@fundepacifico.org", "mailto:onginternacional@fundepacifico.org"],
      ["(+57) 316 228 3235", "tel:+573162283235"],
    ],
  },
  {
    title: "Representante legal",
    details: [
      ["Orlando Arrechea Orobio", "#team-block"],
      [
        "director.ejecutivo@fundepacifico.org",
        "mailto:director.ejecutivo@fundepacifico.org",
      ],
      ["www.fundepacifico.org", "https://www.fundepacifico.org"],
    ],
  },
];

const socials = [
  ["Instagram", "#", "/assets/ae2b6205894d4c5ac4115e8a17fdf42ccce49deb-20x20.svg"],
  ["Facebook", "#", "/assets/bf88b28af146b91f385eb503c6a183cd44ba137b-20x20.svg"],
  ["LinkedIn", "#", "/assets/0bfd88b63892f8bbfe5dbe9651c2149f73ed318d-20x20.svg"],
  ["Twitter", "#", "/assets/eff35b9a94105b50217497c0a9ac7153d15154d3-20x20.svg"],
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

export default function Footer({ onOpenGetInvolved }) {
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
            Reciba novedades sobre programas, alianzas y proyectos de FUNDEPACIFICO.
          </div>
          <button
            className="button_root__fMfbx button_standard__YccnH button_colorWhite__uKfX5 text_cta__jYwZ7"
            onClick={onOpenGetInvolved}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14">
              <path stroke="#1A1A1A" d="M2 7h10m0 0L6.531 2M12 7l-5.469 5"></path>
            </svg>
            <span>Unirse</span>
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
          © {new Date().getFullYear()} FUNDEPACIFICO ONG Internacional. Todos los derechos reservados.
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

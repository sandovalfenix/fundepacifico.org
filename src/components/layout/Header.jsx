import React, { useEffect, useState } from "react";

export default function Header({ onOpenGetInvolved }) {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 1024px)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px)");
    const updateBreakpoint = (event) => setIsMobile(event.matches);

    setIsMobile(media.matches);
    media.addEventListener("change", updateBreakpoint);

    return () => media.removeEventListener("change", updateBreakpoint);
  }, []);

  useEffect(() => {
    const nav = document.querySelector(".nav_nav__Eu8Uu");
    const labels = Array.from(
      document.querySelectorAll(
        ".nav_bar__1qyhR > .nav_menu___JiiA:not(.nav_mobile__5QEtE) .nav_dropdown__WQk53",
      ),
    );
    const panel = document.querySelector(".nav_dropdownPanel__SEUxJ");
    const panelContent = Array.from(
      document.querySelectorAll(
        ".nav_dropdownPanel__SEUxJ .nav_dropdownContent__fShmO",
      ),
    );
    const panelFooterItems = Array.from(
      document.querySelectorAll(
        ".nav_dropdownPanel__SEUxJ .nav_bottom__47S9d > *",
      ),
    );
    const logoWrap = document.querySelector(".nav_logoWrap__zZhYx");
    const root = document.documentElement;
    let activeDropdown = -1;
    let lastScrollY = window.scrollY;
    let navFrame = 0;
    let themeFrame = 0;

    const setNavMetrics = () => {
      if (!nav) return;
      const navHeight = nav.getBoundingClientRect().height;
      root.style.setProperty("--nav-height", `${navHeight}px`);
      root.style.setProperty("--nav-offset", `${navHeight}px`);
    };

    setNavMetrics();
    window.addEventListener("resize", setNavMetrics);

    const setNavVisibility = () => {
      if (!nav) return;
      const currentScrollY = window.scrollY;
      const navHeight = nav.getBoundingClientRect().height;
      const scrollingDown = currentScrollY > lastScrollY;
      const distanceToBottom =
        document.documentElement.scrollHeight -
        (currentScrollY + window.innerHeight);
      const isAtPageEnd = distanceToBottom <= navHeight;
      const shouldHide =
        activeDropdown === -1 &&
        currentScrollY > navHeight && scrollingDown && !isAtPageEnd;

      nav.classList.toggle("nav_atPageEnd__local", isAtPageEnd);
      nav.style.transform = shouldHide
        ? `translate(0px, -${navHeight}px)`
        : "translate(0px, 0px)";
      nav.style.transition =
        "transform 650ms cubic-bezier(.645,.045,.355,1)";
      lastScrollY = currentScrollY;
    };

    const queueNavVisibility = () => {
      window.cancelAnimationFrame(navFrame);
      navFrame = window.requestAnimationFrame(setNavVisibility);
    };

    window.addEventListener("scroll", queueNavVisibility, { passive: true });
    setNavVisibility();

    const setNavTheme = () => {
      if (!nav) return;

      const navRect = nav.getBoundingClientRect();
      const logoRect = logoWrap?.getBoundingClientRect();
      const sampleX = logoRect
        ? logoRect.left + logoRect.width / 2
        : navRect.left + Math.min(72, navRect.width * 0.08);
      const sampleY = Math.min(
        window.innerHeight - 1,
        Math.max(navRect.bottom + 8, 1),
      );
      const hit = document
        .elementsFromPoint(
          Math.min(window.innerWidth - 1, Math.max(1, sampleX)),
          sampleY,
        )
        .find((element) => element instanceof Element && element.closest("[data-nav-theme]"));
      const theme =
        hit?.closest("[data-nav-theme]")?.getAttribute("data-nav-theme") ||
        "light";

      nav.setAttribute("data-nav-theme", theme);
    };

    const queueNavTheme = () => {
      window.cancelAnimationFrame(themeFrame);
      themeFrame = window.requestAnimationFrame(setNavTheme);
    };

    setNavTheme();
    window.addEventListener("scroll", queueNavTheme, { passive: true });
    window.addEventListener("resize", queueNavTheme);

    const closePanel = () => {
      activeDropdown = -1;
      if (!panel) return;
      nav?.classList.remove("nav_dropdownOpen__local");
      panel.style.clipPath = "inset(0px 0px 100%)";
      panel.style.pointerEvents = "none";
      panelContent.forEach((content) => {
        content.style.opacity = "0";
        content.style.pointerEvents = "none";
        content.style.transform = "translateY(20px)";
      });
      panelFooterItems.forEach((item) => {
        item.style.opacity = "0";
        item.style.transform = "translate(0px, 20px)";
      });
    };

    const openPanel = (index) => {
      activeDropdown = index;
      if (!panel) return;
      nav?.classList.add("nav_dropdownOpen__local");
      panel.style.clipPath = "inset(0px 0px 0%)";
      panel.style.pointerEvents = "auto";
      panelContent.forEach((content, i) => {
        content.style.opacity = i === index ? "1" : "0";
        content.style.pointerEvents = i === index ? "auto" : "none";
        content.style.transform =
          i === index ? "translateY(0px)" : "translateY(20px)";
      });
      panelFooterItems.forEach((item) => {
        item.style.opacity = "1";
        item.style.transform = "translate(0px, 0px)";
      });
    };

    const togglePanel = (index) => {
      if (activeDropdown === index) {
        closePanel();
        return;
      }
      openPanel(index);
    };

    const labelHandlers = labels.map((label, index) => {
      const button = label.querySelector("button");
      const handler = () => togglePanel(index);
      button?.addEventListener("click", handler);
      return { button, handler };
    });
    const documentClickHandler = (event) => {
      if (nav && event.target instanceof Node && nav.contains(event.target))
        return;
      closePanel();
    };
    document.addEventListener("click", documentClickHandler);
    panelContent.forEach((content, i) => {
      content.style.transition = "opacity 450ms ease, transform 450ms ease";
      content.style.opacity = i === 0 ? "1" : "0";
      content.style.pointerEvents = i === 0 ? "auto" : "none";
    });

    const mobileButton = document.querySelector(".button_menu__3tmHH");
    const mobileMenu = document.querySelector(".nav_mobile__5QEtE");
    const accordions = Array.from(
      document.querySelectorAll(".nav_mobile__5QEtE .nav_accordionWrap__lR3MH"),
    );
    let mobileOpen = false;

    const setMobileOpen = (open) => {
      mobileOpen = open;
      if (!mobileMenu || !mobileButton) return;
      mobileMenu.style.clipPath = open
        ? "inset(0px 0px 0px 0px)"
        : "inset(0px 100% 0px 0px)";
      mobileMenu.style.transform = open
        ? "translateX(0%)"
        : "translateX(-100%)";
      mobileMenu.style.transition =
        "clip-path 650ms cubic-bezier(.645,.045,.355,1), transform 650ms cubic-bezier(.645,.045,.355,1)";
      mobileMenu.style.pointerEvents = open ? "auto" : "none";
      mobileButton.classList.toggle("button_isActive__tpT2u", open);
      mobileButton.setAttribute("aria-expanded", String(open));
      mobileButton.setAttribute(
        "aria-label",
        open ? "Close menu" : "Open menu",
      );
      const iconPath = mobileButton.querySelector("path");
      iconPath?.setAttribute(
        "d",
        open ? "M1 13 13 1.12M1 1l12 11.88" : "M0 2.333h14M0 7h14M0 11.667h14",
      );
      document.body.style.overflow = open ? "hidden" : "";
    };

    const mobileHandler = () => setMobileOpen(!mobileOpen);
    mobileButton?.addEventListener("click", mobileHandler);
    setMobileOpen(false);

    const accordionHandlers = accordions.map((wrap) => {
      const button = wrap.querySelector(".nav_dropdownButton__JK1HY");
      const content = wrap.querySelector(".nav_accordionContent__TDlGU");
      const handler = () => {
        const isOpen = content?.style.height !== "0px";
        accordions.forEach((item) => {
          const itemContent = item.querySelector(
            ".nav_accordionContent__TDlGU",
          );
          if (itemContent) itemContent.style.height = "0px";
        });
        if (content && !isOpen)
          content.style.height = `${content.scrollHeight}px`;
      };
      button?.addEventListener("click", handler);
      return { button, handler };
    });

    const getInvolvedButton = document.querySelector(
      ".nav_buttons__lO0N3 .button_standard__YccnH",
    );
    getInvolvedButton?.addEventListener("click", onOpenGetInvolved);

    return () => {
      nav?.classList.remove("nav_dropdownOpen__local");
      labelHandlers.forEach(({ button, handler }) => {
        button?.removeEventListener("click", handler);
      });
      document.removeEventListener("click", documentClickHandler);
      window.removeEventListener("resize", setNavMetrics);
      window.removeEventListener("scroll", queueNavVisibility);
      window.removeEventListener("scroll", queueNavTheme);
      window.removeEventListener("resize", queueNavTheme);
      window.cancelAnimationFrame(navFrame);
      window.cancelAnimationFrame(themeFrame);
      mobileButton?.removeEventListener("click", mobileHandler);
      accordionHandlers.forEach(({ button, handler }) =>
        button?.removeEventListener("click", handler),
      );
      getInvolvedButton?.removeEventListener("click", onOpenGetInvolved);
      document.body.style.overflow = "";
    };
  }, [isMobile, onOpenGetInvolved]);

  return (
    <nav
      className="nav_nav__Eu8Uu"
      style={{
        translate: "none",
        rotate: "none",
        scale: "none",
      }}
    >
      <div className="nav_bar__1qyhR">
        <a
          className="link_root__iDASX link_noUnder__gFrbm nav_logoWrap__zZhYx"
          aria-label="Fundepacifico home page"
          href="/"
        >
          <img
            className="nav_logo__e8iou desktop-logo"
            src="/branding/logo-fundepacifico-font.png"
            alt="Fundepacifico"
            width="594"
            height="366"
          />
        </a>
        <div className="nav_menu___JiiA text_tag__kpI4A">
          <div className="nav_dropdown__WQk53">
            <button className="nav_label__HMaLQ">
              Que hacemos
              <svg
                className="nav_arrow__98gfz"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path fill="currentColor" d="M7 10 4 6h6z"></path>
              </svg>
            </button>
          </div>
          <div className="nav_dropdown__WQk53">
            <button className="nav_label__HMaLQ">
              Quienes somos
              <svg
                className="nav_arrow__98gfz"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path fill="currentColor" d="M7 10 4 6h6z"></path>
              </svg>
            </button>
          </div>
          <div className="nav_dropdown__WQk53">
            <button className="nav_label__HMaLQ">
              Recursos
              <svg
                className="nav_arrow__98gfz"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path fill="currentColor" d="M7 10 4 6h6z"></path>
              </svg>
            </button>
          </div>
          <a
            className="link_root__iDASX link_noUnder__gFrbm nav_link__LPzID"
            href="/impact"
          >
            Impacto
          </a>
          <a
            className="link_root__iDASX link_noUnder__gFrbm nav_link__LPzID"
            href="/contact"
          >
            Contacto
          </a>
        </div>
        <div className="nav_buttons__lO0N3">
          <button
            className="button_root__fMfbx button_standard__YccnH button_colorGreen__wmPps text_cta__jYwZ7 text_tag__kpI4A"
            style={{ "--span-width": "75.39274910235508rem" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="#1A1A1A"
                d="M2 7h10m0 0L6.531 2M12 7l-5.469 5"
              ></path>
            </svg>
            <span>Aliarse</span>
          </button>
          {isMobile && (
            <button
              className="button_root__fMfbx button_menu__3tmHH button_colorGreen__wmPps text_cta__jYwZ7 text_tag__kpI4A"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  d="M0 2.333h14M0 7h14M0 11.667h14"
                ></path>
              </svg>
            </button>
          )}
        </div>
      </div>
      <div
        className="nav_dropdownPanel__SEUxJ"
        style={{
          clipPath: "inset(0px 0px 100%)",
          pointerEvents: "none",
        }}
      >
        <div
          className="nav_dropdownContainer__MTyYR"
          style={{ height: "301px" }}
        >
          <div className="nav_dropdownContent__fShmO">
            <div className="nav_dropdownContentInner__XBZbe">
              <div className="nav_dropdownMedia__Fa_He">
                <picture className="nav_mediaImage__tpUB2 image_root__mq3ej">
                  <img
                    alt=""
                    loading="lazy"
                    width="1404"
                    height="1976"
                    decoding="async"
                    style={{ color: "transparent" }}
                    sizes="16vw"
                    src="/assets/72ce91c02b900257d6f8727bcc6b89a004d4cfb2-1404x1976.avif"
                  />
                </picture>
              </div>
              <ul className="nav_dropdownList__hGHdT">
                <li className="nav_dropdownItem__EnWi2">
                  <a
                    className="link_root__iDASX link_noUnder__gFrbm nav_dropdownLink__sG9QM text_navD__PxmrC"
                    href="/what-we-do#vivienda-digna"
                  >
                    Vivienda digna
                  </a>
                </li>
                <li className="nav_dropdownItem__EnWi2">
                  <a
                    className="link_root__iDASX link_noUnder__gFrbm nav_dropdownLink__sG9QM text_navD__PxmrC"
                    href="/what-we-do#educacion-formacion"
                  >
                    Capacitacion y formacion
                  </a>
                </li>
                <li className="nav_dropdownItem__EnWi2">
                  <a
                    className="link_root__iDASX link_noUnder__gFrbm nav_dropdownLink__sG9QM text_navD__PxmrC"
                    href="/what-we-do#emprendimiento-agroindustria"
                  >
                    Emprendimiento y agroindustria
                  </a>
                </li>
                <li className="nav_dropdownItem__EnWi2">
                  <a
                    className="link_root__iDASX link_noUnder__gFrbm nav_dropdownLink__sG9QM text_navD__PxmrC"
                    href="/what-we-do#redes-apoyo"
                  >
                    Redes de apoyo
                  </a>
                </li>
                <li className="nav_dropdownItem__EnWi2">
                  <a
                    className="link_root__iDASX link_noUnder__gFrbm nav_dropdownLink__sG9QM text_navD__PxmrC"
                    href="/what-we-do#obras-civiles"
                  >
                    Obras civiles
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="nav_dropdownContent__fShmO">
            <div className="nav_dropdownContentInner__XBZbe">
              <div className="nav_dropdownMedia__Fa_He">
                <picture className="nav_mediaImage__tpUB2 image_root__mq3ej">
                  <img
                    alt=""
                    loading="lazy"
                    width="1404"
                    height="1976"
                    decoding="async"
                    style={{ color: "transparent" }}
                    sizes="16vw"
                    src="/assets/a2126810148e5b56a882605c13d3ec54b261c1b6-1404x1976.jpeg"
                  />
                </picture>
              </div>
              <ul className="nav_dropdownList__hGHdT">
                <li className="nav_dropdownItem__EnWi2">
                  <a
                    className="link_root__iDASX link_noUnder__gFrbm nav_dropdownLink__sG9QM text_navD__PxmrC"
                    href="/about"
                  >
                    Historia
                  </a>
                </li>
                <li className="nav_dropdownItem__EnWi2">
                  <a
                    className="link_root__iDASX link_noUnder__gFrbm nav_dropdownLink__sG9QM text_navD__PxmrC"
                    href="/about#leadership"
                  >
                    Liderazgo
                  </a>
                </li>
                <li className="nav_dropdownItem__EnWi2">
                  <a
                    className="link_root__iDASX link_noUnder__gFrbm nav_dropdownLink__sG9QM text_navD__PxmrC"
                    href="/about"
                  >
                    Valores
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="nav_dropdownContent__fShmO">
            <div className="nav_dropdownContentInner__XBZbe">
              <div className="nav_dropdownMedia__Fa_He">
                <picture className="nav_mediaImage__tpUB2 image_root__mq3ej">
                  <img
                    alt=""
                    loading="lazy"
                    width="928"
                    height="1240"
                    decoding="async"
                    style={{ color: "transparent" }}
                    sizes="16vw"
                    src="/assets/9f4ab50d0dbb44ef00607adfcd25edb685d63cb1-928x1240.jpeg"
                  />
                </picture>
              </div>
              <ul className="nav_dropdownList__hGHdT">
                <li className="nav_dropdownItem__EnWi2">
                  <a
                    className="link_root__iDASX link_noUnder__gFrbm nav_dropdownLink__sG9QM text_navD__PxmrC"
                    href="/resources"
                  >
                    Portafolio
                  </a>
                </li>
                <li className="nav_dropdownItem__EnWi2">
                  <a
                    className="link_root__iDASX link_noUnder__gFrbm nav_dropdownLink__sG9QM text_navD__PxmrC"
                    href="/resources"
                  >
                    Documentos
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="nav_bottom__47S9d">
          <p
            className="nav_text__uiMq9 text_sp__zYahz"
            style={{
              translate: "none",
              rotate: "none",
              scale: "none",
              opacity: "0",
              transform: "translate(0px, 20px)",
            }}
          >
            Derechos, oportunidades y desarrollo sostenible para el Pacifico
            colombiano.
          </p>
          <div className="nav_platforms__zr2Be">
            <a
              className="link_root__iDASX link_noUnder__gFrbm"
              target="_blank"
              href="#"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: "0",
                transform: "translate(0px, 20px)",
              }}
            >
              <picture className="nav_icon__SGI6D image_root__mq3ej image_noLoadAnimation__5ZG16 image_loaded__zdWuW">
                <img
                  alt="Instagram Icon"
                  loading="lazy"
                  width="20"
                  height="20"
                  decoding="async"
                  style={{ color: "transparent" }}
                  src="/assets/ae2b6205894d4c5ac4115e8a17fdf42ccce49deb-20x20.svg"
                />
              </picture>
            </a>
            <a
              className="link_root__iDASX link_noUnder__gFrbm"
              target="_blank"
              href="#"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: "0",
                transform: "translate(0px, 20px)",
              }}
            >
              <picture className="nav_icon__SGI6D image_root__mq3ej image_noLoadAnimation__5ZG16 image_loaded__zdWuW">
                <img
                  alt="Facebook Icon"
                  loading="lazy"
                  width="20"
                  height="20"
                  decoding="async"
                  style={{ color: "transparent" }}
                  src="/assets/bf88b28af146b91f385eb503c6a183cd44ba137b-20x20.svg"
                />
              </picture>
            </a>
            <a
              className="link_root__iDASX link_noUnder__gFrbm"
              target="_blank"
              href="#"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: "0",
                transform: "translate(0px, 20px)",
              }}
            >
              <picture className="nav_icon__SGI6D image_root__mq3ej image_noLoadAnimation__5ZG16 image_loaded__zdWuW">
                <img
                  alt="LinkedIn Icon"
                  loading="lazy"
                  width="20"
                  height="20"
                  decoding="async"
                  style={{ color: "transparent" }}
                  src="/assets/0bfd88b63892f8bbfe5dbe9651c2149f73ed318d-20x20.svg"
                />
              </picture>
            </a>
            <a
              className="link_root__iDASX link_noUnder__gFrbm"
              target="_blank"
              href="#"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                opacity: "0",
                transform: "translate(0px, 20px)",
              }}
            >
              <picture className="nav_icon__SGI6D image_root__mq3ej image_noLoadAnimation__5ZG16 image_loaded__zdWuW">
                <img
                  alt="Twitter Icon"
                  loading="lazy"
                  width="20"
                  height="20"
                  decoding="async"
                  style={{ color: "transparent" }}
                  src="/assets/eff35b9a94105b50217497c0a9ac7153d15154d3-20x20.svg"
                />
              </picture>
            </a>
          </div>
        </div>
      </div>
      <div
        className="nav_menu___JiiA nav_mobile__5QEtE"
        data-lenis-prevent="true"
        style={{
          translate: "none",
          rotate: "none",
          scale: "none",
          clipPath: "inset(0px 100% 0px 0px)",
        }}
      >
        <div className="nav_accordionWrap__lR3MH">
          <button className="button_root__fMfbx text_l__zBmW8 nav_dropdownButton__JK1HY">
            Que hacemos
            <svg
              className="nav_arrow__98gfz"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path fill="currentColor" d="M7 10 4 6h6z"></path>
            </svg>
          </button>
          <div
            className="nav_accordionContent__TDlGU"
            style={{ height: "0px" }}
          >
            <div className="nav_accordionLinks__1joKn">
              <a
                className="link_root__iDASX link_noUnder__gFrbm nav_link__LPzID text_navD__PxmrC"
                href="/what-we-do#vivienda-digna"
              >
                Vivienda digna
              </a>
              <a
                className="link_root__iDASX link_noUnder__gFrbm nav_link__LPzID text_navD__PxmrC"
                href="/what-we-do#educacion-formacion"
              >
                Capacitacion y formacion
              </a>
              <a
                className="link_root__iDASX link_noUnder__gFrbm nav_link__LPzID text_navD__PxmrC"
                href="/what-we-do#emprendimiento-agroindustria"
              >
                Emprendimiento y agroindustria
              </a>
              <a
                className="link_root__iDASX link_noUnder__gFrbm nav_link__LPzID text_navD__PxmrC"
                href="/what-we-do#redes-apoyo"
              >
                Redes de apoyo
              </a>
              <a
                className="link_root__iDASX link_noUnder__gFrbm nav_link__LPzID text_navD__PxmrC"
                href="/what-we-do#obras-civiles"
              >
                Obras civiles
              </a>
            </div>
          </div>
        </div>
        <div className="nav_accordionWrap__lR3MH">
          <button className="button_root__fMfbx text_l__zBmW8 nav_dropdownButton__JK1HY">
            Quienes somos
            <svg
              className="nav_arrow__98gfz"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path fill="currentColor" d="M7 10 4 6h6z"></path>
            </svg>
          </button>
          <div
            className="nav_accordionContent__TDlGU"
            style={{ height: "0px" }}
          >
            <div className="nav_accordionLinks__1joKn">
              <a
                className="link_root__iDASX link_noUnder__gFrbm nav_link__LPzID text_navD__PxmrC"
                href="/about"
              >
                Historia
              </a>
              <a
                className="link_root__iDASX link_noUnder__gFrbm nav_link__LPzID text_navD__PxmrC"
                href="/about#leadership"
              >
                Liderazgo
              </a>
              <a
                className="link_root__iDASX link_noUnder__gFrbm nav_link__LPzID text_navD__PxmrC"
                href="/about"
              >
                Valores
              </a>
            </div>
          </div>
        </div>
        <div className="nav_accordionWrap__lR3MH">
          <button className="button_root__fMfbx text_l__zBmW8 nav_dropdownButton__JK1HY">
            Recursos
            <svg
              className="nav_arrow__98gfz"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path fill="currentColor" d="M7 10 4 6h6z"></path>
            </svg>
          </button>
          <div
            className="nav_accordionContent__TDlGU"
            style={{ height: "0px" }}
          >
            <div className="nav_accordionLinks__1joKn">
              <a
                className="link_root__iDASX link_noUnder__gFrbm nav_link__LPzID text_navD__PxmrC"
                href="/resources"
              >
                Portafolio
              </a>
              <a
                className="link_root__iDASX link_noUnder__gFrbm nav_link__LPzID text_navD__PxmrC"
                href="/resources"
              >
                Documentos
              </a>
            </div>
          </div>
        </div>
        <a
          className="link_root__iDASX link_noUnder__gFrbm nav_link__LPzID text_l__zBmW8"
          href="/impact"
        >
          Impacto
        </a>
        <a
          className="link_root__iDASX link_noUnder__gFrbm nav_link__LPzID text_l__zBmW8"
          href="/contact"
        >
          Contacto
        </a>
        <div className="nav_bottom__47S9d">
          <p className="nav_text__uiMq9 text_sp__zYahz">
            Derechos, oportunidades y desarrollo sostenible para el Pacifico
            colombiano.
          </p>
          <div className="nav_platforms__zr2Be">
            <a
              className="link_root__iDASX link_noUnder__gFrbm"
              target="_blank"
              href="#"
            >
              <picture className="nav_icon__SGI6D image_root__mq3ej image_noLoadAnimation__5ZG16 image_loaded__zdWuW">
                <img
                  alt="Instagram Icon"
                  loading="lazy"
                  width="20"
                  height="20"
                  decoding="async"
                  style={{ color: "transparent" }}
                  src="/assets/ae2b6205894d4c5ac4115e8a17fdf42ccce49deb-20x20.svg"
                />
              </picture>
            </a>
            <a
              className="link_root__iDASX link_noUnder__gFrbm"
              target="_blank"
              href="#"
            >
              <picture className="nav_icon__SGI6D image_root__mq3ej image_noLoadAnimation__5ZG16 image_loaded__zdWuW">
                <img
                  alt="Facebook Icon"
                  loading="lazy"
                  width="20"
                  height="20"
                  decoding="async"
                  style={{ color: "transparent" }}
                  src="/assets/bf88b28af146b91f385eb503c6a183cd44ba137b-20x20.svg"
                />
              </picture>
            </a>
            <a
              className="link_root__iDASX link_noUnder__gFrbm"
              target="_blank"
              href="#"
            >
              <picture className="nav_icon__SGI6D image_root__mq3ej image_noLoadAnimation__5ZG16 image_loaded__zdWuW">
                <img
                  alt="LinkedIn Icon"
                  loading="lazy"
                  width="20"
                  height="20"
                  decoding="async"
                  style={{ color: "transparent" }}
                  src="/assets/0bfd88b63892f8bbfe5dbe9651c2149f73ed318d-20x20.svg"
                />
              </picture>
            </a>
            <a
              className="link_root__iDASX link_noUnder__gFrbm"
              target="_blank"
              href="#"
            >
              <picture className="nav_icon__SGI6D image_root__mq3ej image_noLoadAnimation__5ZG16 image_loaded__zdWuW">
                <img
                  alt="Twitter Icon"
                  loading="lazy"
                  width="20"
                  height="20"
                  decoding="async"
                  style={{ color: "transparent" }}
                  src="/assets/eff35b9a94105b50217497c0a9ac7153d15154d3-20x20.svg"
                />
              </picture>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

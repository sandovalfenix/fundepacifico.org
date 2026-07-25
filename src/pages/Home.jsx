import React, { useEffect } from "react";

const whatWeDoItems = [
  {
    tag: "Vivienda digna",
    heading:
      "Gestionamos proyectos de vivienda digna para comunidades vulnerables.",
    body: "Promovemos soluciones habitacionales con alto componente social, articulando recursos, aliados y participacion comunitaria para mejorar la calidad de vida en los territorios.",
    href: "/what-we-do#vivienda-digna",
    label: "Mas informacion",
    alt: "Vivienda digna",
    src: "/assets/23e65db63e52ff7906f61a2cfbfae23d15c33892-1404x1976.avif",
  },
  {
    tag: "Capacitacion y formacion",
    heading:
      "Fortalecemos capacidades mediante educacion, talleres y procesos formativos.",
    body: "Realizamos talleres, diplomados, seminarios, proyectos de investigacion y acompanamiento para ampliar oportunidades educativas y comunitarias.",
    href: "/what-we-do#educacion-formacion",
    label: "Mas informacion",
    alt: "Capacitacion y formacion",
    src: "/assets/ae85e1f1fd04e4429416977427d2431f88682a1b-1404x1976.avif",
  },
  {
    tag: "Emprendimiento y agroindustria",
    heading:
      "Impulsamos unidades productivas sostenibles para asociaciones comunitarias.",
    body: "Asesoramos emprendimientos agropecuarios, agroindustriales y de servicios para que cooperativas y comunidades generen ingresos y desarrollo local.",
    href: "/what-we-do#emprendimiento-agroindustria",
    label: "Mas informacion",
    alt: "Emprendimiento y agroindustria",
    src: "/assets/f3ff4267f742dcc389da2b428da399a461005fc5-1404x1976.jpeg",
  },
  {
    tag: "Redes de apoyo",
    heading: "Conectamos comunidades, cooperativas, instituciones y aliados.",
    body: "Conformamos redes de apoyo para potenciar acciones sociales, ampliar oportunidades y fortalecer el tejido comunitario en cada territorio.",
    href: "/what-we-do#redes-apoyo",
    label: "Mas informacion",
    alt: "Redes de apoyo",
    src: "/assets/b2a99047570a6606e1e7009d4d62a630f705fa9d-1404x1976.avif",
  },
  {
    tag: "Obras civiles",
    heading:
      "Gestionamos infraestructura social al servicio de las comunidades.",
    body: "Acompanamos obras deportivas, culturales, educativas, comunitarias, religiosas y viales cuando responden a necesidades sociales y al objeto de la fundacion.",
    href: "/what-we-do#obras-civiles",
    label: "Mas informacion",
    alt: "Obras civiles comunitarias",
    src: "/assets/529ffb690991e870fd14f04b26ea087e27c84d9f-1404x1976.avif",
  },
];

function SquareIcon({ color = "#1A1A1A" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="8"
      fill="none"
      viewBox="0 0 8 8"
    >
      <path fill={color} d="M0 0h8v8H0z"></path>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 14 14"
    >
      <path stroke="#1A1A1A" d="M2 7h10m0 0L6.531 2M12 7l-5.469 5"></path>
    </svg>
  );
}

export default function Home({
  onOpenGetInvolved,
  onOpenJnsModal,
  onOpenBookModal,
}) {
  useEffect(() => {
    const clamp = (value, min = 0, max = 1) =>
      Math.min(max, Math.max(min, value));

    const heroHeading = document.querySelector("h1.primary_heading__ikH5_");
    const heroHeadingText =
      "Promovemos derechos, oportunidades y desarrollo para el Pacifico colombiano.";
    let heroSplitFrame = 0;
    let heroSplitDisposed = false;

    const splitHeroHeading = () => {
      if (!heroHeading || heroSplitDisposed) return;

      heroHeading.classList.remove("done");
      heroHeading.textContent = "";

      const words = heroHeadingText.split(" ");
      const wordElements = words.map((word, index) => {
        const element = document.createElement("span");
        element.className = "word";
        element.textContent = `${word}${index === words.length - 1 ? "" : " "}`;
        heroHeading.appendChild(element);
        return element;
      });

      const lines = [];
      wordElements.forEach((word) => {
        const top = Math.round(word.getBoundingClientRect().top);
        const currentLine = lines.at(-1);

        if (!currentLine || Math.abs(currentLine.top - top) > 1) {
          lines.push({ top, words: [word] });
        } else {
          currentLine.words.push(word);
        }
      });

      const lineWraps = lines.map((line, index) => {
        const wrap = document.createElement("div");
        const lineElement = document.createElement("div");

        wrap.className = "wrap";
        wrap.setAttribute("aria-hidden", "true");
        lineElement.className = "line ani_fadeUp20__qwydY";
        lineElement.style.setProperty(
          "--delay",
          `${(0.55 + index * 0.1).toFixed(2)}s`,
        );
        lineElement.textContent = `${line.words
          .map((word) => word.textContent)
          .join("")
          .trimEnd()} `;
        wrap.appendChild(lineElement);

        return wrap;
      });

      heroHeading.replaceChildren(...lineWraps);
      heroHeading.classList.add("done");
    };

    const queueHeroSplit = () => {
      window.cancelAnimationFrame(heroSplitFrame);
      heroSplitFrame = window.requestAnimationFrame(splitHeroHeading);
    };

    queueHeroSplit();
    document.fonts?.ready.then(queueHeroSplit);
    window.addEventListener("resize", queueHeroSplit);

    const galleryRoot = document.querySelector(".gallery_root__fkUEu");
    const galleryButtons = galleryRoot
      ? Array.from(galleryRoot.querySelectorAll(".gallery_button__JezJ4"))
      : [];
    const galleryTags = galleryRoot
      ? Array.from(galleryRoot.querySelectorAll(".gallery_tag__1FmOj h2"))
      : [];
    const galleryItems = galleryRoot
      ? Array.from(galleryRoot.querySelectorAll(".gallery_slideItem__bAaOy"))
      : [];
    const gallerySlides = galleryRoot
      ? Array.from(galleryRoot.querySelectorAll(".gallery_slide__psAbg"))
      : [];
    const galleryContainer = galleryRoot?.querySelector(
      ".gallery_container__M28yn",
    );
    const galleryIndex = galleryRoot?.querySelector(".gallery_index__wo_KH");
    const galleryProgress = galleryRoot?.querySelector(
      ".gallery_progressBar__phf7D",
    );
    let activeGallery = 0;

    const setGallery = (index) => {
      activeGallery = (index + 2) % 2;
      galleryTags.forEach((tag, i) => {
        tag.classList.toggle("gallery_slideActive__SbygQ", i === activeGallery);
        tag.classList.toggle("gallery_slideHidden__vJbPa", i !== activeGallery);
      });
      galleryItems.forEach((item) => {
        const isActive = Number(item.dataset.slideIndex) === activeGallery;
        item.classList.toggle("gallery_slideActive__SbygQ", isActive);
      });
      gallerySlides.forEach((slide, i) => {
        slide.style.transform = `translate3d(${(i - activeGallery) * 100}%, 0px, 0px)`;
      });
      if (galleryContainer)
        galleryContainer.style.transform = "translate3d(0px, 0px, 0px)";
      if (galleryIndex)
        galleryIndex.textContent = `${String(activeGallery + 1).padStart(2, "0")} / 02`;
      if (galleryProgress) {
        const width = activeGallery === 0 ? 50 : 100;
        galleryProgress.style.width = `${width}%`;
        galleryProgress.setAttribute("aria-valuenow", String(width));
      }
    };

    galleryButtons[0]?.addEventListener("click", () =>
      setGallery(activeGallery - 1),
    );
    galleryButtons[1]?.addEventListener("click", () =>
      setGallery(activeGallery + 1),
    );
    const galleryTimer = window.setInterval(
      () => setGallery(activeGallery + 1),
      6500,
    );
    setGallery(0);

    const desktopSection = document.querySelector(".desktopView_root__zLZeZ");
    const desktopItems = Array.from(
      document.querySelectorAll(".desktopView_item__knw15"),
    );
    const desktopTags = Array.from(
      document.querySelectorAll(".desktopView_itemTag__X2t60"),
    );
    const desktopImages = Array.from(
      document.querySelectorAll(".desktopView_images__mY4tC"),
    );

    const statsSection = document.querySelector(".statsBanner_root__dzRS_");
    const statsItems = Array.from(
      document.querySelectorAll(".statsBanner_item__zD5NK"),
    );
    const statsSlides = Array.from(
      document.querySelectorAll(".statsBanner_slide__WAVLd"),
    );
    const statsImages = statsSlides
      .map((slide) => slide.querySelector(".statsBanner_slideImage__C9iCt img"))
      .filter(Boolean);
    const statsProgress = document.querySelector(
      ".statsBanner_progressBar__biqo4",
    );
    const heroRoot = document.querySelector(".primary_root__D2y7I");
    const heroMedia = heroRoot?.querySelector(".primary_media__MFR_9");
    const mediaBannerRoot = document.querySelector(".mediaBanner_root__iR8_Z");
    const mediaBannerMedia = mediaBannerRoot?.querySelector(
      ".mediaBanner_video__SM94J video, .mediaBanner_image___tzHA img",
    );
    const lazyVideos = Array.from(
      document.querySelectorAll(".video_lazy__Wx4tX video"),
    );
    const videoLoadCleanups = lazyVideos.map((video) => {
      const wrapper = video.closest(".video_lazy__Wx4tX");
      if (!wrapper) return () => {};

      const setCanPlay = () => {
        wrapper.classList.add("video_canplay__WViaJ");
        video.classList.add("video_visible__GQdJy");
        video.classList.remove("video_hidden__mX2zp");
      };
      const setLoading = () => {
        wrapper.classList.remove("video_canplay__WViaJ");
        video.classList.add("video_hidden__mX2zp");
        video.classList.remove("video_visible__GQdJy");
      };

      if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        setCanPlay();
      } else {
        setLoading();
      }

      video.addEventListener("canplay", setCanPlay);
      video.addEventListener("loadeddata", setCanPlay);
      video.addEventListener("waiting", setLoading);
      video.addEventListener("error", setLoading);

      return () => {
        video.removeEventListener("canplay", setCanPlay);
        video.removeEventListener("loadeddata", setCanPlay);
        video.removeEventListener("waiting", setLoading);
        video.removeEventListener("error", setLoading);
      };
    });
    const mobileWhatImages = Array.from(
      document.querySelectorAll(".mobileView_image__BwKgu img"),
    );
    let activeStats = 0;

    const setScrollState = () => {
      if (heroRoot && heroMedia) {
        const rect = heroRoot.getBoundingClientRect();
        const progress = clamp(-rect.top / Math.max(1, rect.height));
        heroMedia.style.transform = `translate3d(0px, ${progress * 40}%, 0px)`;
        heroMedia.style.willChange = "transform";
      }

      if (mediaBannerRoot && mediaBannerMedia) {
        const rect = mediaBannerRoot.getBoundingClientRect();
        const offset = -rect.top * 0.33;
        mediaBannerMedia.style.transform = `translate3d(0px, ${offset}px, 0px)`;
        mediaBannerMedia.style.willChange = "transform";
      }

      mobileWhatImages.forEach((img) => {
        const rect = img.parentElement?.getBoundingClientRect();
        if (!rect) return;
        const total = window.innerHeight + rect.height;
        const progress = clamp((rect.top + rect.height) / Math.max(1, total));
        img.style.transform = `translate3d(0px, ${(0.5 - progress) * 10}%, 0px)`;
        img.style.willChange = "transform";
      });

      if (desktopSection && desktopItems.length && window.innerWidth >= 1025) {
        const rect = desktopSection.getBoundingClientRect();
        const totalItems = desktopItems.length;
        const progress = clamp(-rect.top / Math.max(1, rect.height));
        const scaledProgress = progress * (totalItems + 1);
        const active = clamp(
          Math.floor(scaledProgress),
          0,
          totalItems - 1,
        );
        const itemProgress = clamp(scaledProgress - active);

        desktopItems.forEach((item, i) => {
          const isActive = i === active;
          item.classList.toggle("desktopView_active___w9Ac", isActive);
          item.style.opacity = isActive ? "1" : "0";
          item.style.pointerEvents = isActive ? "auto" : "none";
          item.style.transform = isActive
            ? "translate3d(0px, 0px, 0px)"
            : `translate3d(0px, ${i < active ? "-20rem" : "20rem"}, 0px)`;
        });
        desktopTags.forEach((tag, i) => {
          tag.classList.toggle("desktopView_active___w9Ac", i === active);
          const bar = tag.querySelector(".desktopView_progressBar__KDKxE");
          if (bar) bar.style.width = i === active ? `${itemProgress * 100}%` : "0%";
        });
        desktopImages.forEach((image, i) => {
          const isActive = i === active;
          const isNext = i === active + 1;
          const isPrevious = i < active;
          const isLast = i === totalItems - 1;
          const depth = totalItems - i;

          image.classList.toggle("desktopView_active___w9Ac", isActive);
          image.style.opacity = isActive || isNext || isPrevious ? "1" : "0";
          image.style.zIndex = String(
            isActive ? depth + 10 : isNext ? depth + 5 : i,
          );
          image.style.clipPath = isActive
            ? isLast
              ? ""
              : `inset(0px 0px ${itemProgress * 100}% 0px)`
            : isPrevious
              ? "inset(0px 0px 100% 0px)"
              : "";
          const img = image.querySelector("img");
          if (img)
            img.style.transform = `translate3d(0px, ${-5 - progress * 12}%, 0px)`;
        });
      }

      if (statsSection && statsItems.length && statsSlides.length) {
        const sectionRect = statsSection.getBoundingClientRect();
        const slideStates = statsSlides.map((slide, i) => {
          const rect = slide.getBoundingClientRect();
          const progress = clamp(-rect.top / Math.max(1, rect.height));
          const isCurrent = rect.top <= 0 && rect.bottom >= 0;
          return { i, progress, isCurrent };
        });
        const total = statsItems.length;
        const current = sectionRect.bottom <= 0
          ? { i: total - 1, progress: 1 }
          : sectionRect.top >= window.innerHeight
            ? { i: 0, progress: 0 }
            : slideStates.find((slide) => slide.isCurrent) ||
              slideStates.reduce((nearest, slide) =>
                Math.abs(slide.progress - 0.5) < Math.abs(nearest.progress - 0.5)
                  ? slide
                  : nearest,
              );
        const active =
          current.progress >= 0.5 && current.i < total - 1
            ? current.i + 1
            : Math.min(current.i, total - 1);
        const direction = active > activeStats ? 1 : -1;

        statsItems.forEach((item, i) => {
          const isActive = i === active;
          const wasActive = i === activeStats;
          item.classList.toggle("statsBanner_active__5eZ9u", isActive);
          item.style.transition =
            "opacity 350ms cubic-bezier(0.645, 0.045, 0.355, 1), transform 350ms cubic-bezier(0.645, 0.045, 0.355, 1)";
          item.style.transitionDelay = isActive ? "150ms" : "0ms";
          item.style.willChange = "opacity, transform";
          item.style.opacity = isActive ? "1" : "0";
          item.style.pointerEvents = isActive ? "auto" : "none";
          item.style.transform = isActive
            ? "translate3d(0px, 0px, 0px)"
            : `translate3d(0px, ${wasActive ? -12 * direction : 12 * direction}px, 0px)`;
        });
        statsSlides.forEach((slide, i) => {
          const state = slideStates[i];
          const image = statsImages[i] || slide.querySelector("img");
          if (image && state) {
            const frame =
              image.closest(".statsBanner_slideImage__C9iCt") || slide;
            const rect = frame.getBoundingClientRect();
            const frameRange = window.innerHeight + rect.height;
            const frameProgress = clamp((rect.top + rect.height) / frameRange);
            const parallaxOffset = (0.5 - frameProgress) * 60;
            image.style.transform = `translate3d(0px, ${parallaxOffset.toFixed(
              2,
            )}%, 0px)`;
            image.style.willChange = "transform";
          }
          slide.style.zIndex = String(i);
          slide.style.opacity = "1";
        });
        if (statsProgress) {
          const progress =
            current.i >= total - 1
              ? 1
              : (current.i + current.progress) / Math.max(1, total - 1);
          statsProgress.style.setProperty("--progress", String(progress));
        }
        activeStats = active;
      }
    };

    desktopTags.forEach((tag, i) => {
      tag.addEventListener("click", () => {
        if (!desktopSection) return;
        const target = desktopSection.offsetTop + i * window.innerHeight;
        window.scrollTo({ top: target, behavior: "smooth" });
      });
    });
    window.addEventListener("scroll", setScrollState, { passive: true });
    window.addEventListener("resize", setScrollState);
    setScrollState();

    const ctaButtons = Array.from(
      document.querySelectorAll(".callToAction_button__JtFqK"),
    );
    const ctaHandler = (event) => {
      if (event.currentTarget.textContent?.includes("Unirse") || event.currentTarget.textContent?.includes("Ser parte"))
        onOpenGetInvolved();
    };
    ctaButtons.forEach((button) => {
      if (button.textContent?.includes("Unirse") || button.textContent?.includes("Ser parte"))
        button.addEventListener("click", ctaHandler);
    });

    return () => {
      heroSplitDisposed = true;
      window.cancelAnimationFrame(heroSplitFrame);
      window.clearInterval(galleryTimer);
      window.removeEventListener("scroll", setScrollState);
      window.removeEventListener("resize", setScrollState);
      window.removeEventListener("resize", queueHeroSplit);
      videoLoadCleanups.forEach((cleanup) => cleanup());
      ctaButtons.forEach((button) =>
        button.removeEventListener("click", ctaHandler),
      );
    };
  }, [onOpenGetInvolved, onOpenJnsModal, onOpenBookModal]);

  return (
    <main>
      <section
        className="primary_root__D2y7I"
        data-nav-theme="dark"
        id="home-hero"
      >
        <div className="primary_mediaWrapper__821S7">
          <div className="primary_media__MFR_9 video_video__EfQ69 video_lazy__Wx4tX video_parallax__HGkT_">
            <video
              className="video_hidden__mX2zp"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              src="/hero-background.mp4"
            ></video>
          </div>
        </div>
        <div className="primary_content__qQhMa">
          <div
            className="primary_tag__F5SNV text_tag__kpI4A ani_fadeUp20__qwydY"
            style={{ "--delay": "0.55s" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              fill="none"
              viewBox="0 0 8 8"
            >
              <path fill="#fff" d="M0 0h8v8H0z"></path>
            </svg>
            <h2>Bienvenidos</h2>
          </div>
          <h1
            className="primary_heading__ikH5_ text_xxl__KYbm5 split"
            aria-label="Promovemos derechos, oportunidades y desarrollo para el Pacifico colombiano."
          >
            Promovemos derechos, oportunidades y desarrollo para el Pacifico
            colombiano.
          </h1>
          <div className="primary_buttonWrap__RHtZM">
            <a
              className="button_root__fMfbx button_fill__dFeum button_colorGreen__wmPps button_textWhite__iuxA3 text_cta__jYwZ7 ani_fadeUp20__qwydY"
              style={{ "--delay": "0.75s" }}
              target="_self"
              href="/what-we-do"
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
              <span>¿Qué hacemos?</span>
            </a>
          </div>
        </div>
      </section>
      <section className="teamBlock_root__HjVxw" id="team-block">
        <div className="teamBlock_header__1yZYi">
          <div className="teamBlock_tag__jeu37 text_tag__kpI4A">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              fill="none"
              viewBox="0 0 8 8"
            >
              <path fill="#1A1A1A" d="M0 0h8v8H0z"></path>
            </svg>
            <h2>¿Quiénes somos?</h2>
          </div>
          <div className="teamBlock_heading__udUw9 text_xxl__KYbm5">
            <h3 style={{ lineHeight: "1" }}>
              FUNDEPACIFICO <br />
              <span className="text_grey__nqMgS">ONG Internacional</span>
            </h3>
          </div>
        </div>
        <div className="teamBlock_content__qE_mZ">
          <div className="teamBlock_body__CaNZb text_p__79svp text_dgrey__9S_lE">
            <p>
              Somos una organizacion sin animo de lucro que trabaja por los
              derechos y el bienestar de comunidades negras, afrocolombianas,
              raizales y palenqueras.
            </p>
            <p>
              Nacimos en Buenaventura con vocacion comunitaria, gestionando
              programas sociales, ambientales, educativos y productivos para
              poblaciones vulnerables.
            </p>
          </div>
          <a
            className="link_root__iDASX link_noUnder__gFrbm teamBlock_member__2O1ST"
            href="https://www.linkedin.com/in/orlando-arrechea-orobio-4a4a911b5/"
            target="_blank"
            rel="noreferrer"
            aria-label="Orlando Arrechea Orobio on LinkedIn"
          >
            <div className="teamBlock_imageWrap__axND9">
              <picture className="teamBlock_image__F2lr3 image_root__mq3ej image_loaded__zdWuW">
                <img
                  alt=""
                  loading="lazy"
                  width="1404"
                  height="1872"
                  decoding="async"
                  style={{ color: "transparent", opacity: "1" }}
                  sizes="(min-width: 1025px) 24vw, 94vw"
                  src="/branding/orlando-arrechea-orobio.png"
                />
              </picture>
              <div className="button_root__fMfbx button_hoverFill__TQ8bn button_colorGreen__wmPps text_cta__jYwZ7 teamBlock_button__ICL4O">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="#FFFFFF"
                    d="M2 7h10m0 0L6.531 2M12 7l-5.469 5"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="text_p__79svp teamBlock_body__CaNZb">
              <span>Orlando</span>
              <span>Arrechea Orobio</span>
            </div>
          </a>
        </div>
        <div className="teamBlock_bottom__lMltZ">
          <div className="teamBlock_heading__udUw9 text_sh__zU3LH">
            <p>
              Trabajamos con comunidades, cooperativas, instituciones y aliados
              para formular y ejecutar proyectos sostenibles que respondan a la
              realidad social, cultural y economica de cada territorio.
            </p>
          </div>
          <div className="teamBlock_body__CaNZb text_p__79svp text_dgrey__9S_lE">
            <p>
              Nuestra labor integra vivienda digna, educacion, salud,
              seguridad alimentaria, cultura, deporte, emprendimiento,
              agroindustria, obras civiles e innovacion para fortalecer el
              desarrollo comunitario.
            </p>
          </div>
          <a
            className="button_root__fMfbx button_fill__dFeum button_colorGreen__wmPps button_textBlack__AagpH text_cta__jYwZ7 teamBlock_button__ICL4O"
            target="_self"
            href="/about"
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
            <span>Nuestra historia</span>
          </a>
        </div>
      </section>
      <div className="gallery_root__fkUEu" data-nav-theme="dark">
        <div className="gallery_contentWrapper__qrlyf">
          <div className="gallery_content__DKtWA">
            <div className="gallery_tag__1FmOj text_tag__kpI4A">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                fill="none"
                viewBox="0 0 8 8"
              >
                <path fill="#ffffff" d="M0 0h8v8H0z"></path>
              </svg>
              <h2 data-slide-index="0" className="gallery_slideActive__SbygQ">
                Portafolio 2026
              </h2>
              <h2 data-slide-index="1" className="gallery_slideHidden__vJbPa">
                Objeto social
              </h2>
            </div>
            <p className="gallery_index__wo_KH text_tag__kpI4A">
              01{/*   */} / {/*   */}02
            </p>
            <div className="gallery_buttons__ExoEi">
              <button className="button_root__fMfbx text_cta__jYwZ7 gallery_button__JezJ4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="none"
                  viewBox="0 0 30 30"
                >
                  <rect
                    width="30"
                    height="30"
                    x="30"
                    y="30"
                    fill="#C6F886"
                    rx="15"
                    transform="rotate(-180 30 30)"
                  ></rect>
                  <path
                    fill="#C6F886"
                    d="M16.846 11.308 13.153 15l3.693 3.692"
                  ></path>
                  <path
                    stroke="#1A1A1A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.846 11.308 13.153 15l3.693 3.692"
                  ></path>
                </svg>
              </button>
              <button className="button_root__fMfbx text_cta__jYwZ7 gallery_button__JezJ4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="none"
                  viewBox="0 0 30 30"
                >
                  <rect width="30" height="30" fill="#C6F886" rx="15"></rect>
                  <path
                    fill="#C6F886"
                    d="M13.154 18.692 16.847 15l-3.693-3.692"
                  ></path>
                  <path
                    stroke="#1A1A1A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.154 18.692 16.847 15l-3.693-3.692"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="gallery_progressTrack__DYJi0">
              <div
                className="gallery_progressBar__phf7D"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="0"
                aria-label="Gallery scroll progress"
                style={{ width: "0%" }}
              ></div>
            </div>
            <div className="gallery_heading__pRSWo">
              <div
                data-slide-index="0"
                className="gallery_slideItem__bAaOy gallery_slideActive__SbygQ"
              >
                <div className="text_xl__DB7xZ">
                  <p>
                    Servicios sociales para comunidades con enfoque etnico y
                    territorial.
                  </p>
                </div>
              </div>
              <div data-slide-index="1" className="gallery_slideItem__bAaOy">
                <div className="text_xl__DB7xZ">
                  <p>Derechos, inclusion y desarrollo sostenible.</p>
                </div>
              </div>
            </div>
            <div className="gallery_body__K0eHi">
              <div
                data-slide-index="0"
                className="gallery_slideItem__bAaOy gallery_slideActive__SbygQ"
              >
                <div className="text_p__79svp">
                  <p>
                    Nuestro portafolio reune programas de vivienda digna,
                    educacion, salud, seguridad alimentaria, recreacion,
                    cultura, deporte, agroindustria, innovacion y obras
                    comunitarias.
                  </p>
                </div>
              </div>
              <div data-slide-index="1" className="gallery_slideItem__bAaOy">
                <div className="text_p__79svp">
                  <p>
                    Trabajamos para promover los derechos humanos, territoriales,
                    sociales, economicos, culturales, ambientales y politicos de
                    comunidades negras, afrocolombianas, raizales y palenqueras.
                  </p>
                </div>
              </div>
            </div>
            <div className="gallery_link__oxOdD">
              <div
                data-slide-index="0"
                className="gallery_slideItem__bAaOy gallery_slideActive__SbygQ"
              >
                <a
                  className="button_root__fMfbx button_fill__dFeum button_colorGreen__wmPps button_textWhite__iuxA3 text_cta__jYwZ7"
                  target="_self"
                  href="/what-we-do"
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
                  <span>Ver servicios</span>
                </a>
              </div>
              <div data-slide-index="1" className="gallery_slideItem__bAaOy">
                <p className="gallery_buttonGroupLabel__uGXkV text_xs__SekJ2">
                  Consulte el portafolio institucional
                </p>
                <div className="gallery_buttonGroup__CpSbB">
                  <a
                    className="imageButton_root__ZYop_"
                    target="_self"
                    href="/resources"
                  >
                    <picture className="imageButton_image__FvH21 image_root__mq3ej image_loaded__zdWuW">
                      <img
                        alt=""
                        loading="lazy"
                        width="35"
                        height="40"
                        decoding="async"
                        style={{ color: "transparent", opacity: "1" }}
                        src="/assets/65ff619b209b80ac47ca810bee5d8b4afd54746d-35x40.svg"
                      />
                    </picture>
                  </a>
                  <a
                    className="imageButton_root__ZYop_"
                    target="_self"
                    href="/about"
                  >
                    <picture className="imageButton_image__FvH21 image_root__mq3ej image_loaded__zdWuW">
                      <img
                        alt=""
                        loading="lazy"
                        width="54"
                        height="40"
                        decoding="async"
                        style={{ color: "transparent", opacity: "1" }}
                        src="/assets/7cd0044636ebfd27ed9d1eac9c554af056f9116b-54x40.svg"
                      />
                    </picture>
                  </a>
                  <a
                    className="imageButton_root__ZYop_"
                    target="_blank"
                    href="https://www.amazon.co.uk/gp/aw/d/B0GNT52B87/ref=tmm_aud_swatch_0"
                  >
                    <picture className="imageButton_image__FvH21 image_root__mq3ej image_loaded__zdWuW">
                      <img
                        alt=""
                        loading="lazy"
                        width="63"
                        height="40"
                        decoding="async"
                        style={{ color: "transparent", opacity: "1" }}
                        src="/assets/b24a5e73041111be5a5f09ef537a4d988d1a8d29-63x40.svg"
                      />
                    </picture>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gallery_viewport__5u8Ah">
          <div
            className="gallery_container__M28yn"
            style={{ transform: "translate3d(0px, 0px, 0px)" }}
          >
            <div
              className="gallery_slide__psAbg"
              style={{ transform: "translate3d(0px, 0px, 0px)" }}
            >
              <div className="gallery_parallax__F8eWb">
                <div
                  className="gallery_parallax__layer__fEGWs"
                  style={{ transform: "translateY(0%)" }}
                >
                  <picture className="image_root__mq3ej image_loaded__zdWuW">
                    <img
                      alt=""
                      loading="lazy"
                      width="11567"
                      height="5985"
                      decoding="async"
                      style={{ color: "transparent", opacity: "1" }}
                      sizes="94vw"
                      src="/assets/33351f4dd4970eb578789f05e3116cad1afd8435-11567x5985.avif"
                    />
                  </picture>
                </div>
              </div>
            </div>
            <div className="gallery_slide__psAbg">
              <div className="gallery_parallax__F8eWb">
                <div
                  className="gallery_parallax__layer__fEGWs"
                  style={{ transform: "translateY(-40%)" }}
                >
                  <picture className="image_root__mq3ej image_loaded__zdWuW">
                    <img
                      alt=""
                      loading="lazy"
                      width="5664"
                      height="3144"
                      decoding="async"
                      style={{ color: "transparent", opacity: "1" }}
                      sizes="94vw"
                      src="/assets/8a8d0f2f80d5aa8c28c081863e5a3158600af15e-5664x3144.jpeg"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="mediaBanner_root__iR8_Z" data-nav-theme="dark">
        <button
          className="link_root__iDASX link_noUnder__gFrbm mediaBanner_overlayLink__Ce__l"
          aria-label="Ver video institucional de FUNDEPACIFICO ONG Internacional"
          data-hover="component"
        ></button>
        <div className="mediaBanner_video__SM94J video_video__EfQ69 video_lazy__Wx4tX video_parallax__HGkT_ video_clickable__Iunlt">
          <video
            className="video_hidden__mX2zp"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            src="/teacher-training-program-preview_1080p.mp4"
          ></video>
        </div>
        <div className="mediaBanner_content__M2HgD">
          <div className="mediaBanner_tag__4fTlv text_tag__kpI4A">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              fill="none"
              viewBox="0 0 8 8"
            >
              <path fill="#fff" d="M0 0h8v8H0z"></path>
            </svg>
            <h2>Nuestro compromiso</h2>
          </div>
          <div className="mediaBanner_heading__hS3gO text_l__zBmW8">
            Trabajamos desde los territorios para convertir alianzas, proyectos
            y recursos en bienestar real para las comunidades.
          </div>
        </div>
      </section>
      <section className="desktopView_root__zLZeZ" style={{ height: "600vh" }}>
        <div className="desktopView_inner__u7n6a">
          <div className="desktopView_innerWrap__l88nM">
            <div className="desktopView_tag__X9iQl text_tag__kpI4A">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                fill="none"
                viewBox="0 0 8 8"
              >
                <path fill="#1A1A1A" d="M0 0h8v8H0z"></path>
              </svg>
              <h2>¿Qué hacemos?</h2>
            </div>
            <div className="desktopView_item__knw15 desktopView_active___w9Ac">
              <div className="desktopView_heading__Jv0_3 text_m__Uz6HW">
                Gestionamos vivienda digna para comunidades vulnerables.
              </div>
              <div className="desktopView_body__FdDfg text_p__79svp text_dgrey__9S_lE">
                <p>
                  Formulamos y acompanamos proyectos habitacionales con alto
                  componente social, participacion comunitaria y gestion de
                  recursos.
                </p>
              </div>
              <a
                className="button_root__fMfbx button_fill__dFeum button_colorGreen__wmPps button_textBlack__AagpH text_cta__jYwZ7"
                target="_self"
                href="/what-we-do#vivienda-digna"
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
                <span>Mas informacion</span>
              </a>
            </div>
            <div className="desktopView_item__knw15">
              <div className="desktopView_heading__Jv0_3 text_m__Uz6HW">
                Fortalecemos capacidades mediante formacion comunitaria.
              </div>
              <div className="desktopView_body__FdDfg text_p__79svp text_dgrey__9S_lE">
                <p>
                  Realizamos talleres, diplomados, seminarios, proyectos de
                  investigacion y acompanamiento para abrir oportunidades
                  educativas y productivas.
                </p>
              </div>
              <a
                className="button_root__fMfbx button_fill__dFeum button_colorGreen__wmPps button_textBlack__AagpH text_cta__jYwZ7"
                target="_self"
                href="/what-we-do#educacion-formacion"
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
                <span>Mas informacion</span>
              </a>
            </div>
            <div className="desktopView_item__knw15">
              <div className="desktopView_heading__Jv0_3 text_m__Uz6HW">
                Impulsamos emprendimientos comunitarios y agroindustriales.
              </div>
              <div className="desktopView_body__FdDfg text_p__79svp text_dgrey__9S_lE">
                <p>
                  Acompanamos cooperativas y asociaciones para crear unidades
                  productivas agropecuarias, agroindustriales y de servicios.
                </p>
              </div>
              <a
                className="button_root__fMfbx button_fill__dFeum button_colorGreen__wmPps button_textBlack__AagpH text_cta__jYwZ7"
                target="_self"
                href="/what-we-do#emprendimiento-agroindustria"
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
                <span>Mas informacion</span>
              </a>
            </div>
            <div className="desktopView_item__knw15">
              <div className="desktopView_heading__Jv0_3 text_m__Uz6HW">
                Construimos redes de apoyo con comunidades y aliados.
              </div>
              <div className="desktopView_body__FdDfg text_p__79svp text_dgrey__9S_lE">
                <p>
                  Articulamos organizaciones, cooperaciones sociales e
                  instituciones para ampliar alternativas de desarrollo local.
                </p>
              </div>
              <a
                className="button_root__fMfbx button_fill__dFeum button_colorGreen__wmPps button_textBlack__AagpH text_cta__jYwZ7"
                target="_self"
                href="/what-we-do#redes-apoyo"
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
                <span>Mas informacion</span>
              </a>
            </div>
            <div className="desktopView_item__knw15">
              <div className="desktopView_heading__Jv0_3 text_m__Uz6HW">
                Promovemos obras civiles con sentido comunitario.
              </div>
              <div className="desktopView_body__FdDfg text_p__79svp text_dgrey__9S_lE">
                <p>
                  Gestionamos escenarios deportivos y culturales, centros
                  educativos, vias terciarias y espacios comunitarios alineados
                  con el objeto social.
                </p>
              </div>
              <a
                className="button_root__fMfbx button_fill__dFeum button_colorGreen__wmPps button_textBlack__AagpH text_cta__jYwZ7"
                target="_self"
                href="/what-we-do#obras-civiles"
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
                <span>Mas informacion</span>
              </a>
            </div>
            <div className="desktopView_scrollText__Y8mmO">
              <div
                className="desktopView_itemTag__X2t60 text_sp__zYahz desktopView_active___w9Ac"
                role="button"
                tabIndex="0"
                aria-label="Ir a Vivienda digna"
              >
                <span className="desktopView_navText__zISiD">Vivienda</span>
                <div
                  className="desktopView_progressBar__KDKxE"
                  style={{ width: "0%" }}
                ></div>
              </div>
              <div
                className="desktopView_itemTag__X2t60 text_sp__zYahz"
                role="button"
                tabIndex="0"
                aria-label="Ir a Capacitacion y formacion"
              >
                <span className="desktopView_navText__zISiD">
                  Formacion
                </span>
                <div
                  className="desktopView_progressBar__KDKxE"
                  style={{ width: "0%" }}
                ></div>
              </div>
              <div
                className="desktopView_itemTag__X2t60 text_sp__zYahz"
                role="button"
                tabIndex="0"
                aria-label="Ir a Emprendimiento y agroindustria"
              >
                <span className="desktopView_navText__zISiD">
                  Emprendimiento
                </span>
                <div
                  className="desktopView_progressBar__KDKxE"
                  style={{ width: "0%" }}
                ></div>
              </div>
              <div
                className="desktopView_itemTag__X2t60 text_sp__zYahz"
                role="button"
                tabIndex="0"
                aria-label="Ir a Redes de apoyo"
              >
                <span className="desktopView_navText__zISiD">
                  Redes de apoyo
                </span>
                <div
                  className="desktopView_progressBar__KDKxE"
                  style={{ width: "0%" }}
                ></div>
              </div>
              <div
                className="desktopView_itemTag__X2t60 text_sp__zYahz"
                role="button"
                tabIndex="0"
                aria-label="Ir a Obras civiles"
              >
                <span className="desktopView_navText__zISiD">Obras civiles</span>
                <div
                  className="desktopView_progressBar__KDKxE"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>
            <div
              className="desktopView_images__mY4tC desktopView_active___w9Ac"
              style={{ zIndex: "15", clipPath: "inset(0px 0px 0%)" }}
            >
              <picture className="desktopView_image__D4LYA image_root__mq3ej image_parallax___5ITN image_loaded__zdWuW">
                <img
                  alt="Vivienda digna"
                  loading="lazy"
                  width="1404"
                  height="1976"
                  decoding="async"
                  sizes="(min-width: 1025px) 24vw, 94vw"
                  src="/assets/23e65db63e52ff7906f61a2cfbfae23d15c33892-1404x1976.avif"
                  style={{
                    color: "transparent",
                    opacity: "1",
                    transform: "translate3d(0px, -5%, 0px)",
                    willChange: "transform",
                  }}
                />
              </picture>
            </div>
            <div className="desktopView_images__mY4tC" style={{ zIndex: "9" }}>
              <picture className="desktopView_image__D4LYA image_root__mq3ej image_parallax___5ITN image_loaded__zdWuW">
                <img
                  alt="Capacitacion y formacion"
                  loading="lazy"
                  width="1404"
                  height="1976"
                  decoding="async"
                  sizes="(min-width: 1025px) 24vw, 94vw"
                  src="/assets/ae85e1f1fd04e4429416977427d2431f88682a1b-1404x1976.avif"
                  style={{
                    color: "transparent",
                    opacity: "1",
                    transform: "translate3d(0px, -5%, 0px)",
                    willChange: "transform",
                  }}
                />
              </picture>
            </div>
            <div className="desktopView_images__mY4tC" style={{ zIndex: "2" }}>
              <picture className="desktopView_image__D4LYA image_root__mq3ej image_parallax___5ITN image_loaded__zdWuW">
                <img
                  alt="Emprendimiento y agroindustria"
                  loading="lazy"
                  width="1404"
                  height="1976"
                  decoding="async"
                  sizes="(min-width: 1025px) 24vw, 94vw"
                  src="/assets/f3ff4267f742dcc389da2b428da399a461005fc5-1404x1976.jpeg"
                  style={{
                    color: "transparent",
                    opacity: "1",
                    transform: "translate3d(0px, -5%, 0px)",
                    willChange: "transform",
                  }}
                />
              </picture>
            </div>
            <div className="desktopView_images__mY4tC" style={{ zIndex: "3" }}>
              <picture className="desktopView_image__D4LYA image_root__mq3ej image_parallax___5ITN image_loaded__zdWuW">
                <img
                  alt="Redes de apoyo"
                  loading="lazy"
                  width="1404"
                  height="1976"
                  decoding="async"
                  sizes="(min-width: 1025px) 24vw, 94vw"
                  src="/assets/b2a99047570a6606e1e7009d4d62a630f705fa9d-1404x1976.avif"
                  style={{
                    color: "transparent",
                    opacity: "1",
                    transform: "translate3d(0px, -5%, 0px)",
                    willChange: "transform",
                  }}
                />
              </picture>
            </div>
            <div className="desktopView_images__mY4tC" style={{ zIndex: "4" }}>
              <picture className="desktopView_image__D4LYA image_root__mq3ej image_parallax___5ITN image_loaded__zdWuW">
                <img
                  alt="Obras civiles"
                  loading="lazy"
                  width="1404"
                  height="1976"
                  decoding="async"
                  sizes="(min-width: 1025px) 24vw, 94vw"
                  src="/assets/529ffb690991e870fd14f04b26ea087e27c84d9f-1404x1976.avif"
                  style={{
                    color: "transparent",
                    opacity: "1",
                    transform: "translate3d(0px, -5%, 0px)",
                    willChange: "transform",
                  }}
                />
              </picture>
            </div>
          </div>
        </div>
      </section>
      <section className="mobileView_root__mHRYK" data-story-block="true">
        <div className="mobileView_tag__dsJYr text_tag__kpI4A">
          <SquareIcon />
          <h2>¿Qué hacemos?</h2>
        </div>
        {whatWeDoItems.map((item, index) => (
          <div
            className="mobileView_item__PH9G7"
            data-item={index}
            key={item.tag}
          >
            <div
              className="mobileView_itemTag__MGboV text_m__Uz6HW"
              data-tag={index}
            >
              <span className="desktopView_navText__zISiD">{item.tag}</span>
              <div
                className="desktopView_progressBar__KDKxE"
                style={{ width: "0%" }}
              ></div>
            </div>
            <picture className="mobileView_image__BwKgu image_root__mq3ej image_parallax___5ITN image_loaded__zdWuW">
              <img
                alt={item.alt}
                loading="lazy"
                width="1404"
                height="1976"
                decoding="async"
                sizes="94vw"
                src={item.src}
                style={{
                  color: "transparent",
                  opacity: "1",
                  transform: "translate3d(0px, 0%, 0px)",
                  willChange: "transform",
                }}
              />
            </picture>
            <div className="mobileView_heading__4jCIR text_m__Uz6HW">
              {item.heading}
            </div>
            <div className="mobileView_body__PL52c text_p__79svp text_dgrey__9S_lE">
              <p>{item.body}</p>
            </div>
            <a
              className="button_root__fMfbx button_fill__dFeum button_colorGreen__wmPps button_textBlack__AagpH text_cta__jYwZ7 mobileView_button__I4si8"
              target="_self"
              href={item.href}
            >
              <ArrowIcon />
              <span>{item.label}</span>
            </a>
          </div>
        ))}
      </section>
      <section
        className="statsBanner_root__dzRS_"
        data-stats-banner="true"
        data-nav-theme="dark"
        aria-label="Statistics banner"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="statsBanner_slides__e3dd8">
          <div className="statsBanner_slide__WAVLd" style={{ zIndex: "0" }}>
            <picture
              className="statsBanner_slideImage__C9iCt image_root__mq3ej image_parallax___5ITN image_loaded__zdWuW"
            >
              <source
                media="(max-width: 1024px)"
                srcSet="/assets/66d0709c1c2d611dacb98283f8d0a3e23abd577c-1560x2988.avif"
                width="1560"
                height="2988"
                sizes="100vw"
              />
              <source
                media="(min-width: 1025px)"
                srcSet="/assets/bb96b0cd61680eef3489e96d0b2ad89d0e8677a3-5760x3240.jpg"
                width="5760"
                height="3240"
                sizes="100vw"
              />
              <img
                alt="Indicadores institucionales"
                loading="lazy"
                width="1560"
                height="2988"
                decoding="async"
                style={{
                  color: "transparent",
                  opacity: "1",
                  transform: "translate3d(0px, -30%, 0px)",
                  willChange: "transform",
                }}
                sizes="100vw"
                src="/assets/66d0709c1c2d611dacb98283f8d0a3e23abd577c-1560x2988.avif"
              />
            </picture>
          </div>
          <div className="statsBanner_slide__WAVLd" style={{ zIndex: "1" }}>
            <picture
              className="statsBanner_slideImage__C9iCt image_root__mq3ej image_parallax___5ITN image_loaded__zdWuW"
            >
              <source
                media="(max-width: 1024px)"
                srcSet="/assets/5a92a532630f47bc3c651cfb10fc3af92a02deff-1560x2988.avif"
                width="1560"
                height="2988"
                sizes="100vw"
              />
              <source
                media="(min-width: 1025px)"
                srcSet="/assets/4562c458aefe61879856acd3636a5044df099091-5760x3240.jpg"
                width="5760"
                height="3240"
                sizes="100vw"
              />
              <img
                alt="Reconocimiento legal"
                loading="lazy"
                width="1560"
                height="2988"
                decoding="async"
                style={{
                  color: "transparent",
                  opacity: "1",
                  transform: "translate3d(0px, -30%, 0px)",
                  willChange: "transform",
                }}
                sizes="100vw"
                src="/assets/5a92a532630f47bc3c651cfb10fc3af92a02deff-1560x2988.avif"
              />
            </picture>
          </div>
          <div className="statsBanner_slide__WAVLd" style={{ zIndex: "2" }}>
            <picture
              className="statsBanner_slideImage__C9iCt image_root__mq3ej image_parallax___5ITN image_loaded__zdWuW"
            >
              <source
                media="(max-width: 1024px)"
                srcSet="/assets/295760e9d534e65a4a0bed447281bd59dd685938-1560x2988.avif"
                width="1560"
                height="2988"
                sizes="100vw"
              />
              <source
                media="(min-width: 1025px)"
                srcSet="/assets/5861455a0b25defffc74bf0e08b1b14a1ce1804d-5760x3240.jpg"
                width="5760"
                height="3240"
                sizes="100vw"
              />
              <img
                alt="Programas comunitarios"
                loading="lazy"
                width="1560"
                height="2988"
                decoding="async"
                style={{
                  color: "transparent",
                  opacity: "1",
                  transform: "translate3d(0px, -30%, 0px)",
                  willChange: "transform",
                }}
                sizes="100vw"
                src="/assets/295760e9d534e65a4a0bed447281bd59dd685938-1560x2988.avif"
              />
            </picture>
          </div>
          <div
            className="statsBanner_slide__WAVLd statsBanner_lastSlide__KUGJc"
            style={{ zIndex: "3" }}
          >
            <picture
              className="statsBanner_slideImage__C9iCt image_root__mq3ej image_parallax___5ITN image_loaded__zdWuW"
            >
              <source
                media="(max-width: 1024px)"
                srcSet="/assets/62af063e071796e6b8be9134436446562d2546ee-1560x2988.avif"
                width="1560"
                height="2988"
                sizes="100vw"
              />
              <source
                media="(min-width: 1025px)"
                srcSet="/assets/71922df895a21a396b1944127ed0c09497977bfd-5760x3240.jpg"
                width="5760"
                height="3240"
                sizes="100vw"
              />
              <img
                alt="Territorio y comunidad"
                loading="lazy"
                width="1560"
                height="2988"
                decoding="async"
                style={{
                  color: "transparent",
                  opacity: "1",
                  transform: "translate3d(0px, -30%, 0px)",
                  willChange: "transform",
                }}
                sizes="100vw"
                src="/assets/62af063e071796e6b8be9134436446562d2546ee-1560x2988.avif"
              />
            </picture>
          </div>
        </div>
        <div className="statsBanner_contentContainer__ClIxw">
          <div className="statsBanner_contentWrapper__Rbv_h">
            <div className="statsBanner_content__k7gzr">
              <div className="statsBanner_progress__pLLgc">
                <div
                  className="statsBanner_progressBar__biqo4"
                  style={{ "--progress": "0" }}
                ></div>
              </div>
              <div className="statsBanner_tag__uFrZO text_tag__kpI4A">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  fill="none"
                  viewBox="0 0 8 8"
                >
                  <path fill="#fff" d="M0 0h8v8H0z"></path>
                </svg>
                <h2>Trayectoria</h2>
              </div>
              <div
                className="statsBanner_item__zD5NK statsBanner_active__5eZ9u"
                data-item="0"
              >
                <div className="statsBanner_stat__3IdEb">
                  <div className="statsBanner_number__9mrb8 text_xl__DB7xZ">
                    2010
                  </div>
                  <div className="text_sp__zYahz">
                    Inicio de la labor social en Buenaventura.
                  </div>
                </div>
                <div className="statsBanner_stat__3IdEb">
                  <div className="statsBanner_number__9mrb8 text_xl__DB7xZ">
                    2018
                  </div>
                  <div className="text_sp__zYahz">
                    Resolución 1319 del Ministerio del Interior.
                  </div>
                </div>
                <div className="statsBanner_stat__3IdEb">
                  <div className="statsBanner_number__9mrb8 text_xl__DB7xZ">
                    2023
                  </div>
                  <div className="text_sp__zYahz">
                    Registro ESAL DIAN para la fundación.
                  </div>
                </div>
              </div>
              <div className="statsBanner_item__zD5NK" data-item="1">
                <div className="statsBanner_stat__3IdEb">
                  <div className="statsBanner_number__9mrb8 text_xl__DB7xZ">
                    5
                  </div>
                  <div className="text_sp__zYahz">
                    Pilares de acción comunitaria.
                  </div>
                </div>
                <div className="statsBanner_stat__3IdEb">
                  <div className="statsBanner_number__9mrb8 text_xl__DB7xZ">
                    2030
                  </div>
                  <div className="text_sp__zYahz">
                    Visión de reconocimiento nacional e internacional.
                  </div>
                </div>
                <div className="statsBanner_stat__3IdEb">
                  <div className="statsBanner_number__9mrb8 text_xl__DB7xZ">
                    1996
                  </div>
                  <div className="text_sp__zYahz">
                    Año de consolidación comunitaria en la región.
                  </div>
                </div>
              </div>
              <div className="statsBanner_item__zD5NK" data-item="2">
                <div className="statsBanner_stat__3IdEb">
                  <div className="statsBanner_number__9mrb8 text_xl__DB7xZ">
                    6
                  </div>
                  <div className="text_sp__zYahz">
                    Valores institucionales que guían el trabajo.
                  </div>
                </div>
                <div className="statsBanner_stat__3IdEb">
                  <div className="statsBanner_number__9mrb8 text_xl__DB7xZ">
                    2026
                  </div>
                  <div className="text_sp__zYahz">
                    Portafolio de servicios proyectado.
                  </div>
                </div>
                <div className="statsBanner_stat__3IdEb">
                  <div className="statsBanner_number__9mrb8 text_xl__DB7xZ">
                    100%
                  </div>
                  <div className="text_sp__zYahz">
                    Compromiso social y territorial con comunidades vulnerables.
                  </div>
                </div>
              </div>
              <div className="statsBanner_item__zD5NK" data-item="3">
                <div className="statsBanner_stat__3IdEb">
                  <div className="statsBanner_number__9mrb8 text_xl__DB7xZ">
                    1319
                  </div>
                  <div className="text_sp__zYahz">
                    Resolución de reconocimiento institucional.
                  </div>
                </div>
                <div className="statsBanner_stat__3IdEb">
                  <div className="statsBanner_number__9mrb8 text_xl__DB7xZ">
                    4
                  </div>
                  <div className="text_sp__zYahz">
                    Comunidades étnicas prioritarias en el litoral Pacífico.
                  </div>
                </div>
              </div>
              <a
                className="button_root__fMfbx button_fill__dFeum button_colorGreen__wmPps button_textWhite__iuxA3 text_cta__jYwZ7 statsBanner_button__qW4OO"
                target="_self"
                href="/impact"
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
                <span>Ver indicadores</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="callToAction_root__si_1l callToAction_location__Yxb2D">
        <div className="callToAction_content__HJTLC">
          <div className="callToAction_tag__J9MPX text_tag__kpI4A">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              fill="none"
              viewBox="0 0 8 8"
            >
              <path fill="#1A1A1A" d="M0 0h8v8H0z"></path>
            </svg>
            <h2>Sumese a la mision</h2>
          </div>
          <div className="callToAction_heading__qdhzD text_xxl__KYbm5">
            <h3 style={{ lineHeight: "1" }}>
              Construyamos <br />
              <span className="text_grey__nqMgS">Juntos</span>
            </h3>
          </div>
          <div className="callToAction_copy__YgOCK">
            <div className="callToAction_subHeading__SBo6g text_sh__zU3LH">
              <p>
                Las alianzas permiten convertir ideas y recursos en proyectos
                con impacto social, cultural, ambiental y economico.
              </p>
            </div>
            <div className="text_p__79svp text_dgrey__9S_lE">
              <p>
                Si representa una comunidad, institucion, empresa u
                organizacion social, podemos conversar sobre rutas de trabajo
                conjunto.
              </p>
            </div>
          </div>
          <div className="callToAction_buttons__Wd_XZ">
            <button
              className="button_root__fMfbx button_standard__YccnH button_colorGreen__wmPps text_cta__jYwZ7 callToAction_button__JtFqK"
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
              <span>Unirse</span>
            </button>
            <a
              className="button_root__fMfbx button_fill__dFeum button_colorGreen__wmPps button_textBlack__AagpH text_cta__jYwZ7 callToAction_button__JtFqK"
              target="_self"
              href="/about"
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
              <span>Nuestra mision</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

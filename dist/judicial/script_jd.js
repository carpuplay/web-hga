gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

const cont = document.querySelector("#container");
const pens = [
  {
    title: "Batllia",
    author: "La Batllia d’Andorra és la jurisdicció de primera instància i instrucció en tots els àmbits jurisdiccionals. S’estructura en seccions civil, penal, administrativa i secció especial d’instrucció.",
    url: "https://www.justicia.ad/batllia/",
    image: "https://www.justicia.ad/wp-content/uploads/2021/09/Curia-5-millorat.jpg",
  },
  {
    title: "Tribunal de Corts",
    author: "El Tribunal de Corts, a més de la seva competència per jutjar en primera instància en els processos seguits per delictes majors de forma col·legiada, esdevé competent per jutjar en primera instància en els processos que se segueixen per delictes menors i contravencions penals",
    url: "https://www.justicia.ad/tribunal-de-corts/",
    image: "https://www.justicia.ad/wp-content/uploads/2021/09/Curia6.jpg",
  },
  {
    title: "Tribunal Superior de Justícia",
    author: "El Tribunal Superior constitueix la més alta instància de l’organització judicial del Principat. És competent per a jutjar tots els recursos interposats contra les resolucions judicials adoptades en primera instància per la Batllia d’Andorra, en matèria civil i administrativa, en els límits fixats per la llei, i, en matèria penal.",
    url: "https://www.justicia.ad/tribunal-superior/",
    image: "https://www.justicia.ad/wp-content/uploads/2021/11/sala-magna.jpg",
  },
  {
    title: "Ministeri Fiscal",
    author: "El ministeri fiscal té la missió de vetllar per la defensa i l’aplicació de l’ordre jurídic, així com per la independència dels tribunals, i promoure davant d’aquests l’aplicació de la llei per salvaguardar els drets dels ciutadans i la defensa de l’interès general; de la mateixa manera actua d’acord amb els principis de legalitat, unitat i jerarquia interna.",
    url: "https://www.justicia.ad/ministeri-fiscal/",
    image: "https://www.justicia.ad/wp-content/uploads/2021/11/Sala_fiscalia.jpg",
  },
  {
    title: "Missió i composició - Consell Superior",
    author: "Es compon de cinc membres designats entre andorrans majors de vint-i-cinc anys i coneixedors de l’Administració de Justícia, un per cada Copríncep, un pel Síndic General, un pel Cap de Govern i un pels Magistrats i Batlles, sent el presidit per la persona designada pel Síndic General.",
    url: "https://www.justicia.ad/consell-superior/",
    image: "https://www.justicia.ad/wp-content/uploads/2021/11/membres-consell.jpg",
  },
];
const shuffledPens = gsap.utils.shuffle(pens);
shuffledPens.forEach((pen, i) => {
  let cardHTML = `
  
  <div class="section">
     <a href="${pen.url}" target="_blank" class="card">
      <img src="${pen.image}" alt="">
      </a>
      <div class="hide">
        <h2>${pen.title}</h2>
      </div>
      <p>${pen.author}</p>
  </div> 
  
  `;
  if (i == pens.length - 1) {
    cardHTML = `
    <div class="section">
       <a href="${pen.url}" target="_blank" class="card">
      <img src="${pen.image}" alt="">
      </a>
      <div class="hide">
        <h2>${pen.title}</h2>
      </div>
      <p>${pen.author}</p>
  </div> 
   <div class="section end">
   <div class="hide">
      <h2>Esperem que estigui complet</h2>
   </div>
   </div>`;
  }

  cont.insertAdjacentHTML("beforeend", cardHTML);
});

// create the scrollSmoother before your scrollTriggers
const smoother = ScrollSmoother.create({
  smooth: 1.5
});
smoother.paused(true);

let splitHeading = new SplitText(".heading h1", { type: "chars" });
let chars = splitHeading.chars;

gsap.set(".green", { opacity: 1, scaleX: 0, scaleY: 0.005 });
gsap.set(".heading", { opacity: 0.1, transformOrigin: "center" });

let intro = gsap.timeline({
  onComplete: () => {
    smoother.paused(false);
    gsap.set(".heading", { overflow: "visible" });
  }
});

intro
  .to(".green", {
    scaleX: 1,
    ease: "expo.out",
    transformOrigin: "center center"
  })
  .to(".green", {
    scaleY: 1,
    duration: 0.8,
    ease: "expo.out",
    transformOrigin: "center center"
  })
  .set("header, footer, #smooth-content", { autoAlpha: 1 })
  .to(".green", {
    scaleY: 0,
    ease: "sine.out",
    transformOrigin: "top center"
  })
  .from(chars, {
    opacity: 0,
    duration: 0.8,
    yPercent: 100,
    ease: "expo.out",
    stagger: 0.03
  });

let scrollTween = gsap.to(container, {
  x: () => -(cont.scrollWidth - document.documentElement.clientWidth) + "px",
  ease: "none",
  scrollTrigger: {
    trigger: cont,
    invalidateOnRefresh: true,
    pin: true,
    scrub: true,
    end: () => "+=" + cont.offsetWidth * 10
  }
});

let sections = gsap.utils.toArray(".section");

gsap.to(chars, {
  duration: 0.8,
  yPercent: "random(-300, 300)",
  xPercent: "random(-300, 300)",
  rotate: "random(-360, 360)",
  ease: "expo.out",
  stagger: 0.03,
  immediateRender: false,
  scrollTrigger: {
    trigger: ".section--lg",
    start: "left left",
    scrub: true,
    end: "right left",
    containerAnimation: scrollTween
  }
});

sections.forEach((section, i) => {
  let card = section.querySelector(".card");
  let text = section.querySelector("h2");
  let p = section.querySelector("p");

  let mySplitText = new SplitText(text, { type: "chars" });
  let chars = mySplitText.chars;

  gsap.set(chars, { yPercent: 120 });
  gsap.set(card, { z: 0 });
  gsap.set(p, { opacity: 0 });

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "left right",
      end: "left center",
      scrub: true,
      containerAnimation: scrollTween,
      onLeave: () => {
        gsap.set(chars, { yPercent: 120, opacity: 1 });
        gsap.to(chars, {
          duration: 0.8,
          yPercent: 0,
          ease: "expo.out",
          stagger: 0.03
        });
        gsap.to(p, {
          opacity: 0.6,
          duration: 0.5,
          delay: 0.4
        });
      },
      onEnterBack: () => {
        gsap.to([chars, p], {
          opacity: 0,
          duration: 0.33
        });
      }
    }
  });

  tl.from(card, {
    y: `random([-${window.innerHeight * 2}, ${window.innerHeight * 2}])`,
    rotationX: 360,
    rotationZ: 360,
    z: -2000,
    xPercent: 100,
    opacity: 0
  });
});
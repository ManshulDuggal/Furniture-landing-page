let controller;
let slideScene;
let fashionScene;

function animateSlides() {
  //init controller
  controller = new ScrollMagic.Controller();

  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-container");
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    //gspap
    // gsap.to(revealImg, 1,{x: '100%'})
    // //selecting the object, time duration, {property}
    // gsap.to(revealText, 1,{x: '100%'})

    const slide1 = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "power2.out",
      },
    });
    slide1.fromTo(
      revealImg,
      {
        x: "0%",
      },
      {
        x: "100%",
      }
    );
    // {} objects stating where to animate from and where to go to.
    slide1.fromTo(
      img,
      {
        scale: 3,
      },
      {
        scale: 1,
      },
      " -=0.6"
    );
    slide1.fromTo(
      revealText,
      {
        x: "0%",
      },
      {
        x: "100%",
      },
      "-=0.5"
    );
    slide1.fromTo(
      nav,
      {
        y: "-100%",
      },
      {
        y: "0%",
      },
      "-=1"
    );

    //creating a scene to add effects while scrolling

    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.6,
      reverse: false,
    })
      //triggers or tweens and we can pass in the timeline we mad eearlier.
      .setTween(slide1)
      //   .addIndicators({
      //     colorStart: "white",
      //     colorTrigger: "white",
      //     name: "slide",
      //   })
      .addTo(controller);
    //new animation

    const page2 = gsap.timeline();
    let nextSlide = slide.length - 1 === index ? "end" : slides[index + 1];
    page2.fromTo(
      nextSlide,
      {
        y: "0%",
      },
      {
        y: "10%",
      }
    );
    page2.fromTo(
      slide,
      {
        opacity: 1,
        scale: 1,
      },
      {
        opacity: 0,
        scale: 0.5,
      }
    );
    page2.fromTo(
      nextSlide,
      {
        y: "10%",
      },
      {
        y: "0%",
      },
      "-=0.5"
    );
    //new scene creating
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      //duration is gonna gonna last the whole height of the slide.
      triggerHook: 0.01,
    })

      //   .addIndicators({
      //     colorStart: "white",
      //     colorTrigger: "white",
      //     name: "page",
      //     indent: 200,
      //   })
      .setPin(slide, {
        pushFollowers: false,
      }) //so that the content come right on top of the prev page
      .setTween(page2)
      .addTo(controller);
  });
}
let mouseCursor = document.querySelector(".cursor");
let mouseText = mouseCursor.querySelector("span");
let burgerNav = document.querySelector(".burger-nav");
function cursor(e) {
  mouseCursor.style.top = "calc(" + e.pageY + "px - 1rem)";
  mouseCursor.style.left = "calc(" + e.pageX + "px - 1rem)";
}

function activeCursor(e) {
  const item = e.target;
  if (item.id === "logo" || item.classList.contains("burger-nav")) {
    mouseCursor.classList.add("nav-active");
    console.log(mouseCursor);
  } else {
    mouseCursor.classList.remove("nav-active");
  }
  if (item.classList.contains("explore")) {
    mouseCursor.classList.add("explore-active");
    gsap.to(".title-swipe", 1, { y: "0%" });
    //mouseText.innerText = "Tap";
  } else {
    mouseCursor.classList.remove("explore-active");
    gsap.to(".title-swipe", 1, { y: "100%" });
    //mouseText.innerText = "Tap ";
  }
}
function fullNav(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "30" });
    gsap.to(".line2", 0.5, { rotate: "30" });
    gsap.to(".line3", 0.5, { rotate: "30" });
    gsap.to(".navbar-full", 1, { clipPath: "circle(2500px at 100% -10%)" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0" });
    gsap.to(".line2", 0.5, { rotate: "0" });
    gsap.to(".line3", 0.5, { rotate: "0" });

    gsap.to(".navbar-full", 1, { clipPath: "circle(50px at 100% -10%)" });
    document.body.classList.remove("hide");
  }
}
//barba page transitions
const logo = document.querySelector("#logo");
barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateSlides();
        logo.href = "./index.html";
      },
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: "furniture",
      beforeEnter() {
        logo.href = "../index.html";
        barbaAnimation();
        console.log(slides);
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      },
    },
  ],
  transitions: [
    {
      leave({ current, next }) {
        let done = this.async();

        const timeLine = gsap.timeline({ defaults: { ease: "power3.inOut" } });
        timeLine.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        timeLine.fromTo(
          ".swipe",
          0.5,
          { x: "-100%" },
          { x: "0%", onComplete: done },
          "-=0.2"
        );
      },
      enter({ current, next }) {
        let done = this.async();
        window.scrollTo(0, 0);
        const timeLine = gsap.timeline({ defaults: { ease: "power3.inOut" } });
        timeLine.fromTo(
          ".swipe",
          0.5,
          { x: "0%" },
          { x: "-100%", stagger: 0.25, onComplete: done }
        );
        timeLine.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
      },
    },
  ],
});
function barbaAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".style-slide");
  console.log(slides);
  slides.forEach((slide, index, slides) => {
    const slideA = gsap.timeline({ defaults: { duration: 1 } });
    
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    console.log(nextSlide);
    const nextImg = nextSlide.querySelector("img");
    console.log(nextImg);
    slideA.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideA.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideA.fromTo(nextImg, { x: "50%" }, { x: "0%" });
    //Scene
    detailScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideA)
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "detailScene"
      // })
      .addTo(controller);
  });
}

//event listeners
burgerNav.addEventListener("click", fullNav);
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);

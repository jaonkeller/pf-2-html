console.log("Let PF JS begin...");
const body = document.querySelector('body');




// ------------------------------------------------
// Load

(() => {
  const loads = document.querySelectorAll('.load');
  loads.forEach(entry => {
    entry.classList.add('d-show');
  });
})();





// ------------------------------------------------
// Rellax.js

const rellax = new Rellax('.rellax', {
  breakpoints:[1, 768, 1201],
  // relativeToWrapper: true,
  // wrapper:'.showcase',
});





// ------------------------------------------------
//Flickity

(() => {
  const elem = document.querySelector('.main-carousel');

  if(elem){
    const flkty = new Flickity( elem, {
      // options
      cellAlign: 'left',
      contain: true
    });
  }
  else{
    console.log("No Flickity");
  }
})();





// ------------------------------------------------
// Observer

(() => {
  const test = 'observe starts';
  const sections = document.querySelectorAll('.v-animate');
  const introSection = document.querySelector('.section.intro');
  const navPageTop = document.querySelector('#nav-pagetop');
  const navWorks = document.querySelector('#nav-works');
  const options = {
    root: null,
    threshold: 0,
    rootMargin: "-70px"
  };
  const observer = new IntersectionObserver(function(entries, observer){    
    entries.forEach(entry => {
      // Page top navi intersecting check
      if(entry.target.classList.contains('intro')){
        if (!entry.isIntersecting) {
          console.log('Not intersecting with nav');
          navPageTop.classList.add('v-active');
          navWorks.classList.add('v-active');
          console.log(navPageTop);
        }else{
          console.log('It is intersecting with nav');
          navPageTop.classList.remove('v-active');
          navWorks.classList.remove('v-active');
        }
      }
      // Others intersecting check
      else{
        if (entry.isIntersecting){
          entry.target.classList.add('v-active');
          observer.unobserve(entry.target);
        }else{
          entry.target.classList.remove('v-active');
        }  
      }    
    });
  }, options);
  
  sections.forEach(section => {
    observer.observe(section);  
  });
})();





// ------------------------------------------------
// Overlay

(() => {
  let navFlag = false;
  let worksFlag = false;
  const worksBtn = document.querySelector('#nav-works');
  const worksBtnLinks = [...document.querySelectorAll('#nav-works .link')];
  const archivesOverlay = document.querySelector('#archives-overlay');
  const menuBtn = document.querySelector('#menu-btn');
  const menuOverlay = document.querySelector('#menu-overlay');
  console.log(worksBtnLinks);
  
  // Works Overlay
  worksBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (worksFlag){
      archivesOverlay.style.height = "0%";
      archivesOverlay.style.opacity = "0";
      body.classList.remove('open-overlay');
    }
    else {
      archivesOverlay.style.height = "100%";
      archivesOverlay.style.opacity = "1";
      body.classList.add('open-overlay');
    }
    worksFlag =! worksFlag;
    navFlag =! navFlag;
    menuBtn.classList.toggle('active');
    worksBtnLinks[0].classList.toggle('d-none');
    worksBtnLinks[1].classList.toggle('d-none');
    console.log(navFlag);
  });
  
  // Menu Overlay
  menuBtn.addEventListener("click", (e) => {
    if (navFlag && worksFlag){
      archivesOverlay.style.height = "0%";
      archivesOverlay.style.opacity = "0";
      worksBtnLinks[0].classList.toggle('d-none');
      worksBtnLinks[1].classList.toggle('d-none');
      body.classList.remove('open-overlay');
      worksFlag =! worksFlag;
    }
    else if (navFlag){
      menuOverlay.style.height = "0%";
      menuOverlay.style.opacity = "0";
      body.classList.remove('open-overlay');
    }
    else{
      menuOverlay.style.height = "100%";
      menuOverlay.style.opacity = "1";
      body.classList.add('open-overlay');
    }
    navFlag =! navFlag;
    console.log(navFlag);
    menuBtn.classList.toggle('active');
  });
})();





// ------------------------------------------------
// Smooth Scroll

window.addEventListener('load', function(event) {
  const easeInCubic = function (t) { return t*t*t } 
  const scrollElems = document.querySelectorAll('.scroll');
  const scrollToElem = (start, stamp, duration, scrollEndElemTop, startScrollOffset) => {
      const runtime = stamp - start;
      let progress = runtime / duration;
      const ease = easeInCubic(progress);
      
      progress = Math.min(progress, 1);
      console.log(startScrollOffset,startScrollOffset + (scrollEndElemTop * ease));
      
      const newScrollOffset = startScrollOffset + (scrollEndElemTop * ease);
      window.scroll(0, startScrollOffset + (scrollEndElemTop * ease));
  
      if(runtime < duration){
        requestAnimationFrame((timestamp) => {
          const stamp = new Date().getTime();
          scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
        })
      }
    }
  
  for(let i=0; i<scrollElems.length; i++){
    const elem = scrollElems[i];
    
    elem.addEventListener('click',function(e) {
      e.preventDefault();
      const scrollElemId = e.currentTarget.href.split('#')[1];
      const scrollEndElem = document.getElementById(scrollElemId);
      
      const anim = requestAnimationFrame(() => {
        const stamp = new Date().getTime();
        const duration = 600;
        const start = stamp;
        const startScrollOffset = window.pageYOffset;
        const scrollEndElemTop = scrollEndElem.getBoundingClientRect().top; 
        scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
        // scrollToElem(scrollEndElemTop);
        })
      })
    }
});





// ------------------------------------------------
//Accordion

(() => {
  const panels = document.querySelectorAll('.accordion .panel');

  panels.forEach(panel => {
    panel.addEventListener('click', (e) => {
      const desc = e.currentTarget.querySelector('.description');
      const h = desc.scrollHeight;
      console.log(h);
      if(e.currentTarget.classList.contains("active")){
        e.currentTarget.classList.remove("active");
        desc.style.maxHeight = `0px`;
      }else{
        e.currentTarget.classList.add("active");
        desc.style.maxHeight = `${h}px`;
      }
    });
  });
})();





// ------------------------------------------------
// Set Height

function setHeights(targets){
  targets.forEach(target => {
    const h = target.scrollHeight;
    console.log(h);
    target.style.maxHeight = `${h}px`;
  });
}





// ------------------------------------------------
// Height Equalizer

function heightEqualizer(targets, mobile = false){
  let maxHeight = 0;
  targets.forEach((target, i) => {
    target.style.minHeight = 'auto';
    maxHeight = Math.max(target.offsetHeight, maxHeight);
  });
  if (mobile){
    targets.forEach((target, i) => {
      target.style.minHeight = `${maxHeight}px`;
    });
  } else{
    // Set height applied only more than mobile
    if (innerWidth >= 768) {
      targets.forEach((target, i) => {
        target.style.minHeight = `${maxHeight}px`;
      });
    }
  }
}
heightEqualizer(document.querySelectorAll('.career .year'), true);
heightEqualizer(document.querySelectorAll('.career .title'), true);
heightEqualizer(document.querySelectorAll('.career .location'), true);





// ------------------------------------------------
// Window Resize

window.addEventListener('resize', () => {
  setHeights(document.querySelectorAll('.accordion .panel.active .description'));
  heightEqualizer(document.querySelectorAll('.career .year'), true);
  heightEqualizer(document.querySelectorAll('.career .title'), true);
  heightEqualizer(document.querySelectorAll('.career .location'), true);
});





// ------------------------------------------------
// Pre Loading

(() => {
  const loading = document.querySelector('#preloader-overlay');
  const wrapper = document.querySelector('body > .wrapper');

  if (loading){
    window.addEventListener('load',function(){
      const counter = document.querySelector('.progress span');
      const speed = 300; 
      const timer = 1600;

      (() => {
        const updateCount = () => {
          const target = counter.getAttribute('data-target');
          const count = +counter.innerText;
          const inc = target / speed;

          if (count < target) {
              counter.innerText = `${Math.ceil(count + inc)}`;
              setTimeout(updateCount, 1);
          } else {
            console.log('Loaded ..');
            counter.innerText = target;
            setTimeout(() => {
              document.querySelector('body').classList.add("loaded");
              wrapper.classList.add("show");
            }, timer);
              
          }
        };

        updateCount();
      })();
    });
  }
  else{
    console.log("No loading");
    wrapper.classList.add("show");
  }
})();

window.onload = () => {

  let currentScroll = 0;
  let targetScroll = 0;
  document.querySelector('#see-more-arrow').onclick = event => {
    const target = event.target;
    const parentSection = target.parentElement;
    const nextSection = parentSection.nextElementSibling;
    targetScroll = (nextSection.offsetHeight > nextSection.offsetTop) ? nextSection.offsetTop : nextSection.offsetHeight;
    currentScroll = window.scrollY;
    softScroll();
  }

  const ease = 0.075;
  let animationFrameId;
  const softScroll = () => {
    const diff = targetScroll - window.scrollY;
    const delta = Math.abs(diff) < 0.5 ? 0 : diff * ease;
    if (delta) {
      currentScroll += delta;
      animationFrameId = requestAnimationFrame(softScroll);
      window.scrollTo(0, currentScroll);
    } else {
      cancelAnimationFrame(animationFrameId);
      targetScroll = currentScroll;
    }
  }

  window.onmousewheel = () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  }

  window.ontouchmove = () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  }

  let sections = Array.from(document.querySelectorAll('.content-section'));
  window.onscroll = () => {
    updateScrollAnimation(sections);
  }

  updateScrollAnimation(sections);
}

const updateScrollAnimation = (sections) => {
  let scrollY = window.scrollY;
  sections.forEach(section => {
    const sectionOffsetTop = section.offsetTop - (window.innerHeight * 0.8);
    if (scrollY >= sectionOffsetTop)
      if (!section.classList.contains('show'))
        section.classList.add('show');
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Modern scroll animations with enhanced Intersection Observer
  initScrollAnimations();

  // Enhanced draggable navigation with boundaries
  const draggableDiv = document.getElementById("draggable-div");
  if (draggableDiv) {
    initDraggableNav(draggableDiv);
  }

  // Set active navigation state
  setActiveNavLink();

  function initScrollAnimations() {
    // Enhanced Intersection Observer configuration
    const observerOptions = {
      root: null,
      rootMargin: '-50px 0px -50px 0px', // Start animation 50px before element enters viewport
      threshold: [0.1, 0.3, 0.6] // Multiple thresholds for progressive animations
    };

    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target;

        if (entry.isIntersecting) {
          // Add visible class when element comes into view
          element.classList.add('is-visible');

          // Debug: Log which elements are becoming visible
          if (element.id || element.className) {
            console.log(`✨ Element visible:`, element.id || `.${element.className.split(' ').join('.')}`);
          }

          // Remove animation classes after animation completes for performance
          const animationDuration = getComputedStyle(element)
            .getPropertyValue('--animation-duration') || '0.8s';
          const durationMs = parseFloat(animationDuration) * 1000;

          setTimeout(() => {
            element.classList.remove('animate-on-scroll');
            element.style.willChange = 'auto';
          }, durationMs + 100);

          // Optional: Stop observing the element after it's visible
          if (entry.intersectionRatio > 0.6) {
            animationObserver.unobserve(element);
          }
        }
      });
    }, observerOptions);

    // Find all elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.animate-on-scroll, .animate-fade-up, .animate-fade-down, .animate-fade-left, .animate-fade-right, .animate-scale, .animate-fade, .animate-stagger, section.animate-section, section:not(.animate-section)'
    );

    animatedElements.forEach((element) => {
      // Set initial will-change for performance
      element.style.willChange = 'opacity, transform';

      // Start observing
      animationObserver.observe(element);
    });

    // Debug: Log how many elements are being observed
    console.log(`🎬 Animation system initialized - observing ${animatedElements.length} elements`);

    // Handle resize events for responsive animations
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Recalculate animations on resize
        animatedElements.forEach(element => {
          if (element.classList.contains('is-visible')) {
            // Reapply visible state for new viewport
            element.classList.remove('is-visible');
            void element.offsetWidth; // Force reflow
            element.classList.add('is-visible');
          }
        });
      }, 250);
    });
  }

  // Enhanced draggable navigation with boundaries
  const navElement = document.getElementById("draggable-div");
  if (navElement) {
    initDraggableNav(navElement);
  }

  function initDraggableNav(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const dragHandle = document.getElementById("mydivheader");

    // Store initial position
    const initialTop = elmnt.style.top || '1.5rem';
    const initialLeft = elmnt.style.left || '1.5rem';

    // Add double-click to reset position
    if (dragHandle) {
      dragHandle.ondblclick = resetPosition;
      dragHandle.onmousedown = dragMouseDown;
      dragHandle.ontouchstart = dragTouchStart;
    }

    function resetPosition() {
      elmnt.style.top = initialTop;
      elmnt.style.left = initialLeft;
      // Add a little animation feedback
      elmnt.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        elmnt.style.transition = '';
      }, 300);
    }

    function dragMouseDown(e) {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function dragTouchStart(e) {
      e.preventDefault();
      const touch = e.touches[0];
      pos3 = touch.clientX;
      pos4 = touch.clientY;
      document.ontouchend = closeDragElement;
      document.ontouchmove = elementTouchDrag;
    }

    function elementDrag(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      const newTop = elmnt.offsetTop - pos2;
      const newLeft = elmnt.offsetLeft - pos1;

      // Apply boundary constraints
      const constrainedPosition = constrainToBounds(newTop, newLeft, elmnt);
      elmnt.style.top = constrainedPosition.top + "px";
      elmnt.style.left = constrainedPosition.left + "px";
    }

    function elementTouchDrag(e) {
      e.preventDefault();
      const touch = e.touches[0];
      pos1 = pos3 - touch.clientX;
      pos2 = pos4 - touch.clientY;
      pos3 = touch.clientX;
      pos4 = touch.clientY;

      const newTop = elmnt.offsetTop - pos2;
      const newLeft = elmnt.offsetLeft - pos1;

      const constrainedPosition = constrainToBounds(newTop, newLeft, elmnt);
      elmnt.style.top = constrainedPosition.top + "px";
      elmnt.style.left = constrainedPosition.left + "px";
    }

    function constrainToBounds(top, left, element) {
      const rect = element.getBoundingClientRect();
      const margin = 10; // Keep at least 10px visible

      // Get viewport dimensions
      const maxTop = window.innerHeight - rect.height + margin;
      const maxLeft = window.innerWidth - rect.width + margin;
      const minTop = -margin;
      const minLeft = -margin;

      // Constrain to boundaries
      const constrainedTop = Math.max(minTop, Math.min(top, maxTop));
      const constrainedLeft = Math.max(minLeft, Math.min(left, maxLeft));

      return { top: constrainedTop, left: constrainedLeft };
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
      document.ontouchend = null;
      document.ontouchmove = null;
    }

    // Recalculate boundaries on window resize
    window.addEventListener('resize', () => {
      const currentTop = elmnt.offsetTop;
      const currentLeft = elmnt.offsetLeft;
      const constrainedPosition = constrainToBounds(currentTop, currentLeft, elmnt);
      elmnt.style.top = constrainedPosition.top + "px";
      elmnt.style.left = constrainedPosition.left + "px";
    });
  }

  // Set active navigation link based on current page
  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;

      // Remove active class from all links first
      link.classList.remove('active');

      // Check if this is the current page
      // Handle both exact matches and root path
      if (linkPath === currentPath ||
          (currentPath === '/' && linkPath === '/') ||
          (currentPath !== '/' && linkPath !== '/' && currentPath.startsWith(linkPath))) {
        link.classList.add('active');
      }
    });
  }
});
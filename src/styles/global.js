document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer for section animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  })
  const hiddenElements = document.querySelectorAll("section");
  hiddenElements.forEach((el) => observer.observe(el));

  // Enhanced draggable navigation with boundaries
  const draggableDiv = document.getElementById("draggable-div");
  if (draggableDiv) {
    initDraggableNav(draggableDiv);
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
});
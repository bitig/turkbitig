// Copyright (C) turkbitig.com. All Rights Reserved.

document.addEventListener('DOMContentLoaded', () => {
  const state = {
    clickedRootId: null,
    clickedIndex: null
  };
  const CONTAINER_SELECTOR = '[id] .irk, [id] .iblat';
  const processContainers = () => {
    const containers = document.querySelectorAll(CONTAINER_SELECTOR);
    containers.forEach(element => {
      const parts = element.textContent.split(':');
      element.innerHTML = parts
        .map((word, index) =>
          `<span class="word" data-index="${index}">${word}</span>${index < parts.length - 1 ? ':' : ''}`
        )
        .join('');
    });
  };
  const bindEventListeners = () => {
    document.addEventListener('mouseover', handleWordInteraction);
    document.addEventListener('mouseout', handleWordInteraction);
    document.addEventListener('click', handleWordInteraction);

    document.querySelectorAll(CONTAINER_SELECTOR).forEach(container => {
      container.addEventListener('mouseleave', clearHoverHighlight);
    });
  };
  const handleWordInteraction = (e) => {
    const wordElement = e.target.closest('.word');
    if (!wordElement) {
      if (e.type === 'click') clearClickedHighlight();
      return;
    }

    const rootElement = wordElement.closest('[id]');
    if (!rootElement) return;

    const rootId = rootElement.id;
    const newIndex = parseInt(wordElement.dataset.index, 10);

    if (e.type === 'click') {
      if (state.clickedRootId === rootId && state.clickedIndex === newIndex) {
        clearClickedHighlight();
      } else {
        updateClickedHighlight(rootElement, newIndex);
      }
    } else if (e.type === 'mouseover') {
      updateHoverHighlight(rootElement, newIndex);
    } else if (e.type === 'mouseout') {
      if (!wordElement.contains(e.relatedTarget)) {
        clearHoverHighlight();
      }
    }
  };
  const updateHoverHighlight = (rootElement, index) => {
    clearHoverHighlight();
    const words = rootElement.querySelectorAll(`.word[data-index="${index}"]`);
    for (const word of words) {
      word.classList.add('hover-highlight');
    }
  };
  const updateClickedHighlight = (rootElement, index) => {
    clearClickedHighlight();
    const words = rootElement.querySelectorAll(`.word[data-index="${index}"]`);
    for (const word of words) {
      word.classList.add('clicked-highlight');
    }
    state.clickedRootId = rootElement.id;
    state.clickedIndex = index;
  };
  const clearClickedHighlight = () => {
    const elements = document.querySelectorAll('.clicked-highlight');
    for (const el of elements) {
      el.classList.remove('clicked-highlight');
    }
    state.clickedRootId = null;
    state.clickedIndex = null;
  };
  const clearHoverHighlight = () => {
    const elements = document.querySelectorAll('.hover-highlight');
    for (const el of elements) {
      el.classList.remove('hover-highlight');
    }
  };
  processContainers();
  bindEventListeners();
});

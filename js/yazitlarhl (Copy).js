// Copyright (C) turkbitig.com. All Rights Reserved.

document.addEventListener('DOMContentLoaded', () => {
  const state = {
    currentContainer: null,
    currentIndex: null,
    clickedContainer: null,
    clickedIndex: null
  };

  const processContainers = () => {
    const containers = document.querySelectorAll('[id] .mu, [id] .mt');
    containers.forEach(element => {
      element.innerHTML = element.textContent
        .split(' ')
        .map((word, index) => `<span class="word" data-index="${index}">${word}</span> `)
        .join('');
    });
  };

  const bindEventListeners = () => {
    document.querySelectorAll('.word').forEach(word => {
      word.addEventListener('mouseover', handleWordInteraction);
      word.addEventListener('mouseleave', handleWordInteraction);
      word.addEventListener('click', handleWordInteraction);
    });
  };

  const handleWordInteraction = (e) => {
    const wordElement = e.target.closest('.word');
    if (!wordElement) {
      if (e.type === 'click') {
        clearClickedHighlight(state);
      }
      return;
    }

    const { containerId, newIndex } = getContainerDetails(wordElement);

    if (e.type === 'click') {
      updateClickedHighlight(containerId, newIndex, state);
    } else if (e.type === 'mouseover') {
      updateHoverHighlight(containerId, newIndex, state);
    } else if (e.type === 'mouseleave') {
      clearHoverHighlight();
    }
  };

  const getContainerDetails = (wordElement) => {
    const containerId = wordElement.closest('[id]').id;
    const newIndex = parseInt(wordElement.dataset.index);
    return { containerId, newIndex };
  };

  const updateHoverHighlight = (containerId, index, state) => {
    const container = document.getElementById(containerId);
    const words = container.querySelectorAll(`.word[data-index="${index}"]`);
    words.forEach(word => {
      if (!word.textContent.includes(':')) {
        word.classList.add('hover-highlight');
      }
    });
  };

  const updateClickedHighlight = (containerId, index, state) => {
    clearClickedHighlight(state);
    const container = document.getElementById(containerId);
    const words = container.querySelectorAll(`.word[data-index="${index}"]`);
    words.forEach(word => {
      if (!word.textContent.includes(':')) {
        word.classList.add('clicked-highlight');
      }
    });
  };

  const clearClickedHighlight = (state) => {
    document.querySelectorAll('.clicked-highlight').forEach(word => word.classList.remove('clicked-highlight'));
    state.clickedContainer = null;
    state.clickedIndex = null;
  };

  const clearHoverHighlight = () => {
    document.querySelectorAll('.hover-highlight').forEach(word => word.classList.remove('hover-highlight'));
  };

  processContainers();
  bindEventListeners();

  // Unbind event listeners when the script ends or the page is unloaded
  window.addEventListener('beforeunload', () => {
    document.querySelectorAll('.word').forEach(word => {
      word.removeEventListener('mouseover', handleWordInteraction);
      word.removeEventListener('mouseleave', handleWordInteraction);
      word.removeEventListener('click', handleWordInteraction);
    });
  });
});


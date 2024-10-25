document.addEventListener('DOMContentLoaded', () => {
    // State management using a single object
    const state = {
        currentContainer: null,
        currentIndex: null
    };

    // Process all containers once and cache selectors
    const processContainers = () => {
        const containers = document.querySelectorAll('[id] .mu, [id] .mt');
        containers.forEach(element => {
            element.innerHTML = element.textContent
                .split(' ')
                .map((word, index) => `<span class="word" data-index="${index}">${word}</span> `)
                .join('');
        });
    };

    // Single event handler for both mouseover and click
    const handleWordInteraction = (e) => {
        const wordElement = e.target.closest('.word');
        if (!wordElement) {
            if (e.type === 'click') {
                clearHighlight(state);
            }
            return;
        }

        const containerId = wordElement.closest('[id]').id;
        const newIndex = wordElement.dataset.index;

        if (containerId === state.currentContainer && newIndex === state.currentIndex) {
            return;
        }

        updateHighlight(containerId, newIndex, state);
    };

    // Update highlight state and DOM
    const updateHighlight = (containerId, index, state) => {
        clearHighlight(state);
        
        const container = document.getElementById(containerId);
        container.querySelectorAll(`.word[data-index="${index}"]`).forEach(word => {
            if (!word.textContent.includes(':')) {
                word.classList.add('highlight');
            }
        });

        state.currentContainer = containerId;
        state.currentIndex = index;
    };

    // Clear highlight state and DOM
    const clearHighlight = (state) => {
        document.querySelectorAll('.highlight')
            .forEach(word => word.classList.remove('highlight'));
        state.currentContainer = null;
        state.currentIndex = null;
    };

    // Initialize
    processContainers();

    // Event listeners
    document.addEventListener('mouseover', handleWordInteraction);
    document.addEventListener('click', handleWordInteraction);
});

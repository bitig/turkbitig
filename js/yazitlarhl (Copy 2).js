document.addEventListener('DOMContentLoaded', () => {
    // State management using a single object
    const state = {
        currentContainer: null,
        currentIndex: null,
        clickedContainer: null,
        clickedIndex: null
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
                clearClickedHighlight(state);
            }
            return;
        }

        const containerId = wordElement.closest('[id]').id;
        const newIndex = wordElement.dataset.index;

        if (e.type === 'click') {
            updateClickedHighlight(containerId, newIndex, state);
        } else if (e.type === 'mouseover') {
            updateHoverHighlight(containerId, newIndex, state);
        } else if (e.type === 'mouseleave') {
            clearHoverHighlight();
        }
    };

    // Update hover highlight
    const updateHoverHighlight = (containerId, index, state) => {
        // Clear previous hover highlights
        clearHoverHighlight();

        // Add hover highlight
        const container = document.getElementById(containerId);
        container.querySelectorAll(`.word[data-index="${index}"]`).forEach(word => {
            if (!word.textContent.includes(':')) {
                word.classList.add('hover-highlight');
            }
        });

        state.currentContainer = containerId;
        state.currentIndex = index;
    };

    // Update clicked highlight
    const updateClickedHighlight = (containerId, index, state) => {
        clearClickedHighlight(state);
        
        const container = document.getElementById(containerId);
        container.querySelectorAll(`.word[data-index="${index}"]`).forEach(word => {
            if (!word.textContent.includes(':')) {
                word.classList.add('clicked-highlight');
            }
        });

        state.clickedContainer = containerId;
        state.clickedIndex = index;
    };

    // Clear hover highlight
    const clearHoverHighlight = () => {
        document.querySelectorAll('.hover-highlight')
            .forEach(word => word.classList.remove('hover-highlight'));
    };

    // Clear clicked highlight
    const clearClickedHighlight = (state) => {
        document.querySelectorAll('.clicked-highlight')
            .forEach(word => word.classList.remove('clicked-highlight'));
        state.clickedContainer = null;
        state.clickedIndex = null;
    };

    // Initialize
    processContainers();

    // Event listeners - attached to word elements for accuracy
    document.querySelectorAll('.word').forEach(word => {
        word.addEventListener('mouseover', handleWordInteraction);
        word.addEventListener('mouseleave', handleWordInteraction);
        word.addEventListener('click', handleWordInteraction);
    });
});


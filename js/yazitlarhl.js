document.addEventListener('DOMContentLoaded', (event) => {
    let currentlyHighlightedContainerId = null; // Global tracker for highlighted container ID
    let currentlyHighlightedIndex = null; // Global tracker for highlighted index

    // Function to split text into words and wrap in spans for ALL containers
    function textToSpans() {
        var containers = document.querySelectorAll('[id]'); // Select all elements with an ID (assuming containers)
        containers.forEach((container) => {
            var elements = container.querySelectorAll('.mu,.mt');
            elements.forEach((element) => {
                var text = element.textContent.split(' '); // Split by space only, keeping colons intact
                var html = '';
                text.forEach((word, index) => {
                    html += `<span class="word" data-index="${index}">${word}</span> `;
                });
                element.innerHTML = html.trim();
            });
        });
    }

    // Prepare text for ALL containers
    textToSpans();

    // Highlight functionality scoped to container, with global container management
    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('word')) {
            var containerId = e.target.closest('div[id]').id;
            var newIndex = e.target.dataset.index;
            if (containerId!== currentlyHighlightedContainerId || newIndex!== currentlyHighlightedIndex) {
                highlightWord(containerId, newIndex);
                currentlyHighlightedContainerId = containerId;
                currentlyHighlightedIndex = newIndex;
            }
        }
    }, false);

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('word')) {
            var containerId = e.target.closest('div[id]').id;
            var newIndex = e.target.dataset.index;
            if (containerId!== currentlyHighlightedContainerId || newIndex!== currentlyHighlightedIndex) {
                highlightWord(containerId, newIndex);
                currentlyHighlightedContainerId = containerId;
                currentlyHighlightedIndex = newIndex;
            }
        } else {
            // Optional: Remove highlight on document click (for click event)
            removeHighlight();
            currentlyHighlightedContainerId = null;
            currentlyHighlightedIndex = null;
        }
    }, false);

    // Function to highlight word by index within a specific container, removing highlights from other containers
    function highlightWord(containerId, index) {
        removeHighlight(); // Remove any existing highlights across all containers
        var container = document.getElementById(containerId);
        var words = container.querySelectorAll('.word');
        words.forEach((word) => {
            if (word.dataset.index === index &&!word.textContent.includes(':')) { // Check if the word does not contain a colon
                word.classList.add('highlight');
            }
        });
    }

    // Function to remove all highlights across all containers
    function removeHighlight() {
        var allHighlightedWords = document.querySelectorAll('.highlight');
        allHighlightedWords.forEach((word) => {
            word.classList.remove('highlight');
        });
    }
});

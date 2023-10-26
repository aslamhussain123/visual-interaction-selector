document.addEventListener("DOMContentLoaded", function() {
    let selectionMode = false;

    function mockSendToGTM(element) {
        let elementType = '';
        let elementLabel = '';

        if (element.tagName === 'BUTTON') {
            elementType = 'button';
            elementLabel = element.textContent;
        } else if (element.tagName === 'A') {
            elementType = 'link';
            elementLabel = element.textContent;
        } else if (element.tagName === 'VIDEO') {
            elementType = 'video';
            elementLabel = 'Video';
        } else if (element.tagName === 'SELECT') {
            elementType = 'dropdown';
            elementLabel = element.options[element.selectedIndex].text;
        }

        console.log(`Event sent to GTM - Type: ${elementType}, Label: ${elementLabel}`);
    }

    document.getElementById('enterSelectionMode').addEventListener('click', function() {
        selectionMode = !selectionMode;
        if (selectionMode) {
            this.textContent = 'Exit Selection Mode';
        } else {
            this.textContent = 'Enter Selection Mode';
            let highlightedElems = document.querySelectorAll('.eventsContainer .hover-highlight');
            highlightedElems.forEach(elem => elem.classList.remove('hover-highlight'));
        }
    });

    const eventsContainer = document.querySelector('.eventsContainer');
    
    eventsContainer.addEventListener('mouseover', function(e) {
        if (selectionMode) {
            e.target.classList.add('hover-highlight');
            e.stopPropagation();
        }
    });

    eventsContainer.addEventListener('mouseout', function(e) {
        if (selectionMode) {
            e.target.classList.remove('hover-highlight');
        }
    });

    eventsContainer.addEventListener('click', function(e) {
        const clickedElement = e.target;
        if (selectionMode) {
            if (clickedElement.classList.contains('selected-for-tracking')) {
                clickedElement.classList.remove('selected-for-tracking');
            } else {
                clickedElement.classList.add('selected-for-tracking');
            }
            e.preventDefault();
        } else if (clickedElement.classList.contains('selected-for-tracking')) {
            mockSendToGTM(clickedElement);
        }
    });
});

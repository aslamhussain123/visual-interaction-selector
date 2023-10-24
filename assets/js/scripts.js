$(document).ready(function() {
    let selectionMode = false;

    function mockSendToGTM(element) {
        let elementType = '';
        let elementLabel = '';

        if ($(element).is('button')) {
            elementType = 'button';
            elementLabel = $(element).text();
        } else if ($(element).is('a')) {
            elementType = 'link';
            elementLabel = $(element).text();
        } else if ($(element).is('video')) {
            elementType = 'video';
            elementLabel = 'Video';
        } else if ($(element).is('select')) {
            elementType = 'dropdown';
            elementLabel = $(element).children("option:selected").text();
        }

        console.log(`Event sent to GTM - Type: ${elementType}, Label: ${elementLabel}`);
    }

    $('#enterSelectionMode').click(function() {
        selectionMode = !selectionMode;
        if (selectionMode) {
            $(this).text('Exit Selection Mode');
        } else {
            $(this).text('Enter Selection Mode');
            $('.eventsContainer *').removeClass('hover-highlight');
        }
    });

    $('.eventsContainer').on('mouseover', '*', function(e) {
        if (selectionMode) {
            $(this).addClass('hover-highlight');
            e.stopPropagation();
        }
    }).on('mouseout', '*', function() {
        if (selectionMode) {
            $(this).removeClass('hover-highlight');
        }
    });

    $('.eventsContainer').on('click', '*', function(e) {
        if (selectionMode) {
            if ($(this).hasClass('selected-for-tracking')) {
                $(this).removeClass('selected-for-tracking');
            } else {
                $(this).addClass('selected-for-tracking');
            }
            e.preventDefault();
        } else if ($(this).hasClass('selected-for-tracking')) {
            mockSendToGTM(this);
        }
    });
});

$(function() {
    // get "the monday" of a Date
    function getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1);
        var monday = new Date(d.setDate(diff));
        var options = {year: 'numeric', month: '2-digit', day: '2-digit'};
        return monday.toLocaleDateString("it", options);
    }
    // Quarter check
    function getYearQuarter() {
        var today = new Date();
        var quarter = Math.floor((today.getMonth() + 3) / 3);
        return today.getFullYear().toString() + quarter.toString();
    }

    // monday for project-page
    $('#getmonday').text(getMonday(new Date()));

    // timeline set
    var $timelineItems = $('[data-timeline]');
    var $timelineItemsContainer = $('.timeline-element');
    var currentQuarter = getYearQuarter();
    var $timelineFilter = $('[data-timeline-filter]');

    $timelineItems.each(function() {
        var quarter = $(this).attr('data-timeline');
        if ( quarter < currentQuarter ) {
            $(this).addClass('it-evidence');
        } else if (quarter == currentQuarter) {
            $(this).addClass('it-now');
        } else {
            $(this).parent().attr('data-timeline-next','1');
        }
    })

    $timelineFilter.on('click', function(e) {
        e.preventDefault();
        var filter = $(this).attr('data-timeline-filter') || 'all';
        $(this).addClass('active').siblings().removeClass('active');

        switch (filter) {
            case 'prodotto':
                $timelineItemsContainer.addClass('d-none');
                $('[data-timeline-prodotto]').removeClass('d-none');
                break;
            case 'servizio':
                $timelineItemsContainer.addClass('d-none');
                $('[data-timeline-servizio]').removeClass('d-none');
                break;
            case 'next':
                $timelineItemsContainer.addClass('d-none');
                $('[data-timeline-next]').removeClass('d-none');
                break;
            case 'all':
                $timelineItemsContainer.removeClass('d-none');
        }
        
    });

    // FILTER PARTNERS

    $('.filter-checkbox').change(function() {
        var $allItems = $('[data-partner');
        var $checked = $('.filterPartner .filter-checkbox:checked');
        var selector = '';
        $checked.each(function(){
            var value = $(this).val();
            selector += '['+value+']';
        });
        var $targets = $(selector);
        if ($targets.length > 0 ) {
            $allItems.removeClass('partner-selected').removeClass('partner-unselected');
            $targets.addClass('partner-selected');
            $allItems.filter(':not(.partner-selected)').addClass('partner-unselected');
        } else {
            $allItems.removeClass('partner-selected').removeClass('partner-unselected');
        }
    });



});

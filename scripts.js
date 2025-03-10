document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        selectHelper: true,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        select: function(info) {
            var title = prompt('Enter Event Title:');
            if (title) {
                calendar.addEvent({
                    title: title,
                    start: info.startStr,
                    end: info.endStr,
                    allDay: info.allDay
                });
            }
            calendar.unselect();
        },
        events: [
            // Example of a pre-added event
            {
                title: 'Sample Event',
                start: '2025-02-26'
            }
        ]
    });

    calendar.render();
});

        const monthYear = document.getElementById('month-year');
        const daysContainer = document.getElementById('days');
        const prevMonthBtn = document.getElementById('prev-month');
        const nextMonthBtn = document.getElementById('next-month');
        const eventModal = document.getElementById('event-modal');
        const closeModalBtn = document.getElementById('close-modal');
        const saveEventBtn = document.getElementById('save-event');
        const eventNameInput = document.getElementById('event-name');

        let date = new Date();
        let currentMonth = date.getMonth();
        let currentYear = date.getFullYear();
        let selectedDate = null;

        let events = []; //Store event data

        function renderCalendar() {
            date.setDate(1);  // Set to the first day of the month

            const firstDayIndex = date.getDay();
            const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
            const lastDayIndex = new Date(currentYear, currentMonth, lastDay).getDay();
            const prevLastDay = new Date(currentYear, currentMonth, 0).getDate();

            const months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            monthYear.textContent = `${months[currentMonth]} ${currentYear}`;

            let days = "";

            // Render days from the previous month
            for (let x = firstDayIndex; x > 0; x--) {
                days += `<div class="day prev-date">${prevLastDay - x + 1
                }</div>`;
            }

            // Render days of the current month
            for (let i = 1; i <= lastDay; i++) {
                let dayClass = "day";
                if (
                    i === new Date().getDate() &&
                    currentMonth === new Date().getMonth() &&
                    currentYear === new Date().getFullYear()
                ) {
                    dayClass += " today";
                }

                 const eventDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

                if (events.some(event => event.date === eventDate)) {
                    dayClass += " event";
                }

                days += `<div class="${dayClass}" data-date="${eventDate}">${i}</div>`;
            }

            // Render days from the next month
            for (let j = 1; j < 7 - lastDayIndex; j++) {
                days += `<div class="day next-date">${j}</div>`;
            }

            daysContainer.innerHTML = days;

            //Attach Event Listeners to days

            document.querySelectorAll('.day').forEach(day => {
                day.addEventListener('click', (e) => {
                    if(!e.target.classList.contains('prev-date') && !e.target.classList.contains('next-date')){
                        selectedDate = e.target.dataset.date;
                        eventNameInput.value = '';//clear input
                        eventModal.style.display = 'flex';
                    }

                });
            });
        }

        prevMonthBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            date = new Date(currentYear, currentMonth);
            renderCalendar();
        });

        nextMonthBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            date = new Date(currentYear, currentMonth);
            renderCalendar();
        });

        closeModalBtn.addEventListener('click', () => {
            eventModal.style.display = 'none';
        });

        saveEventBtn.addEventListener('click', () => {
            const eventName = eventNameInput.value.trim();

            if(eventName !== ''){
                events.push({
                    date: selectedDate,
                    title: eventName
                });

                eventModal.style.display = 'none';
                renderCalendar();// Re-render to show the event
            } else {
               alert("Event name cannot be empty")
            }
        });
        renderCalendar();
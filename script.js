document.addEventListener('DOMContentLoaded', () => {
    const monthYearElement = document.getElementById('month-year');
    const calendarDaysElement = document.getElementById('calendar-days');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    let currentDate = new Date();

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        monthYearElement.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
        calendarDaysElement.innerHTML = '';

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
        const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

        // Prev month days
        for (let i = firstDayOfMonth; i > 0; i--) {
            const day = document.createElement('div');
            day.innerText = lastDateOfPrevMonth - i + 1;
            day.classList.add('prev-month');
            calendarDaysElement.appendChild(day);
        }

        // Current month days
        const today = new Date();
        for (let i = 1; i <= lastDateOfMonth; i++) {
            const day = document.createElement('div');
            day.innerText = i;

            if (
                i === today.getDate() &&
                year === today.getFullYear() &&
                month === today.getMonth()
            ) {
                day.classList.add('today');
            }

            // Make day clickable
            day.addEventListener('click', () => {
                document.querySelectorAll('.calendar-days div')
                  .forEach(d => d.classList.remove('selected'));

                day.classList.add('selected');
            });

            calendarDaysElement.appendChild(day);
        }

        // Next month days
        const remaining = 42 - calendarDaysElement.children.length;
        for (let i = 1; i <= remaining; i++) {
            const day = document.createElement('div');
            day.innerText = i;
            day.classList.add('next-month');
            calendarDaysElement.appendChild(day);
        }
    };

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});

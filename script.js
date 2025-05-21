document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = 'here API key';
    const COUNTRY = 'PL';
    
    let currentDate = new Date();
    let holidays = [];
    let notes = JSON.parse(localStorage.getItem('calendarNotes')) || {};
    let darkTheme = false;
    let currentSelectedDate = null;

    const monthTitleEl = document.getElementById('month-title');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const weeksEl = document.getElementById('weeks');
    const weekNumbersEl = document.getElementById('week-numbers');
    const themeToggleBtn = document.getElementById('theme-toggle');

    const modal = document.createElement('div');
    modal.className = 'note-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-date"></h3>
                <span class="modal-holiday"></span>
                <span class="modal-close">&times;</span>
            </div>
            <div class="note-container">
                <div class="note-display" contenteditable="true"></div>
                <button class="delete-note">✕</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    renderCalendar(currentDate);
    fetchHolidays(currentDate.getFullYear());

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
        if (currentDate.getMonth() === 11) fetchHolidays(currentDate.getFullYear() - 1);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
        if (currentDate.getMonth() === 0) fetchHolidays(currentDate.getFullYear() + 1);
    });

    themeToggleBtn.addEventListener('click', () => {
        darkTheme = !darkTheme;
        document.body.classList.toggle('dark-theme', darkTheme);
        themeToggleBtn.textContent = darkTheme ? 'Light theme' : 'Dark theme';
    });

    function renderCalendar(date) {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        monthTitleEl.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    
        weeksEl.innerHTML = '';
        weekNumbersEl.innerHTML = '';
    
        const year = date.getFullYear();
        const month = date.getMonth();
        const today = new Date();
    
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDay = new Date(firstDay);
        startDay.setDate(firstDay.getDate() - (firstDay.getDay() + 6) % 7);
    
        const endDay = new Date(lastDay);
        endDay.setDate(lastDay.getDate() + (7 - (lastDay.getDay() + 6) % 7) % 7);
    
        let currentDay = new Date(startDay);
        let weekNumber = getWeekNumber(currentDay);
    
        while (currentDay <= endDay) {
            const weekEl = document.createElement('div');
            weekEl.className = 'week';
    
            const weekNumEl = document.createElement('div');
            weekNumEl.className = 'week-number';
            weekNumEl.textContent = `w${weekNumber}`;
            weekNumbersEl.appendChild(weekNumEl);
    
            for (let i = 0; i < 7; i++) {
                const dayEl = document.createElement('div');
                dayEl.className = 'day';
    
                const currentDayCopy = new Date(currentDay);
                const dateKey = currentDayCopy.toISOString().split('T')[0];
                
                const holiday = holidays.find(h => {
                    const holidayDate = new Date(h.date.iso);
                    return holidayDate.getDate() === currentDay.getDate() && 
                           holidayDate.getMonth() === currentDay.getMonth() && 
                           holidayDate.getFullYear() === currentDay.getFullYear();
                });
                
                const note = notes[dateKey];
    
                const dayNumberEl = document.createElement('div');
                dayNumberEl.className = 'day-number';
                dayNumberEl.textContent = currentDay.getDate();
                dayEl.appendChild(dayNumberEl);
    
                if (currentDay.getMonth() !== month) {
                    dayEl.classList.add('other-month');
                }
    
                if (i === 5 || i === 6) {
                    dayEl.classList.add('weekend');
                }
    
                if (currentDay.toDateString() === today.toDateString()) {
                    dayEl.classList.add('current-day');
                }
    
                if (holiday) {
                    const holidayEl = document.createElement('div');
                    holidayEl.className = 'holiday-name';
                    holidayEl.textContent = holiday.name;
                    dayEl.appendChild(holidayEl);
                    dayEl.classList.add('holiday');
                }
    
                if (note) {
                    const noteEl = document.createElement('div');
                    noteEl.className = 'day-note';
                    noteEl.textContent = note;
                    dayEl.appendChild(noteEl);
                }
    
                dayEl.addEventListener("click", () => {
                    openNoteModal(currentDayCopy);
                });
    
                weekEl.appendChild(dayEl);
                currentDay.setDate(currentDay.getDate() + 1);
            }
    
            weeksEl.appendChild(weekEl);
            weekNumber = getWeekNumber(currentDay);
        }
    }       

    function openNoteModal(date) {
        currentSelectedDate = date;
        const dateKey = date.toISOString().split('T')[0];
        const dayName = date.toLocaleDateString('pl-PL', { weekday: 'long' });
        const formattedDate = date.toLocaleDateString('pl-PL');
    
        document.getElementById('calendar-container').classList.add('blurred');
        modal.querySelector('.modal-date').textContent = `${dayName}, ${formattedDate}`;
    
        const holiday = holidays.find(h => {
            const holidayDate = new Date(h.date.iso);
            return holidayDate.getDate() === date.getDate() && 
                   holidayDate.getMonth() === date.getMonth() && 
                   holidayDate.getFullYear() === date.getFullYear();
        });
        
        modal.querySelector('.modal-holiday').textContent = holiday ? holiday.name : '';
    
        const noteDisplay = modal.querySelector('.note-display');
        noteDisplay.textContent = notes[dateKey] || '';
    
        noteDisplay.oninput = () => {
            if (noteDisplay.textContent.length > 120) {
                noteDisplay.textContent = noteDisplay.textContent.slice(0, 120);
            }
        };
    
        modal.style.display = 'flex';
    }
    
    function closeModal() {
        saveNote();
        modal.style.display = 'none';
        document.getElementById('calendar-container').classList.remove('blurred');
    }

    function saveNote() {
        if (!currentSelectedDate) return;
        const dateKey = currentSelectedDate.toISOString().split('T')[0];
        const noteText = modal.querySelector('.note-display').textContent.trim();

        if (noteText) {
            notes[dateKey] = noteText;
        } else {
            delete notes[dateKey];
        }

        localStorage.setItem('calendarNotes', JSON.stringify(notes));
        renderCalendar(currentDate);
    }

    function deleteNote() {
        if (!currentSelectedDate) return;
        const dateKey = currentSelectedDate.toISOString().split('T')[0];
        delete notes[dateKey];
        localStorage.setItem('calendarNotes', JSON.stringify(notes));
        modal.querySelector('.note-display').textContent = '';
        renderCalendar(currentDate);
    }

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.delete-note').addEventListener('click', deleteNote);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function fetchHolidays(year) {
        const url = `https://calendarific.com/api/v2/holidays?api_key=${API_KEY}&country=${COUNTRY}&year=${year}`;
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`Błąd HTTP! status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                if (data.meta?.code === 200) holidays = data.response.holidays;
                renderCalendar(currentDate);
            })
            .catch(error => {
                console.error('Błąd pobierania świąt:', error);
                holidays = [];
                renderCalendar(currentDate);
            });
    }

    function getWeekNumber(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
        const week1 = new Date(d.getFullYear(), 0, 4);
        return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    }
});
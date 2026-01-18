// Datos de eventos
document.addEventListener('DOMContentLoaded', function() {
    const events = {
        // Formato: 'YYYY-MM-DD': { title, description, type, info }
        '2026-02-02': {
            title: 'Yemanja Night',
            description: 'Noche temática dedicada a Yemanja',
            type: 'principal',
            info: 'Entrada: GRATIS | Mesa VIP: $200'
        },
        '2026-02-23': {
            title: 'Noche de Lujuria',
            description: 'Espectáculos sensuales + cócteles temáticos',
            type: 'principal',
            info: 'Entrada: $500 | Mesa VIP: $1,200'
        },
        '2026-02-28': {
            title: 'Talentos Ocultos',
            description: 'Concurso abierto a civiles',
            type: 'especial',
            info: 'Premio: $10,000 + contrato por 1 mes'
        },
        '2026-02-12': {
            title: 'Luna Sangrienta',
            description: 'Ritual mensual especial',
            type: 'luna',
            info: 'Subasta de objetos únicos y rituales exclusivos'
        },
        '2026-03-05': {
            title: 'Noche de Lujuria',
            description: 'Espectáculos sensuales + cócteles temáticos',
            type: 'principal',
            info: 'Entrada: $500 | Mesa VIP: $1,200'
        },
        '2026-02-08': {
            title: 'Talentos Ocultos',
            description: 'Concurso abierto a civiles',
            type: 'especial',
            info: 'Premio: $10,000 + contrato por 1 mes'
        }
    };
    // Configuración de pestañas
        const tabButtons = document.querySelectorAll('.task-tab');
        const tabContents = document.querySelectorAll('.task-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover clases active
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Activar elemento clickeado
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });

        // Activar primera pestaña por defecto
        if(!document.querySelector('.task-tab.active') && tabButtons.length > 0) {
            tabButtons[0].click();
        }
    let currentDate = new Date();

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Actualizar título
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
        
        // Obtener primer y último día del mes
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        
        // Ajustar primer día (lunes = 0)
        let startDay = firstDay.getDay() - 1;
        if (startDay < 0) startDay = 6;
        
        // Limpiar días
        const calendarDays = document.getElementById('calendarDays');
        calendarDays.innerHTML = '';
        
        // Días del mes anterior
        const prevMonthDays = new Date(year, month, 0).getDate();
        for (let i = startDay - 1; i >= 0; i--) {
            const day = prevMonthDays - i;
            const dayDiv = createDayElement(day, true);
            calendarDays.appendChild(dayDiv);
        }
        
        // Días del mes actual
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const event = events[dateString];
            
            const dayDiv = createDayElement(day, false, isToday, event, dateString);
            calendarDays.appendChild(dayDiv);
        }
        
        // Días del siguiente mes
        const remainingDays = 42 - (startDay + daysInMonth);
        for (let day = 1; day <= remainingDays; day++) {
            const dayDiv = createDayElement(day, true);
            calendarDays.appendChild(dayDiv);
        }
    }

    function createDayElement(day, isOtherMonth, isToday = false, event = null, dateString = '') {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        
        if (isOtherMonth) {
            dayDiv.classList.add('other-month');
        }
        if (isToday) {
            dayDiv.classList.add('today');
        }
        if (event) {
            dayDiv.classList.add('has-event');
            if (event.type === 'especial') dayDiv.classList.add('special-event');
            if (event.type === 'luna') dayDiv.classList.add('luna-event');
            dayDiv.onclick = () => showEventDetails(event, dateString);
        }
        
        dayDiv.innerHTML = `
            <span class="day-number">${day}</span>
            ${event ? `<span class="day-label">${event.title.substring(0, 8)}...</span>` : ''}
        `;
        
        return dayDiv;
    }

    function showEventDetails(event, dateString) {
        const details = document.getElementById('eventDetails');
        const [year, month, day] = dateString.split('-');
        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        
        document.getElementById('eventTitle').textContent = event.title;
        document.getElementById('eventDate').textContent = `📅 ${day} de ${monthNames[parseInt(month) - 1]} de ${year}`;
        document.getElementById('eventDescription').textContent = event.description;
        document.getElementById('eventInfo').innerHTML = `
            <strong>Información:</strong><br>${event.info}
        `;
        
        details.style.display = 'block';
        details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function closeEventDetails() {
        document.getElementById('eventDetails').style.display = 'none';
    }

    // Navegación
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Inicializar
    renderCalendar();
});
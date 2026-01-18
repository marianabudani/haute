// Datos de eventos y funcionalidad del calendario
document.addEventListener('DOMContentLoaded', function() {
const events = {
    // FEBRERO
    '2026-02-02': {
        title: 'Yemanjá Night',
        description: 'Cena temática y encuentro espiritual en honor a Yemanjá',
        type: 'principal',
        info: 'Entrada: GRATIS | Menú especial: $350'
    },
    '2026-02-14': {
        title: 'Círculo de Contención',
        description: 'Espacio seguro para mujeres y madres solteras',
        type: 'social',
        info: 'Actividad gratuita | Guardería disponible'
    },
    '2026-02-27': {
        title: 'Noche Íntima',
        description: 'Espectáculos sensuales, música suave y cócteles de autor',
        type: 'principal',
        info: 'Entrada: $500 | Mesa VIP: $1,200'
    },

    // MARZO
    '2026-03-05': {
        title: 'Almuerzos Ejecutivos',
        description: 'Networking legal entre civiles y negocios',
        type: 'legal',
        info: 'Menú corporativo con descuento'
    },
    '2026-03-18': {
        title: 'Encuentro Neutral',
        description: 'Reunión privada para grupos y organizaciones',
        type: 'privado',
        info: 'Acceso solo con reserva'
    },
    '2026-03-28': {
        title: 'Talentos Urbanos',
        description: 'Escenario abierto para artistas civiles',
        type: 'especial',
        info: 'Premio: $10,000 + contratación'
    },

    // ABRIL
    '2026-04-03': {
        title: 'Charlas de Crianza',
        description: 'Espacio de diálogo para madres y padres',
        type: 'social',
        info: 'Entrada libre | Refrigerio incluido'
    },
    '2026-04-17': {
        title: 'Noche Carmesí',
        description: 'Evento nocturno elegante con performances',
        type: 'principal',
        info: 'Entrada: $600 | VIP: $1,400'
    },

    // MAYO
    '2026-05-01': {
        title: 'Día del Trabajador',
        description: 'Almuerzos con beneficios para empleados de negocios',
        type: 'legal',
        info: 'Postre gratis y descuentos diferidos'
    },
    '2026-05-22': {
        title: 'Círculo Espiritual',
        description: 'Encuentro simbólico de introspección y guía',
        type: 'cultural',
        info: 'Cupos limitados'
    },

    // JUNIO
    '2026-06-06': {
        title: 'Haute Family Day',
        description: 'Jornada diurna para familias y niños',
        type: 'social',
        info: 'Actividades recreativas y menú infantil'
    },
    '2026-06-26': {
        title: 'Noche de Lujuria',
        description: 'Evento nocturno sensual y exclusivo',
        type: 'principal',
        info: 'Entrada: $700 | VIP: $1,500'
    },

    // JULIO
    '2026-07-10': {
        title: 'Foro Femenino',
        description: 'Encuentro de mujeres emprendedoras',
        type: 'social',
        info: 'Entrada gratuita'
    },
    '2026-07-24': {
        title: 'Encuentro Privado',
        description: 'Espacio reservado para negociaciones discretas',
        type: 'privado',
        info: 'Acceso bajo invitación'
    },

    // AGOSTO
    '2026-08-08': {
        title: 'Sabores del Mundo',
        description: 'Experiencia gastronómica multicultural',
        type: 'legal',
        info: 'Menú especial por tiempo limitado'
    },
    '2026-08-29': {
        title: 'Noche de Máscaras',
        description: 'Evento nocturno temático',
        type: 'principal',
        info: 'Entrada: $650 | VIP: $1,300'
    },

    // SEPTIEMBRE
    '2026-09-05': {
        title: 'Espacio de Contención',
        description: 'Apoyo emocional y social para mujeres',
        type: 'social',
        info: 'Actividad gratuita'
    },
    '2026-09-26': {
        title: 'Talentos Ocultos',
        description: 'Competencia artística abierta',
        type: 'especial',
        info: 'Premio: $12,000'
    },

    // OCTUBRE
    '2026-10-12': {
        title: 'Cultura & Raíces',
        description: 'Encuentro cultural y simbólico',
        type: 'cultural',
        info: 'Entrada libre'
    },
    '2026-10-31': {
        title: 'Noche Oscura',
        description: 'Evento nocturno especial de temporada',
        type: 'principal',
        info: 'Entrada: $800 | VIP: $1,600'
    },

    // NOVIEMBRE
    '2026-11-06': {
        title: 'Networking Civil',
        description: 'Encuentro entre negocios y civiles',
        type: 'legal',
        info: 'Happy hour incluido'
    },
    '2026-11-21': {
        title: 'Encuentro Neutral',
        description: 'Reunión privada intergrupal',
        type: 'privado',
        info: 'Reserva obligatoria'
    },

    // DICIEMBRE
    '2026-12-05': {
        title: 'Haute Solidario',
        description: 'Evento benéfico para familias',
        type: 'social',
        info: 'Donaciones voluntarias'
    },
    '2026-12-19': {
        title: 'Cierre de Año',
        description: 'Gala nocturna de despedida',
        type: 'principal',
        info: 'Entrada: $1,000 | VIP: $2,000'
    }
};


    // ==================== CONFIGURACIÓN DE PESTAÑAS DE OPERACIONES ====================
    const operationsTabs = document.querySelectorAll('.operations-tab');
    const operationsContents = document.querySelectorAll('.operations-content');
    
    operationsTabs.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clases active
            operationsTabs.forEach(btn => btn.classList.remove('active'));
            operationsContents.forEach(content => content.classList.remove('active'));
            
            // Activar elemento clickeado
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Activar primera pestaña por defecto
    if(!document.querySelector('.operations-tab.active') && operationsTabs.length > 0) {
        operationsTabs[0].click();
    }

    // ==================== FUNCIONALIDAD DEL CALENDARIO ====================
    let currentDate = new Date();

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Actualizar título
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const currentMonthEl = document.getElementById('currentMonth');
        if(currentMonthEl) {
            currentMonthEl.textContent = `${monthNames[month]} ${year}`;
        }
        
        // Obtener primer y último día del mes
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        
        // Ajustar primer día (lunes = 0)
        let startDay = firstDay.getDay() - 1;
        if (startDay < 0) startDay = 6;
        
        // Limpiar días
        const calendarDays = document.getElementById('calendarDays');
        if(!calendarDays) return;
        
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
        if(!details) return;
        
        const [year, month, day] = dateString.split('-');
        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        
        const eventTitle = document.getElementById('eventTitle');
        const eventDate = document.getElementById('eventDate');
        const eventDescription = document.getElementById('eventDescription');
        const eventInfo = document.getElementById('eventInfo');
        
        if(eventTitle) eventTitle.textContent = event.title;
        if(eventDate) eventDate.textContent = `📅 ${day} de ${monthNames[parseInt(month) - 1]} de ${year}`;
        if(eventDescription) eventDescription.textContent = event.description;
        if(eventInfo) eventInfo.innerHTML = `<strong>Información:</strong><br>${event.info}`;
        
        details.style.display = 'block';
        details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    window.closeEventDetails = function() {
        const details = document.getElementById('eventDetails');
        if(details) {
            details.style.display = 'none';
        }
    }

    // Navegación del calendario
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    
    if(prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
    }
    
    if(nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }

    // Inicializar calendario
    renderCalendar();
    
    console.log('✓ Calendario y Operaciones inicializados');
});
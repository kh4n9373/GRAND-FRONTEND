function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}

function getPreviousMonthLastDate(year, month) {
    return daysInMonth(year, month - 1);
}

// Helper to check if dates fall on the same day
function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

function addTasksToDaySlot(dayDiv, currentDate) {
    // Filter tasks that occur on the currentDate using global tasksData
    const dayTasks = tasksData.filter(task => {
      const taskStart = new Date(task.startTime);
      return isSameDay(taskStart, currentDate);
    });
  
    if (dayTasks.length > 0) {
      const tasksContainer = document.createElement('div');
      tasksContainer.className = 'day-tasks';
      
      dayTasks.forEach(task => {
        const taskName = task.taskName ? task.taskName : 'No name';
        const taskStart = new Date(task.startTime);
        const taskEnd = new Date(task.endTime);
        const startTime = taskStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        // const endTime = taskEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const taskTimeDiv = document.createElement('div');
        taskTimeDiv.className = 'task-time';
        // taskTimeDiv.textContent = `${startTime} - ${endTime}`;
        taskTimeDiv.innerHTML = `<span class="task-start">${startTime}</span> - ${taskName}`;
        
        tasksContainer.appendChild(taskTimeDiv);
      });
      dayDiv.appendChild(tasksContainer);
    }
}

function renderCalendar(year, month) {
    const monthDaysDiv = document.getElementById('month-days');
    monthDaysDiv.innerHTML = '';
    
    const totalSlots = 35; // For example, a 5-week grid
    const firstDay = getFirstDayOfMonth(year, month);
    const daysInCurrentMonth = daysInMonth(year, month);
    const daysInPrevMonth = getPreviousMonthLastDate(year, month);

    let daySlot = 1; 
    let prevMonthDay = daysInPrevMonth - firstDay + 1; 

    for (let i = 0; i < totalSlots; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day-slot');

        const day = document.createElement('p');
        day.classList.add('day-in-month');
        dayDiv.appendChild(day);
        
        let currentDate;
        if (i < firstDay) {
            // Day from previous month
            day.textContent = prevMonthDay;
            day.classList.add('prev-month');
            currentDate = new Date(year, month - 1, prevMonthDay);
            prevMonthDay++;
        } else if (daySlot <= daysInCurrentMonth) {
            // Day from current month
            day.textContent = daySlot;
            day.classList.add('current-month');
            currentDate = new Date(year, month, daySlot);
            daySlot++;
        } else {
            // Day from next month
            day.textContent = daySlot - daysInCurrentMonth;
            day.classList.add('next-month');
            currentDate = new Date(year, month + 1, daySlot - daysInCurrentMonth);
            daySlot++;
        }
        
        // Insert tasks for this day (if any)
        addTasksToDaySlot(dayDiv, currentDate);
        
        monthDaysDiv.appendChild(dayDiv);
    }
}   


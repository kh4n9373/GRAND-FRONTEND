let currentView = 'week-view';
let tasksData = [
  {
    userID: 1,
    taskName: 'Team Meeting with Project Manager',
    taskDescription: 'Discuss project status',
    taskColor: '#FF0000',
    startTime: '2025-03-13T09:00:00',
    endTime: '2025-03-13T10:00:00',
    status: 'In progress'
  },
  {
    userID: 1,
    taskName: 'Lunch Break',
    taskDescription: 'Lunch with client',
    taskColor: '#00FF00',
    startTime: '2025-03-13T12:00:00',
    endTime: '2025-03-13T13:00:00',
    status: 'In progress'
  },
  {
    userID: 1,
    taskName: 'Code Review',
    taskDescription: 'Review PRs',
    taskColor: '#0000FF',
    startTime: '2025-03-13T15:00:00',
    endTime: '2025-03-13T16:00:00',
    status: 'In progress'
  },
  {
    userID: 1,
    taskName: 'Code Review',
    taskDescription: 'Review PRs',
    taskColor: '#0000FF',
    startTime: '2025-03-18T15:00:00',
    endTime: '2025-03-18T16:00:00',
    status: 'In progress'
  },
  {
    userID: 1,
    taskName: 'Lunch Break',
    taskDescription: 'Lunch with client',
    taskColor: '#00FF00',
    startTime: '2025-03-18T12:00:00',
    endTime: '2025-03-18T13:00:00',
    status: 'In progress'
  },
  {
    userID: 1,
    taskName: 'Team Meeting with Project Manager',
    taskDescription: 'Discuss project status',
    taskColor: '#FF0000',
    startTime: '2025-03-18T09:00:00',
    endTime: '2025-03-18T10:00:00',
    status: 'In progress'
  },
];

let tasks = tasksData;

document.addEventListener('DOMContentLoaded', function () {
  changeWeekView();
  initializeChat();
  initializeModal();
  initializeProgressTracker();

  const logout = document.getElementById('logoutBtn');
  logout.onclick = function () {
    window.location.href = '/create-account';
  };

});

function addTaskFromDB() {
  // getUserTasks().then((tasks) => {
  //   tasks.forEach((task) => {
  //     addTaskToCalendarFromDB(task);
  //   });
  // });
  const container = document.querySelector('.time-slots');
  if (!container) {
    console.error("Cannot add tasks because .time-slots container does not exist.");
    return;
  }
  tasks.forEach((task) => {
    if (taskOccursInCurrentWeek(task)) {
      addTaskToCalendarFromDB(task);
    }
  });
}

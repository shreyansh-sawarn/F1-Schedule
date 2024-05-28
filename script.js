// document.addEventListener("DOMContentLoaded", function() {
//     fetchF1Schedule();
// });

// function fetchF1Schedule() {
//     const apiUrl = "https://ergast.com/api/f1/current.json";

//     fetch(apiUrl)
//         .then(response => response.json())
//         .then(data => {
//             const schedule = parseSchedule(data);
//             displaySchedule(schedule);
//         })
//         .catch(error => {
//             console.error('Error fetching F1 schedule:', error);
//             displayErrorMessage('Failed to fetch F1 schedule. Please try again later.');
//         });
// }

// function parseSchedule(data) {
//     const races = data.MRData.RaceTable.Races;
//     const schedule = [];

//     races.forEach(race => {
//         const event = {
//             eventName: race.raceName,
//             date: race.date,
//             sessions: []
//         };

//         // Add main race
//         event.sessions.push({ name: 'Race', date: race.date, time: race.time });

//         // Add practice and qualifying sessions
//         if (race.FirstPractice) {
//             event.sessions.push({ name: 'Free Practice 1', date: race.FirstPractice.date, time: race.FirstPractice.time });
//         }
//         if (race.SecondPractice) {
//             event.sessions.push({ name: 'Free Practice 2', date: race.SecondPractice.date, time: race.SecondPractice.time });
//         }
//         if (race.ThirdPractice) {
//             event.sessions.push({ name: 'Free Practice 3', date: race.ThirdPractice.date, time: race.ThirdPractice.time });
//         }
//         if (race.Qualifying) {
//             event.sessions.push({ name: 'Qualifying', date: race.Qualifying.date, time: race.Qualifying.time });
//         }
//         if (race.Sprint) {
//             event.sessions.push({ name: 'Sprint', date: race.Sprint.date, time: race.Sprint.time });
//         }
//         if (race.SprintQualifying) {
//             event.sessions.push({ name: 'Sprint Qualifying', date: race.SprintQualifying.date, time: race.SprintQualifying.time });
//         }

//         schedule.push(event);
//     });

//     return schedule;
// }

// function displaySchedule(schedule) {
//     const scheduleContainer = document.getElementById("schedule");
//     scheduleContainer.innerHTML = "";

//     schedule.forEach(event => {
//         const eventElement = document.createElement("div");
//         eventElement.classList.add("session");

//         let sessionsHTML = `<h2 class="event-title">${event.eventName}</h2><div class="session-details">`;
//         event.sessions.forEach(session => {
//             sessionsHTML += `
//                 <p><strong>${session.name}:</strong> ${session.date} at ${session.time}</p>
//             `;
//         });
//         sessionsHTML += `</div>`;

//         eventElement.innerHTML = sessionsHTML;
//         scheduleContainer.appendChild(eventElement);

//         eventElement.querySelector('.event-title').addEventListener('click', () => {
//             const details = eventElement.querySelector('.session-details');
//             details.style.display = details.style.display === 'none' ? 'block' : 'none';
//         });

//         // Initially hide the details
//         eventElement.querySelector('.session-details').style.display = 'none';
//     });
// }

document.addEventListener("DOMContentLoaded", function() {
    fetchF1Schedule();
});

function fetchF1Schedule() {
    const apiUrl = "https://ergast.com/api/f1/current.json";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const schedule = parseSchedule(data);
            displaySchedule(schedule);
        })
        .catch(error => {
            console.error('Error fetching F1 schedule:', error);
            displayErrorMessage('Failed to fetch F1 schedule. Please try again later.');
        });
}

function parseSchedule(data) {
    const races = data.MRData.RaceTable.Races;
    const schedule = [];

    races.forEach(race => {
        const event = {
            eventName: race.raceName,
            date: race.date,
            sessions: []
        };

        // Add main race
        event.sessions.push({ name: 'Race', date: race.date, time: race.time });

        // Add practice and qualifying sessions
        if (race.FirstPractice) {
            event.sessions.push({ name: 'Free Practice 1', date: race.FirstPractice.date, time: race.FirstPractice.time });
        }
        if (race.SecondPractice) {
            event.sessions.push({ name: 'Free Practice 2', date: race.SecondPractice.date, time: race.SecondPractice.time });
        }
        if (race.ThirdPractice) {
            event.sessions.push({ name: 'Free Practice 3', date: race.ThirdPractice.date, time: race.ThirdPractice.time });
        }
        if (race.Qualifying) {
            event.sessions.push({ name: 'Qualifying', date: race.Qualifying.date, time: race.Qualifying.time });
        }
        if (race.Sprint) {
            event.sessions.push({ name: 'Sprint', date: race.Sprint.date, time: race.Sprint.time });
        }
        if (race.SprintQualifying) {
            event.sessions.push({ name: 'Sprint Qualifying', date: race.SprintQualifying.date, time: race.SprintQualifying.time });
        }

        schedule.push(event);
    });

    return schedule;
}

function displaySchedule(schedule) {
    const scheduleContainer = document.getElementById("schedule");
    scheduleContainer.innerHTML = "";

    schedule.forEach(event => {
        const eventElement = document.createElement("div");
        eventElement.classList.add("session");

        let sessionsHTML = `<h2 class="event-title">${event.eventName}</h2><div class="session-details">`;
        event.sessions.forEach(session => {
            sessionsHTML += `
                <p><strong>${session.name}:</strong> ${session.date} at ${session.time}</p>
            `;
        });
        sessionsHTML += `</div>`;

        eventElement.innerHTML = sessionsHTML;
        scheduleContainer.appendChild(eventElement);

        const eventTitle = eventElement.querySelector('.event-title');
        eventTitle.addEventListener('click', () => {
            const details = eventElement.querySelector('.session-details');
            const isVisible = details.style.display === 'block';
            details.style.display = isVisible ? 'none' : 'block';
            eventTitle.classList.toggle('collapsed', !isVisible);
        });

        // Initially hide the details
        eventElement.querySelector('.session-details').style.display = 'none';
    });
}

function displayErrorMessage(message) {
    const scheduleContainer = document.getElementById("schedule");
    scheduleContainer.innerHTML = `<p class="error">${message}</p>`;
}

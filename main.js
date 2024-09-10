let events = [];

// 倒计时
function calculateCountdown(eventDate) {
    const now = new Date();
    const eventTime = new Date(eventDate).getTime()
    const diff = eventTime - now;

    if (diff < 0) {
        return `Event has passed`
    } else if (diff === 0) {
        return `Down!!!!!!!`;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) );
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
}

// Function to display events in the left container
function displayEvents() {
    const eventList = document.querySelector('#event-list');
    eventList.innerHTML = '';

    events.forEach((event, index) => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
        eventElement.dataset.index = index;

        // Add countdown for each event
        const countdownText = document.createElement('p');
        countdownText.textContent = calculateCountdown(event.date);
        countdownText.classList.add('countdown');
        eventElement.appendChild(document.createTextNode(event.name + ": "));
        eventElement.appendChild(countdownText);

        eventList.appendChild(eventElement);

    });
}

// Function to add a new event
function addNewEvent(event) {
    event.preventDefault();

    const eventNameInput = document.getElementById('event');
    const eventDateInput = document.getElementById('event-date');
    const eventName = eventNameInput.value.trim();
    const eventDate = eventDateInput.value;

    // Validate event name
    if (!eventName) {
        alert("Event name cannot be blank!");
        return;
    }

    // Validate event date
    if (!eventDate) {
        alert("Please enter a valid event date.");
        return;
    }

    const eventDateTime = new Date(eventDate).getTime();
    const now = new Date().getTime();

    // Validate if event date is in the future
    if (eventDateTime <= now) {
        alert("Event date must be in the future.");
        return;
    }

    // Add the new event to the events array
    events.push({ name: eventName, date: eventDate });
    displayEvents();
}

// Function to update the countdown for all events
function updateCountdowns() {
    const countdownElements = document.querySelectorAll('.countdown');
    countdownElements.forEach((countdown, index) => {
        countdown.textContent = calculateCountdown(events[index].date);
    });
}

// Set up the ADD NEW button
document.querySelector('form').onsubmit = addNewEvent;

// Update countdowns every second
setInterval(updateCountdowns, 1000);


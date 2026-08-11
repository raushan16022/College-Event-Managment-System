function register() {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered Successfully");
}
// LOGIN
function login() {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let user = users.find(u => u.email === email && u.password === password);

    if(user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Login");
    }
}

// LOGOUT
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

// ADD EVENT
function addEvent() {
    let events = JSON.parse(localStorage.getItem("events")) || [];

    let event = {
        id: Date.now(),
        title: document.getElementById("title").value,
        desc: document.getElementById("desc").value,
        date: document.getElementById("date").value,
        venue: document.getElementById("venue").value
    };

    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));

    alert("Event Added");
}

// DISPLAY EVENTS
function loadEvents() {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    let container = document.getElementById("eventsContainer");

    if (!container) return;

    container.innerHTML = "";

    events.forEach(e => {
        container.innerHTML += `
            <div class="card">
                <h3>${e.title}</h3>
                <p>${e.desc}</p>
                <p>${e.date}</p>
                <p>${e.venue}</p>
                <button onclick="registerEvent(${e.id})">Register</button>
            </div>
        `;
    });
}

// REGISTER EVENT
function registerEvent(id) {
    let regs = JSON.parse(localStorage.getItem("registrations")) || [];
    let user = JSON.parse(localStorage.getItem("currentUser"));

    // Check login
    if (!user) {
        alert("Please login first");
        return;
    }

    // 🔥 STEP 7: Check if already registered
    let already = regs.find(r => r.user === user.email && r.eventId === id);

    if (already) {
        alert("Already Registered!");
        return;
    }

    // Save new registration
    regs.push({
        user: user.email,
        eventId: id
    });

    localStorage.setItem("registrations", JSON.stringify(regs));

    alert("Registered Successfully!");
}
function loadMyEvents() {
    let regs = JSON.parse(localStorage.getItem("registrations")) || [];
    let events = JSON.parse(localStorage.getItem("events")) || [];
    let user = JSON.parse(localStorage.getItem("currentUser"));

    let container = document.getElementById("myEventsContainer");

    if (!container || !user) return;

    container.innerHTML = "";

    // Filter events for this user
    let myRegs = regs.filter(r => r.user === user.email);

    myRegs.forEach(r => {
        let event = events.find(e => e.id === r.eventId);

        if (event) {
            container.innerHTML += `
                <div class="card">
                    <h3>${event.title}</h3>
                    <p>${event.desc}</p>
                    <p>${event.date}</p>
                    <p>${event.venue}</p>
                </div>
            `;
        }
    });
}
// AUTO LOAD EVENTS
loadEvents();
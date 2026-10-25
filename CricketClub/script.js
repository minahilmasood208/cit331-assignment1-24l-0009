const form = document.getElementById("registrationForm");
const list = document.getElementById("registrationList");
const message = document.getElementById("confirmationMessage");
const clearButton = document.getElementById("clearAllButton");

let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

function showRegistrations() {
    list.innerHTML = "";

    for (let i = 0; i < registrations.length; i++) {
        let item = document.createElement("li");

        item.textContent = registrations[i].name + " - " +
                           registrations[i].email + " - " +
                           registrations[i].event;

        list.appendChild(item);
    }
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let registration = {
        name: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        event: document.getElementById("event").value,
        source: []
    };

    let checkboxes = document.querySelectorAll('input[name="source"]:checked');

    for (let i = 0; i < checkboxes.length; i++) {
        registration.source.push(checkboxes[i].value);
    }

    registrations.push(registration);

    localStorage.setItem("registrations", JSON.stringify(registrations));

    message.textContent = "Registration submitted successfully!";

    form.reset();
    showRegistrations();
});

clearButton.addEventListener("click", function() {
    registrations = [];

    localStorage.removeItem("registrations");

    message.textContent = "All registrations have been cleared.";

    showRegistrations();
});

showRegistrations();
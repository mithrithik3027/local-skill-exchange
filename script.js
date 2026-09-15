let profiles = JSON.parse(localStorage.getItem("profiles")) || [];

// Add a new profile
function addProfile() {
    const name = document.getElementById("name").value.trim();
    const teach = document.getElementById("teach").value.trim();
    const learn = document.getElementById("learn").value.trim();

    if (!name || !teach || !learn) {
        alert("Please fill in all fields.");
        return;
    }

    const profile = {
        id: Date.now(),
        name: name,
        teach: teach,
        learn: learn
    };

    profiles.push(profile);

    localStorage.setItem("profiles", JSON.stringify(profiles));

    document.getElementById("name").value = "";
    document.getElementById("teach").value = "";
    document.getElementById("learn").value = "";

    displayProfiles(profiles);
}

// Display community members
function displayProfiles(list) {
    const container = document.getElementById("profiles");

    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = `
            <p>No community members yet. Be the first to join!</p>
        `;
        return;
    }

    list.forEach(profile => {
        const card = document.createElement("div");
        card.className = "profile";

        const name = document.createElement("h4");
        name.textContent = profile.name;

        const teach = document.createElement("p");
        teach.textContent = `🎓 Teaches: ${profile.teach}`;

        const learn = document.createElement("p");
        learn.textContent = `📚 Wants to learn: ${profile.learn}`;

        card.appendChild(name);
        card.appendChild(teach);
        card.appendChild(learn);

        container.appendChild(card);
    });
}

// Search for skills
function searchSkills() {
    const search = document
        .getElementById("search")
        .value
        .toLowerCase()
        .trim();

    if (!search) {
        displayProfiles(profiles);
        document.getElementById("results").innerHTML = "";
        return;
    }

    const matches = profiles.filter(profile =>
        profile.teach.toLowerCase().includes(search) ||
        profile.learn.toLowerCase().includes(search)
    );

    displaySearchResults(matches);
}

// Display search results
function displaySearchResults(matches) {
    const results = document.getElementById("results");

    results.innerHTML = "";

    if (matches.length === 0) {
        results.innerHTML = `
            <p>No matching skill found.</p>
        `;
        return;
    }

    matches.forEach(profile => {
        const card = document.createElement("div");
        card.className = "profile";

        const name = document.createElement("h4");
        name.textContent = `🤝 ${profile.name}`;

        const teach = document.createElement("p");
        teach.textContent = `Can teach: ${profile.teach}`;

        const learn = document.createElement("p");
        learn.textContent = `Wants to learn: ${profile.learn}`;

        card.appendChild(name);
        card.appendChild(teach);
        card.appendChild(learn);

        results.appendChild(card);
    });
}

// Load profiles when page opens
displayProfiles(profiles);

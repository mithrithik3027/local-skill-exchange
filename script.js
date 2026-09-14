let profiles = JSON.parse(
    localStorage.getItem("profiles")
) || [];


function addProfile() {

    const name = document.getElementById("name").value.trim();
    const teach = document.getElementById("teach").value.trim();
    const learn = document.getElementById("learn").value.trim();

    if (name === "" || teach === "" || learn === "") {
        alert("Please fill all fields!");
        return;
    }

    const profile = {
        name: name,
        teach: teach,
        learn: learn
    };

    profiles.push(profile);

    localStorage.setItem(
        "profiles",
        JSON.stringify(profiles)
    );

    document.getElementById("name").value = "";
    document.getElementById("teach").value = "";
    document.getElementById("learn").value = "";

    displayProfiles();
}


function displayProfiles() {

    const container = document.getElementById("profiles");

    container.innerHTML = "";

    if (profiles.length === 0) {
        container.innerHTML =
            "<p>No profiles yet. Be the first!</p>";
        return;
    }

    profiles.forEach(profile => {

        const div = document.createElement("div");

        div.className = "profile";

        div.innerHTML = `
            <h3>👤 ${escapeHTML(profile.name)}</h3>

            <span class="skill">
                Teaches: ${escapeHTML(profile.teach)}
            </span>

            <span class="skill">
                Wants to learn: ${escapeHTML(profile.learn)}
            </span>
        `;

        container.appendChild(div);
    });
}


function searchSkills() {

    const search =
        document.getElementById("search")
        .value
        .toLowerCase()
        .trim();

    const results =
        document.getElementById("results");

    results.innerHTML = "";

    if (search === "") {
        return;
    }

    const matches = profiles.filter(profile =>
        profile.teach.toLowerCase().includes(search)
    );

    if (matches.length === 0) {

        results.innerHTML =
            "<p>No one found for this skill.</p>";

        return;
    }

    matches.forEach(profile => {

        const div = document.createElement("div");

        div.className = "match";

        div.innerHTML = `
            👤 <strong>${escapeHTML(profile.name)}</strong>
            can teach
            <strong>${escapeHTML(profile.teach)}</strong>
        `;

        results.appendChild(div);
    });
}


function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


displayProfiles();

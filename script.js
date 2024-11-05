async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data loaded:', data);

        // Update meta tags
        document.title = data.meta.title;

        // Update basic info
        document.getElementById('name').textContent = data.basics.name;
        document.getElementById('role').textContent = data.basics.role;
        document.getElementById('email').href = `mailto:${data.basics.email}`;
        document.getElementById('linkedin').href = data.basics.linkedin;
        document.getElementById('github').href = data.basics.github;

        // Create sections
        const sectionsContainer = document.getElementById('sections-container');
        sectionsContainer.innerHTML = ''; // Clear existing content

        // About section
        sectionsContainer.innerHTML += `
            <section id="about">
                <h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    About Me
                </h2>
                <p>${data.basics.about}</p>
            </section>
        `;

        // Experience section
        const experienceHTML = data.experience.map(exp => `
            <li>
                <h3>${exp.title}</h3>
                <p>${exp.period}</p>
                <p>${exp.description}</p>
            </li>
        `).join('');

        sectionsContainer.innerHTML += `
            <section id="experience">
                <h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    Experience
                </h2>
                <ul>${experienceHTML}</ul>
            </section>
        `;

        // Education section
        const educationHTML = data.education.map(edu => `
            <li>
                <h3>${edu.institution}</h3>
                <p>${edu.degree}</p>
                <p>${edu.period}</p>
            </li>
        `).join('');

        sectionsContainer.innerHTML += `
            <section id="education">
                <h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                    </svg>
                    Education
                </h2>
                <ul>${educationHTML}</ul>
            </section>
        `;

        // Skills section
        const skillsHTML = data.skills.map(skill => `
            <span class="skill">${skill}</span>
        `).join('');

        sectionsContainer.innerHTML += `
            <section id="skills">
                <h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                    </svg>
                    Skills
                </h2>
                <div>${skillsHTML}</div>
            </section>
        `;

        // Languages section
        const languagesHTML = data.languages.map(lang => {
            const dots = Array(5).fill(0).map((_, i) => `
                ${i < lang.level ?
                    `<circle cx="${5 + i * 15}" cy="5" r="4" fill="var(--accent-color)" />` :
                    `<circle cx="${5 + i * 15}" cy="5" r="4" stroke="var(--accent-color)" stroke-width="1" fill="none" />`
                }
            `).join('');

            return `
                <div class="language">
                    <h4>${lang.name}</h4>
                    <svg width="100" height="10">
                        ${dots}
                    </svg>
                </div>
            `;
        }).join('');

        sectionsContainer.innerHTML += `
            <section id="languages">
                <h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 8h12M6 12h12M6 16h12"></path>
                    </svg>
                    Languages
                </h2>
                <div>${languagesHTML}</div>
            </section>
        `;

        // Certifications section
        const certificationsHTML = data.certifications.map(cert => `
            <li>${cert}</li>
        `).join('');

        sectionsContainer.innerHTML += `
            <section id="certifications">
                <h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="8" r="7"></circle>
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                    Certifications
                </h2>
                <ul>${certificationsHTML}</ul>
            </section>
        `;

        // Make sections visible
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('visible');
        });

        console.log('Data rendering complete');

    } catch (error) {
        console.error("Error loading or rendering data: ", error);
        document.getElementById('sections-container').innerHTML = `<p>Error loading data. Please try again later.</p>`;
    }
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeButton(isDark);
}

function updateThemeButton(isDark) {
    const button = document.querySelector('.theme-switch');
    button.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    button.innerHTML = isDark ?
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>' :
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    updateThemeButton(savedTheme === 'dark');
}

window.onload = () => {
    loadData();
    initTheme();
};
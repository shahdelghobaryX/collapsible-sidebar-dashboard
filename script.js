
// Get HTML elements
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");
const navLinks = document.querySelectorAll(".nav-link");
const pageTitle = document.querySelector(".top-bar h1");
const content = document.querySelector(".content");

// Sidebar toggle functionality
toggleBtn.addEventListener("click", function () {

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
        sidebar.classList.toggle("expanded");

        const isExpanded = sidebar.classList.contains("expanded");

        toggleBtn.setAttribute("aria-expanded", isExpanded);

        toggleBtn.setAttribute(
            "aria-label",
            isExpanded ? "Collapse sidebar" : "Expand sidebar"
        );

    } else {
        sidebar.classList.toggle("collapsed");

        const isCollapsed = sidebar.classList.contains("collapsed");

        toggleBtn.setAttribute("aria-expanded", !isCollapsed);

        toggleBtn.setAttribute(
            "aria-label",
            isCollapsed ? "Expand sidebar" : "Collapse sidebar"
        );
    }
});


// Pages content
const pages = {

    Dashboard: {
        title: "Dashboard",
        heading: "Welcome to DashFlow 👋",
        description: "Your dashboard is ready. Use the sidebar to navigate between different sections.",
        cards: [
            ["Analytics", "Track your performance.", "fa-chart-pie"],
            ["Projects", "Manage your projects.", "fa-folder-open"],
            ["Team", "Connect with your team.", "fa-users"]
        ]
    },

    Analytics: {
        title: "Analytics",
        heading: "Your Analytics 📊",
        description: "Monitor your performance and track your progress.",
        cards: [
            ["Total Visitors", "1,250 visitors this month.", "fa-chart-line"],
            ["Engagement", "Your engagement is growing.", "fa-users"],
            ["Performance", "Your dashboard is performing well.", "fa-chart-pie"]
        ]
    },

    Projects: {
        title: "Projects",
        heading: "Your Projects 📁",
        description: "Manage and organize all your projects.",
        cards: [
            ["Website Design", "Status: In Progress", "fa-laptop"],
            ["Mobile Application", "Status: Completed", "fa-mobile-screen"],
            ["Dashboard UI", "Status: In Progress", "fa-window-maximize"]
        ]
    },

    Team: {
        title: "Team",
        heading: "Meet Your Team 👥",
        description: "Connect and collaborate with your team members.",
        cards: [
            ["Development", "Your development team.", "fa-code"],
            ["Design", "Your design team.", "fa-palette"],
            ["Management", "Your management team.", "fa-users"]
        ]
    },

    Settings: {
        title: "Settings",
        heading: "Settings ⚙️",
        description: "Customize your dashboard preferences.",
        cards: [
            ["Profile", "Manage your personal information.", "fa-user"],
            ["Notifications", "Manage your notifications.", "fa-bell"],
            ["Privacy", "Manage your privacy preferences.", "fa-lock"]
        ]
    }

};


// Function to display selected page
function showPage(pageName) {

    const page = pages[pageName];

    if (!page) return;

    pageTitle.textContent = page.title;

    content.innerHTML = `
        <h2>${page.heading}</h2>
        <p>${page.description}</p>

        <div class="cards">
            ${page.cards.map(card => `
                <div class="card">
                    <i class="fa-solid ${card[2]}"></i>
                    <h3>${card[0]}</h3>
                    <p>${card[1]}</p>
                </div>
            `).join("")}
        </div>
    `;
}


// Navigation click functionality
navLinks.forEach(link => {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const pageName = link.querySelector(".link-text").textContent.trim();

        // Display selected page
        showPage(pageName);

        // Update active navigation link
        navLinks.forEach(nav => {
            nav.classList.remove("active");
        });

        link.classList.add("active");

        // Close mobile sidebar after selecting a page
        if (window.matchMedia("(max-width: 768px)").matches) {
            sidebar.classList.remove("expanded");
            toggleBtn.setAttribute("aria-expanded", "false");
            toggleBtn.setAttribute("aria-label", "Expand sidebar");
        }

    });

});

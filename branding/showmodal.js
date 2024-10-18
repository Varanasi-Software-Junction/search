document.addEventListener("DOMContentLoaded", function () {
    const MODAL_SHOW_TIME = 15000; // 15 seconds delay

    // Check localStorage to see if modal was already shown
    if (localStorage.getItem("modalShown")) {
        // Add the modal button at the top-right on page load
        addModalToggleButton();
    } else {
        // Wait 15 seconds and show modal if not shown
        setTimeout(() => {
            fetchModals();
        }, MODAL_SHOW_TIME);
    }

    // Load modal data from JSON and show appropriate modal
    function fetchModals() {
        fetch('modals.json')
            .then(response => response.json())
            .then(modals => {
                const today = new Date();
                let modalToShow = findRelevantModal(modals, today);

                if (modalToShow) {
                    showModal(modalToShow);
                }
            });
    }

    // Find relevant modal based on date or fallback to random
    function findRelevantModal(modals, today) {
        let dailyModal = modals.find(modal =>
            modal.type === "yearly" &&
            modal.day === today.getDate() &&
            modal.month === today.getMonth() + 1
        );

        let oneTimeModal = modals.find(modal =>
            modal.type === "one-time" &&
            modal.day === today.getDate() &&
            modal.month === today.getMonth() + 1 &&
            modal.year === today.getFullYear()
        );

        if (dailyModal) return dailyModal;
        if (oneTimeModal) return oneTimeModal;

        let randomModals = modals.filter(modal => modal.type === "random");
        return randomModals[Math.floor(Math.random() * randomModals.length)];
    }

    // Function to show the modal
    function showModal(modalData) {
        const modalHTML = `
        <div id="customModal" class="xzymmymode-overlay">
            <div class="xzymmymode-content">
                <span id="closeModal" class="xzymmymode-close">&times;</span>
                <h2>${modalData.title}</h2>
                <img src="${modalData.image}" alt="${modalData.title}" class="xzymmymode-image">
                <p>${modalData.text}</p>
                <a href="${modalData.link.url}" target="_blank">${modalData.link.caption}</a>
                <button id="modalActionBtn" class="xzymmymode-button">${modalData.button.caption}</button>
            </div>
        </div>`;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Event listener for close button
        document.getElementById("closeModal").addEventListener("click", closeModal);

        // Event listener for action button
        document.getElementById("modalActionBtn").addEventListener("click", function() {
            window.open(modalData.button.url, '_blank');
        });

        // Mark modal as shown in localStorage
        localStorage.setItem("modalShown", true);

        // Add button to top of page to allow showing modal again
        addModalToggleButton();
    }

    // Close modal and remove from DOM
    function closeModal() {
        const modal = document.getElementById("customModal");
        if (modal) modal.remove();
    }

    // Add toggle button for modal at the top of the page
    function addModalToggleButton() {
        // Prevent adding duplicate buttons
        if (document.getElementById("showModalAgain")) return;

        const toggleButtonHTML = '<button id="showModalAgain" style="position:fixed;top:10px;right:10px;z-index:1001;" class="xzymmymode-button">Show Modal</button>';
        document.body.insertAdjacentHTML('beforeend', toggleButtonHTML);

        document.getElementById("showModalAgain").addEventListener("click", function () {
            fetchModals();
        });
    }
});

// Modal CSS (Injected into the document)
const modalStyles = `
/* Modal Overlay */
.xzymmymode-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

/* Modal Content */
.xzymmymode-content {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    text-align: center;
    position: relative;
    width: 80%;
    max-width: 500px;
}

/* Close Button */
.xzymmymode-close {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 25px;
    font-weight: bold;
    color: #333;
    cursor: pointer;
}
.xzymmymode-close:hover {
    color: #ff0000;
}

/* Modal Heading */
.xzymmymode-content h2 {
    font-size: 24px;
    margin-bottom: 15px;
    color: #333;
}

/* Modal Image */
.xzymmymode-image {
    width: 100%;
    max-width: 300px; /* Control max width */
    height: auto;
    border-radius: 8px;
    margin-bottom: 15px;
}

/* Modal Text */
.xzymmymode-content p {
    font-size: 16px;
    color: #555;
    margin-bottom: 20px;
}

/* Modal Links */
.xzymmymode-content a {
    display: inline-block;
    text-decoration: none;
    color: #007BFF;
    font-weight: bold;
    margin-bottom: 20px;
}
.xzymmymode-content a:hover {
    color: #0056b3;
}

/* Modal Button */
.xzymmymode-button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}
.xzymmymode-button:hover {
    background-color: #218838;
}

/* Media Queries */
@media (max-width: 600px) {
    .xzymmymode-content {
        width: 95%;
    }
}
`;

// Inject CSS into the head
const styleElement = document.createElement("style");
styleElement.textContent = modalStyles;
document.head.appendChild(styleElement);

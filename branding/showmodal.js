document.addEventListener("DOMContentLoaded", function () {
    const MODAL_SHOW_TIME = 15000; // Time before modal shows (in milliseconds)
    const WHATSAPP_NUMBER = "1234567890"; // Your WhatsApp number

    // Check if modal was already shown
    if (localStorage.getItem("modalShown")) {
        addModalToggleButton(); // Show button immediately if modal has been shown
    } else {
        // Wait for the specified time and show the modal
        setTimeout(() => {
            fetchModals();
        }, MODAL_SHOW_TIME);
    }

    // Load modal data from JSON and show the appropriate modal
    function fetchModals() {
        fetch('modals.json')
            .then(response => response.json())
            .then(modals => {
                const today = new Date();
                let modalToShow = findRelevantModal(modals, today);

                if (modalToShow) {
                    showModal(modalToShow);
                }
            })
            .catch(error => console.error("Error loading modals:", error));
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

    // Function to show the modal with code display
    function showModal(modalData) {
        // Check if modalData has code, fallback to an empty array if not
        const codeBlocks = modalData.code && Array.isArray(modalData.code) && modalData.code.length > 0 ? 
            modalData.code.map(codeItem => `
                <div class="xzymmymode-code-block">
                    <pre><code>${codeItem.code}</code></pre>
                    <button class="xzymmymode-copy-button" onclick="copyToClipboard(\`${codeItem.code}\`)">Copy</button>
                </div>
            `).join('') : '<p>No code available.</p>'; // Fallback message if no code

        const modalHTML = `
        <div id="customModal" class="xzymmymode-overlay">
            <div class="xzymmymode-content">
                <span id="closeModal" class="xzymmymode-close">&times;</span>
                <h2>${modalData.title}</h2>
                <img src="${modalData.image}" alt="${modalData.title}" class="xzymmymode-image">
                <p>${modalData.text}</p>
                <a href="${modalData.link.url}" target="_blank">${modalData.link.caption}</a>
                <button class="xzymmymode-button" onclick="window.location.href='https://wa.me/${WHATSAPP_NUMBER}'">Contact via WhatsApp</button>
                <div class="xzymmymode-code-container">${codeBlocks}</div>
            </div>
        </div>`;

        const modalElement = document.createElement("div");
        modalElement.innerHTML = modalHTML;
        document.body.appendChild(modalElement);

        // Fade-in animation
        const modal = document.getElementById("customModal");
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.opacity = '1';
            modalElement.querySelector('.xzymmymode-content').style.transform = 'translateY(0)';
        }, 0);

        // Close modal and show button
        document.getElementById("closeModal").onclick = function () {
            fadeOutModal(modal, () => addModalToggleButton());
        };

        localStorage.setItem("modalShown", true); // Mark modal as shown
    }

    // Fade out modal
    function fadeOutModal(modal, callback) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
            callback(); // Call the callback after modal is removed
        }, 300); // Match this with the CSS transition duration
    }

    // Add toggle button for showing the modal again
    function addModalToggleButton() {
        const existingButton = document.querySelector('.xzymmymode-toggle-button');
        if (!existingButton) { // Only add button if it doesn't already exist
            const toggleButton = document.createElement("button");
            toggleButton.textContent = "Show Modal Again";
            toggleButton.className = "xzymmymode-toggle-button";
            toggleButton.onclick = () => {
                fetchModals();
            };
            document.body.appendChild(toggleButton);
        }
    }

    // Copy to clipboard function
    window.copyToClipboard = function (text) {
        navigator.clipboard.writeText(text).then(() => {
            alert("Code copied to clipboard!");
        }, () => {
            alert("Failed to copy code.");
        });
    };

    // Inject CSS into the head
    const styleElement = document.createElement("style");
    styleElement.textContent = `
        .xzymmymode-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            transition: opacity 0.3s ease;
            z-index: 1000;
        }
        .xzymmymode-content {
            background: white;
            padding: 20px;
            border-radius: 10px;
            width: 80%;
            max-width: 600px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            position: relative;
            opacity: 1;
            transition: transform 0.3s ease, opacity 0.3s ease;
            transform: translateY(-20px);
        }
        .xzymmymode-close {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
            font-size: 24px;
        }
        .xzymmymode-image {
            max-width: 100%;
            height: auto;
            border-radius: 5px;
        }
        .xzymmymode-code-container {
            margin-top: 20px;
            overflow: auto;
            max-height: 200px; /* Set height for scrolling */
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 10px;
            background-color: #f9f9f9;
        }
        .xzymmymode-code-block {
            font-family: 'Courier New', Courier, monospace; /* Different font for code */
            position: relative;
        }
        .xzymmymode-copy-button {
            position: absolute;
            top: 5px;
            right: 5px;
            padding: 5px 10px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        .xzymmymode-copy-button:hover {
            background-color: #0056b3;
        }
        .xzymmymode-button {
            background-color: #28a745;
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.3s ease;
            margin-top: 10px;
        }
        .xzymmymode-button:hover {
            background-color: #218838;
        }
        .xzymmymode-toggle-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #ffc107;
            color: #333;
            border: none;
            padding: 10px 15px;
            cursor: pointer;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transition: background-color 0.3s ease;
        }
        .xzymmymode-toggle-button:hover {
            background-color: #e0a800;
        }
    `;
    document.head.appendChild(styleElement);
});

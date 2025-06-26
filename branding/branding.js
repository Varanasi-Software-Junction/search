// branding.js

// Add the Google Font link to the document head
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Lora:wght@400;500;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);
// alert(fontLink);
// Add the 3D Flipping Image Section
const flipContainer = document.createElement('div');
flipContainer.className = 'flip-container';
flipContainer.innerHTML = `
    <div class='flipper'>
        <img alt='Me' class='flip-image' src='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEglwaii2_xBr47JtUxESk3iekPLl1TSI5B6RuwqNOs_8zk9iGlLqw3d_WprAhKKp3m9F1eO4XBh_JfU_jj6Ad759bHWsqU0evz1SdsG_XBJPc7nXmkbGHO2glvshLTd0fOaKlIGfEVHlEeltJcg2Azc70rVoswRtvH-QiohpHrAuuPEE1uwA9CToBM9foE/s16000/me.jpg'/>
    </div>
`;
document.body.appendChild(flipContainer);

// Add the WhatsApp Contact Button
const whatsappButton = document.createElement('a');
whatsappButton.href = 'https://wa.me/919335874326?text=Hi, I would like to get in touch!';
whatsappButton.target = '_blank';
whatsappButton.className = 'whatsapp-button';
whatsappButton.innerHTML = `
    <img src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' alt='WhatsApp' class='whatsapp-icon'>
    Contact Me on WhatsApp
`;
document.body.appendChild(whatsappButton);

// Add CSS styles with the "Lora" font for the local divs
const style = document.createElement('style');
style.innerHTML = `
    /* Apply font only to flip-container and whatsapp-button */
    /* Modal Box Styling */
.messages_XYZ_modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
}

.messages_XYZ_modal-box {
    background: #fff;
    padding: 30px;
    max-width: 400px;
    border-radius: 16px;
    text-align: center;
    font-family: 'Lora', serif;
    position: relative;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    animation: messages_XYZ_fadeIn 0.4s ease-in-out;
    transition:none;
}

.messages_XYZ_modal-box h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
    color: #333;
}

.messages_XYZ_modal-box p {
    font-size: 1.1em;
    color: #555;
}

.messages_XYZ_modal-close {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 24px;
    color: #888;
    cursor: pointer;
}

.messages_XYZ_modal-close:hover {
    color: #000;
}

@keyframes messages_XYZ_fadeIn {
    from {opacity: 0; transform: translateY(-20px);}
    to {opacity: 1; transform: translateY(0);}
}

/* Show Message Button Styling */
.messages_XYZ_show-message-btn {
    display: block;
    margin: 20px auto;
    padding: 10px 18px;
    background-color: #333;
    color: #fff;
    font-size: 16px;
    font-family: 'Lora', serif;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.messages_XYZ_show-message-btn:hover {
    background-color: #555;
}

    .flip-container, .whatsapp-button {
        font-family: 'Lora', serif;
    }

    /* 3D Flipping Image Section */
    .flip-container {
        width: 80px;
        height: 80px;
        position: absolute;
        top: 50px;
        left: 50px;
        perspective: 1000px;
        animation: move-around 20s infinite linear;
    }

    .flip-container .flipper {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.8s;
        transform-style: preserve-3d;
    }

    .flip-container:hover .flipper {
        border-style: ridge;
    }

    .flip-image {
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: 50%;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }

    /* Keyframe animation to move the image randomly */
    @keyframes move-around {
        0% { top: 20px; left: 20px; }
        25% { top: 50px; left: 80%; }
        50% { top: 80%; left: 50%; }
        75% { top: 50%; left: 20px; }
        100% { top: 20px; left: 20px; }
    }

    /* WhatsApp Button */
    .whatsapp-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 250px;
        padding: 12px;
        margin: 20px auto;
        background-color: #25D366;
        color: white;
        font-size: 16px;
        font-weight: bold;
        text-decoration: none;
        border-radius: 50px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        cursor: pointer;
        font-family: 'Lora', serif;
    }

    /* WhatsApp Icon */
    .whatsapp-icon {
        width: 24px;
        height: 24px;
        margin-right: 10px;
    }

    .whatsapp-button:hover {
        background-color: #128C7E;
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    }
`;
document.head.appendChild(style);


//********************************************************* */
// ========== FETCH AND DISPLAY TODAY'S MESSAGE ==========

const messageJsonUrl = 'https://varanasi-software-junction.github.io/search/messages.json';
const today = new Date().toISOString().split('T')[0];

// Show modal only if not seen today
if (localStorage.getItem('messageSeenDate') !== today) {
  fetch(messageJsonUrl)
    .then(res => res.json())
    .then(data => {
      if (data[today]) {
        showModalMessage(data[today]);
        localStorage.setItem('messageSeenDate', today);
      }
    })
    .catch(err => console.warn('Failed to load messages.json:', err));
}

// Manual trigger button
const showMessageBtn = document.createElement('button');
showMessageBtn.textContent = "📬 Show Today’s Message";
showMessageBtn.className = "messages_XYZ_show-message-btn";
showMessageBtn.onclick = () => {
  fetch(messageJsonUrl)
    .then(res => res.json())
    .then(data => {
      if (data[today]) showModalMessage(data[today]);
      else alert("No message for today.");
    })
    .catch(err => alert("Could not load the message."));
};
document.body.appendChild(showMessageBtn);

// Modal rendering function


function showModalMessage(message) {
  const flipImage = document.querySelector('.flip-container');
  const flipRect = flipImage.getBoundingClientRect();

  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'messages_XYZ_modal-overlay';
// alert(message);
  const modalBox = document.createElement('div');
  modalBox.className = 'messages_XYZ_modal-box';
  modalBox.innerHTML = `
    <span class="messages_XYZ_modal-close" title="Close">&times;</span>
    <h2>📩 Today’s Message</h2>
    <p>${message["content"]}</p>
    <p>${message["link"]}</p>
  `;

  // Start modal from flip-image position and size
  modalBox.style.position = 'fixed';
  modalBox.style.top = `${flipRect.top}px`;
  modalBox.style.left = `${flipRect.left}px`;
  modalBox.style.width = `${flipRect.width}px`;
  modalBox.style.height = `${flipRect.height}px`;
  modalBox.style.transform = 'scale(0)';
  modalBox.style.transition = 'all 0.5s ease-in-out';

  modalOverlay.appendChild(modalBox);
  document.body.appendChild(modalOverlay);

  // Wait for next frame to trigger animation to center
  requestAnimationFrame(() => {
    modalBox.style.top = '50%';
    modalBox.style.left = '50%';
    modalBox.style.transform = 'translate(-50%, -50%) scale(1)';
    modalBox.style.width = '90%';
    modalBox.style.maxWidth = '400px';
    modalBox.style.height = 'auto';
  });

  modalBox.querySelector('.messages_XYZ_modal-close').onclick = () => modalOverlay.remove();
  modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) modalOverlay.remove();
  };
}



//**************************************************** */

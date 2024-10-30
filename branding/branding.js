// branding.js

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
    /* Import Google Font */
    @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;700&display=swap');

    /* Apply font only to flip-container and whatsapp-button */
    .flip-container, .whatsapp-button {
        font-family: 'Lora', serif;
        font-size:700px;
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

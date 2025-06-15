// Load links dynamically from JSON
const DEFAULT_PIC = "https://blogger.googleusercontent.com/img/a/AVvXsEhlfwIqq3YYxj6LMFr4E7IKN2bYIor-bFpbUXBT3Jthp8PKmRdWozV3hEk2xcj3kPrJ9WBIkXCr4lw5MTAz0AE5b0lPhQ2ReNbCmMOumP4zLTEOb7GY6s4YWcgcCfzltJVmQcgCObeQNRvn_SWPa_2c6cROZUOBHhRJB20PaV-peuA3GTSafM8JxgaYu5M=s450";

async function loadLinks() {
    const urlParams = new URLSearchParams(window.location.search);

    function previewLink(div) {
  const iframe = div.querySelector('.preview-frame');
  const a = div.querySelector('a');
  iframe.src = a.href;
  iframe.style.display = "block";
}

function hidePreview(div) {
  const iframe = div.querySelector('.preview-frame');
  iframe.style.display = "none";
  iframe.src = ""; // optional: unload
}

    // alert(urlParams)
    const link = `${urlParams.get('menu')}.json`; // Menu file
    let q = urlParams.get('q'); // Search query
    if (q) {
        q= q.trim().toLowerCase();
    }
    else {

    }
    // alert(link);
    if (link.trim().toLowerCase().startsWith("null")) {
        // alert("No link");
        if (q) {
            location = `index.html?menu=assets/linksjson/mainlinks&q=${q}`;
        }
        else {
            location = `index.html?menu=assets/linksjson/mainlinks`;
        }
        return;
    }
    document.getElementById("quizSearch").value = q;
    const response = await fetch(link); // Fetch the JSON file
    const data = await response.json(); // Parse the JSON file
    // const header=document.getElementById("header");
    // header.innerHTML=data.header;
    // alert(data.header);
    // alert(header);
    const quizList = document.getElementById("quiz-list"); // Get the container for the links
    data.items.forEach(item => {
        const link = document.createElement("a"); // Create a new <a> element
        const innerdiv = document.createElement("div");
        innerdiv.addEventListener("mouseover",previewLink);
        innerdiv.classList.add("showthelink");
        // link.classList.add("showthelink"); // Add the showthelink class
        link.href = item.url; // Set the href attribute to the URL from JSON
        link.target = "_blank"; // Open link in a new tab
        link.textContent = item.title; // Set the text to the title from JSON
         const iframe=document.createElement("iframe");
         iframe.src=item.url;
         iframe.classList.add("preview-frame");
        innerdiv.appendChild(iframe);

         const img = document.createElement("img");
img.src = item.pic ? item.pic : DEFAULT_PIC;
img.alt = item.title;
img.className = "thumbnail";
innerdiv.appendChild(img);
        innerdiv.appendChild(link);
        // quizList.appendChild(link); // Append the link to the quiz list

        quizList.appendChild(innerdiv); // Append the link to the quiz list
    });
    // quizList.appendChild();
    filterQuizzes();
}

loadLinks();

// Initialize the search functionality


// Load links dynamically from JSON
async function loadLinks() {
    const urlParams = new URLSearchParams(window.location.search);
    // alert(urlParams)
    const link = `${urlParams.get('menu')}.json`; // Menu file
    const q = urlParams.get('q'); // Search query
    if (q) {
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
        innerdiv.classList.add("showthelink");
        // link.classList.add("showthelink"); // Add the showthelink class
        link.href = item.url; // Set the href attribute to the URL from JSON
        link.target = "_blank"; // Open link in a new tab
        link.textContent = item.title; // Set the text to the title from JSON
        /* const img=document.createElement("iframe");
         img.title=item.title;
         img.src=item.url;
         img.style="border-radius:50%;width:100px;height:100px";
         // link.innerHTML=img;
         // link.innerHTML = img; // Set the text to the title from JSON
         console.log (img.src);
         // quizList.appendChild(img);
         innerdiv.appendChild(img);*/
        innerdiv.appendChild(link);
        // quizList.appendChild(link); // Append the link to the quiz list

        quizList.appendChild(innerdiv); // Append the link to the quiz list
    });
    // quizList.appendChild();
    filterQuizzes();
}

loadLinks();

// Initialize the search functionality


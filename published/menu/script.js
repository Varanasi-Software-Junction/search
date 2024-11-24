document.addEventListener("DOMContentLoaded", () => {
    const toggleMenuButton = document.querySelector(".toggle-menu");
    const menu = document.querySelector(".menu");
    const subMenus = document.querySelectorAll(".has-submenu > a");
  
    // Toggle main menu
    toggleMenuButton.addEventListener("click", () => {
      menu.style.display = menu.style.display === "block" ? "none" : "block";
    });
  
    // Toggle submenus
    subMenus.forEach((submenuLink) => {
      submenuLink.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default link behavior
        const submenu = submenuLink.nextElementSibling;
  
        if (submenu.style.display === "block") {
          submenu.style.display = "none";
        } else {
          submenu.style.display = "block";
        }
      });
    });
  });
  
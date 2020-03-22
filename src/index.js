const menu = document.querySelector(".header_content");
window.onscroll = () => {
  if (window.pageYOffset >= screen.height && screen.width >= 768) {
    menu.classList.add("header_sticky");
  } else {
    menu.classList.remove("header_sticky");
  }
};

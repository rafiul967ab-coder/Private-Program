const text = "সবুজ স্যারের HSC private program এ স্বাগতম";
const words = text.split(" ");
const heading = document.getElementById("animated-heading");

words.forEach((word, index) => {
  const span = document.createElement("span");
  span.textContent = word;
  span.className = "animated-word";
  span.style.animationDelay = `${index * 0.15}s`;
  heading.appendChild(span);
});

const input = document.getElementById("subject-search");
const suggestionList = document.getElementById("suggestion-list");

input.addEventListener("focus", function() {
  suggestionList.classList.add("active");
});

input.addEventListener("input", function() {
  const query = this.value.trim().toLowerCase();
  const items = suggestionList.getElementsByTagName("li");

  let hasMatch = false;
  Array.from(items).forEach(item => {
    const textValue = item.textContent.toLowerCase();
    if (textValue.includes(query) || query === "") {
      item.style.display = "flex";
      hasMatch = true;
    } else {
      item.style.display = "none";
    }
  });

  if (hasMatch) {
    suggestionList.classList.add("active");
  } else {
    suggestionList.classList.remove("active");
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-box")) {
    suggestionList.classList.remove("active");
  }
});
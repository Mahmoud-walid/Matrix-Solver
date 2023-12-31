const switchContainer = document.createElement("label");
switchContainer.classList.add("switch");

const switchInput = document.createElement("input");
switchInput.classList.add("switch__input");
switchInput.setAttribute("type", "checkbox");
switchInput.setAttribute("role", "switch");

const savedDarkModeState = localStorage.getItem("darkMode");
if (savedDarkModeState === "true") {
  switchInput.checked = true;
}

switchInput.addEventListener("change", () => {
  const darkModeState = switchInput.checked;
  localStorage.setItem("darkMode", darkModeState);
});

const lightModeIcon = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "svg"
);
lightModeIcon.classList.add("switch__icon", "switch__icon--light");
lightModeIcon.setAttribute("viewBox", "0 0 12 12");
lightModeIcon.setAttribute("width", "12px");
lightModeIcon.setAttribute("height", "12px");
lightModeIcon.setAttribute("aria-hidden", "true");

lightModeIcon.innerHTML = `
    <g fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round">
        <circle cx="6" cy="6" r="2" />
        <g stroke-dasharray="1.5 1.5">
            <polyline points="6 10,6 11.5" transform="rotate(0,6,6)" />
            <polyline points="6 10,6 11.5" transform="rotate(45,6,6)" />
            <polyline points="6 10,6 11.5" transform="rotate(90,6,6)" />
            <polyline points="6 10,6 11.5" transform="rotate(135,6,6)" />
            <polyline points="6 10,6 11.5" transform="rotate(180,6,6)" />
            <polyline points="6 10,6 11.5" transform="rotate(225,6,6)" />
            <polyline points="6 10,6 11.5" transform="rotate(270,6,6)" />
            <polyline points="6 10,6 11.5" transform="rotate(315,6,6)" />
        </g>
    </g>
`;

const darkModeIcon = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "svg"
);
darkModeIcon.classList.add("switch__icon", "switch__icon--dark");
darkModeIcon.setAttribute("viewBox", "0 0 12 12");
darkModeIcon.setAttribute("width", "12px");
darkModeIcon.setAttribute("height", "12px");
darkModeIcon.setAttribute("aria-hidden", "true");

darkModeIcon.innerHTML = `
    <g fill="none" stroke="#fff" stroke-width="1" stroke-linejoin="round" transform="rotate(-45,6,6)">
        <path d="m9,10c-2.209,0-4-1.791-4-4s1.791-4,4-4c.304,0,.598.041,.883,.105-.995-.992-2.367-1.605-3.883-1.605C2.962,.5,.5,2.962,.5,6s2.462,5.5,5.5,5.5c1.516,0,2.888-.613,3.883-1.605-.285,.064-.578,.105-.883,.105Z"/>
    </g>
`;

const switchLabel = document.createElement("span");
switchLabel.classList.add("switch__sr");
switchLabel.textContent = "Dark Mode";

switchContainer.appendChild(switchInput);
switchContainer.appendChild(lightModeIcon);
switchContainer.appendChild(darkModeIcon);
switchContainer.appendChild(switchLabel);

export default switchContainer;

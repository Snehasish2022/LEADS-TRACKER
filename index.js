// --------------------------------------------------------------------------------------------------------
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const showEl = document.getElementById("show");
let myLeads = [];

const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
// --------------------------------------------------------------------------------------------------------

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
  });
});
// ---------------------------------------------------------------------------s------------------------------

deleteBtn.addEventListener("dblclick", function () {
  localStorage.removeItem("myLeads");

  myLeads = [];

  showEl.innerHTML = "";
});
// ---------------------------------------------------------------------------------------------------------

if (localStorage.getItem("myLeads")) {
  myLeads = JSON.parse(localStorage.getItem("myLeads"));
  renderLeads(myLeads);
}

// --------------------------------------------------------------------------------------------------------
inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  renderLeads(myLeads);
});

// ---------------------------------------------------------------------------------------------------------

function renderLeads(leads) {
  let listItems = "";
  for (let i = 0; i < myLeads.length; i++) {
    listItems += `
       <li>
            <a target='_blank' href='${leads[i]}' onclick="handleLinkClick(event)">
            ${leads[i]}
            </a>
       </li>
    `;
  }
  showEl.innerHTML = listItems;
}
// -----------------------------------------------------------------------------------------------------------

function handleLinkClick(event) {
  // Prevent the default behavior of the link
  event.preventDefault();

  // Get the URL of the clicked link
  const linkUrl = event.target.getAttribute("href");

  // Open the link in a new tab
  window.open(`https://${linkUrl}`, "_blank");
}
// ------------------------------------------------------------------------------------------------

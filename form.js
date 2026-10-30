
const form = document.querySelector("#eventForm");
const choose = document.querySelector("#choose");
const notesContainer = document.querySelector("#notesContainer");
const notes = document.querySelector("#notes");
const studentID = document.querySelector("#studentID");
const ID = document.querySelector("#ID");
const output = document.querySelector("#output");


function updateAccessCode() {
  const value = choose.value;

  if(value === "guest") {
    notesContainer.hidden = false;
    notes.required = true;
  }   else {
    notesContainer.hidden = true;
    notes.required = false;
  }
}
// Show the travel notes on the form if they are choosing many campuses and require it
function updateStudentID() {
  const value = choose.value;
  if (value === "student") {
    studentID.hidden = false;
    ID.required = true;
  }   else {
    studentID.hidden = true;
    ID.required = false;
  }
}

choose.addEventListener("change", updateAccessCode);
choose.addEventListener("change", updateStudentID);
updateAccessCode();
updateStudentID();


// Ensure they choose a date later than the current date
function isPastDate(value) {
  const today = new Date();
  const chosen = new Date(value);
  return chosen < today;
}


form.addEventListener("submit", function (event) {
    //stops values from being put in url
    //stop page from reloading event prevent
  event.preventDefault();

    console.log(event.target.email.value)


  output.textContent = "";

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const type = form.choose.value;
  const availableDate = form.availableDate.value;
  const note = form.notes.value.trim();
  const studentNumber = form.ID.value.trim();

    
  
  if(type === "guest" && note !== "EVENT131" ) {
    output.textContent = "Please enter the correct Access Code"
    return;
  }

  if (type === "student" && studentNumber.length !== 9 ) {
    output.textContent = "Student ID must be exactly 9 digits"
    return;
  }
  

  if (isPastDate(availableDate)) {
    output.textContent = "Please choose a later date.";
    return;
  }

  output.innerHTML = `
  <h2>Ticket Created</h2>
  <p>${firstName} ${lastName}</p>
  <p>${type}</p>
  <p>${availableDate}</p>
  `;

  form.reset();
  updateAccessCode();
  updateStudentID();
});
          
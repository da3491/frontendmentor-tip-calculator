// All buttons and inputs are labeled with the class to handle all of them at once
const inputs = document.querySelectorAll(".user-input");

// Create a state object to track all the input variables
let state = {};

// Check all the inputs for their id or their parents id.
// If they have an id, then set the state equal to the element value.
// After setting/updating state, run checkInputs function
inputs.forEach((input) => {
  let inputId = input.id;
  if (!inputId) {
    inputId = input.closest("[id]").id;
    if (!inputId) {
      return;
    }
  }

  input.addEventListener("input", function () {
    state[inputId] = input.value;
    checkInputs(state);
  });

  input.addEventListener("click", function () {
    state[inputId] = input.value;
    checkInputs(state);
  });
});

// Check the state to see if it has all valid values to calculate, if so run calculateTip
function checkInputs(state) {
  const keys = ["billInput", "tipInput", "peopleInput"];
  for (const key of keys) {
    if (!state[key] || isNaN(state[key]) || state[key] <= 0) {
      return;
    }
  }
  // Continue with the function
  console.log("All are valid");
  calculateTip();
}

// Take all the values of state and calculate the individual tip and total
function calculateTip() {
  let tipToPay = state.billInput * (state.tipInput * 0.01);
  let totalBill = parseInt(state.billInput) + tipToPay;
  let tipPerPerson = tipToPay / state.peopleInput;
  let totalPerPerson = totalBill / state.peopleInput;

  console.log(tipPerPerson);
  document.getElementById("tipPerPerson").textContent = tipPerPerson.toFixed(2);
  console.log(totalPerPerson);
  document.getElementById("totalPerPerson").textContent =
    totalPerPerson.toFixed(2);
}

// When the reset button is clicked, reset all the values of inputs and outputs
document.querySelector(".btn__reset").addEventListener("click", function () {
  state = {};
  document.getElementById("billInput").value = "";
  document.getElementById("customTipInput").value = "";
  document.getElementById("peopleInput").value = "";
  document.getElementById("tipPerPerson").textContent = "0.00";
  document.getElementById("totalPerPerson").textContent = "0.00";
  console.log(state);
});

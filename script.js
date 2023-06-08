"use strict";

let textArray = [];
let totalPersons = 0;

// clickEvent function
function clickedEvent(event) {
  //taking the input how many persons

  totalPersons = document.getElementById("no-of-persons").value;
  
  document.getElementById("no-of-persons").value = null;

  //1.getting the input from the drop down 1,2,and 3

  let roomsTwoShareSelected = document.getElementById("twoshare");
  let roomsThreeShareSelected = document.getElementById("threeshare");
  let roomsFourShareSelected = document.getElementById("fourshare");

  //2.getting the input from the food menu

  let foodMenu = Number(document.getElementById("food-id").value);

  //3.getting input from hotel check-in-out

  let checkIn = new Date(document.getElementById("check-in").value);
  let checkOut = new Date(document.getElementById("check-out").value);
  let totalNights = checkOut.getDate() - checkIn.getDate();
if (checkIn > checkOut) {
    alert("Check in date cannot be greater than check out date");
  } else {
    //pushing the room share value to the array

    textArray.push(
      Number(
        roomsTwoShareSelected.options[roomsTwoShareSelected.selectedIndex].text
      )
    );
    textArray.push(
      Number(
        roomsThreeShareSelected.options[roomsThreeShareSelected.selectedIndex]
          .text
      )
    );
    textArray.push(
      Number(
        roomsFourShareSelected.options[roomsFourShareSelected.selectedIndex]
          .text
      )
    );

    calculateTheCost(textArray, foodMenu, totalNights);
  }
}

document.querySelector(".Submit").addEventListener("click", clickedEvent);

//calculating the cost
let sum = 0;
const foodCostArray = {
  0: [1400, 1600, 1900],
  1: [1800, 2200, 2700],
  2: [2200, 3000, 3800],
  3: [2700, 3500, 4000],
};

function calculateTheCost(textArray, foodMenu, totalNights) {
  for (const [index, val] of textArray.entries()) {
    //note:foodCostArray[foodMenu] means you are calling the object foodcostArray
    
    sum += foodCostArray[foodMenu][index] * val;
  }
  //displaying the result
  sum = sum * totalNights;
  

  document.getElementById(
    "result"
  ).textContent = ` The Cost of your Customised Package is Rs ${sum}`;
}
function handleRadioClick() {
  const hideSelect = document.querySelector(".hidden-select");

  const hideRadio = document.querySelector(".hidden-radio");
  const hiddenQuestion = document.querySelector(".hiddenQuestion");

  if (document.getElementById("self-drive-cars").checked) {
    
    hideRadio.style.display = "block";
    hideSelect.style.display = "none";
    
  }
  if (document.getElementById("Vechicle--driver").checked) {
    
    hiddenQuestion.style.display = "block";
    document.getElementById("HQ").selectedIndex = -1;

    hideRadio.style.display = "none";
    hideSelect.style.display = "block";
  }
  if (document.getElementById("Two-Wheeler").checked) {
    
    hideRadio.style.display = "none";
    hideSelect.style.display = "none";
  }
}
const radioButtons = document.querySelectorAll('input[name="sight-seeing"]');
radioButtons.forEach((radio) => {
  radio.addEventListener("click", handleRadioClick);
});

const goaSpan1 = document.querySelector(".goa-span1");
const goaSpan2 = document.querySelector(".goa-span2");
const goaSpan3 = document.querySelector(".goa-span3");
const goaSpan4 = document.querySelector(".goa-span4");

document.getElementById("HQ").addEventListener("change", function () {
  

  // if(document.getElementById('HQ').value==0){
  //   goaSpan1.style.display='block';
  // }
  const switches = document.getElementById("HQ").value;
  

  switch (switches) {
    case "0":
      
      goaSpan1.style.display = "block";
      break;
    case "1":
      goaSpan1.style.display = "block";
      goaSpan2.style.display = "block";
      break;
    case "2":
      goaSpan1.style.display = "block";
      goaSpan2.style.display = "block";
      goaSpan3.style.display = "block";
      break;
    default:
      goaSpan1.style.display = "block";
      goaSpan2.style.display = "block";
      goaSpan3.style.display = "block";
  }
});

const dropDown = [
  ["North-Goa I", "North-Goa II", "South Goa", "Extreme south Goa"],
  ["North-Goa I", "North-Goa II", "Extreme south Goa", "South Goa"],
  ["North-Goa I", "South Goa", "North-Goa II", "Extreme south Goa"],
  ["North-Goa I", "South Goa", "Extreme south Goa", "North-Goa II"],
  ["North-Goa I", "Extreme south Goa", "North-Goa II", "South Goa"],
  ["North-Goa I", "Extreme south Goa", "South Goa", "North-Goa II"],
  ["North-Goa II", "North-Goa I", "South Goa", "Extreme south Goa"],
  ["North-Goa II", "North-Goa I", "Extreme south Goa", "South Goa"],
  ["North-Goa II", "South Goa", "North-Goa I", "Extreme south Goa"],
  ["North-Goa II", "South Goa", "Extreme south Goa", "North-Goa I"],
  ["North-Goa II", "Extreme south Goa", "North-Goa I", "South Goa"],
  ["North-Goa II", "Extreme south Goa", "South Goa", "North-Goa I"],
  ["South Goa", "North-Goa I", "North-Goa II", "Extreme south Goa"],
  ["South Goa", "North-Goa I", "Extreme south Goa", "North-Goa II"],
  ["South Goa", "North-Goa II", "North-Goa I", "Extreme south Goa"],
  ["South Goa", "North-Goa II", "Extreme south Goa", "North-Goa I"],
  ["South Goa", "Extreme south Goa", "North-Goa I", "North-Goa II"],
  ["South Goa", "Extreme south Goa", "North-Goa II", "North-Goa I"],
  ["Extreme south Goa", "North-Goa I", "North-Goa II", "South Goa"],
  ["Extreme south Goa", "North-Goa I", "South Goa", "North-Goa II"],
  ["Extreme south Goa", "North-Goa II", "South Goa", "North-Goa I"],
  ["Extreme south Goa", "North-Goa II", "North-Goa I", "South Goa"],
  ["Extreme south Goa", "South Goa", "North-Goa I", "North-Goa II"],
  ["Extreme south Goa", "South Goa", "North-Goa II", "North-Goa I"],
];

// function makeDropDown(dropDown,level1Filter,level2Filter) {
//   console.log("level2filter "+ level2Filter)

//   const filteredArray1 = dropDown.filter((ele) => ele[0] === level1Filter);

//   const uniqueValuesof2 = new Set();

//   filteredArray1.forEach((ele) => uniqueValuesof2.add(ele[1]));
//   const uniqueList = [...uniqueValuesof2];

//   const selectLevel2 = document.getElementById("goa-location2");

//   selectLevel2.innerHTML=''

//   uniqueList.forEach((item) => {
//     const option = document.createElement("option");
//     option.textContent = item;
//     selectLevel2.appendChild(option);
//   });

//   console.log(uniqueList);
// }

// function applyDropDown(){
//   const selectedLevel1=document.getElementById('goa-location1').value
//   const selectedLevel2=document.getElementById('goa-location2').value

//   makeDropDown(dropDown,selectedLevel1,selectedLevel2)
//   console.log("selectedLevel2 "+ selectedLevel2)
// }

// function afterDocumentLoads(){
//   applyDropDown()
// }

// function getUniqueList(){

// }
// document.addEventListener('DOMContentLoaded',afterDocumentLoads)
// document.getElementById('goa-location1').addEventListener('change',applyDropDown)
// document.getElementById('goa-location2').addEventListener('change',applyDropDown)
let selectedLevel1 = document.getElementById("goa-location1").value;
let selectedLevel2 = document.getElementById("goa-location2");
let selectedLevel3 = document.getElementById("goa-location3");
let selectedLevel4 = document.getElementById("goa-location4");



const select1ToNone = (document.getElementById("goa-location1").selectedIndex =
  -1);

document
  .getElementById("goa-location1")
  .addEventListener("change", function () {

    document.getElementById(
      "goa-location2"
    ).innerHTML = `<option value="0">North-Goa I</option>
  <option value="1">North-Goa II</option>
  <option value="2">South Goa</option>
  <option value="3">Extreme south Goa</option>`;

    selectedLevel1 = document.getElementById("goa-location1").value;

    console.log("selectedLevel1 " + selectedLevel1);

    selectedLevel2 = document.getElementById("goa-location2");

    selectedLevel2.removeChild(selectedLevel2.children[selectedLevel1]);

    const select2ToNone = (document.getElementById(
      "goa-location2"
    ).selectedIndex = -1);
  });

document
  .getElementById("goa-location2")
  .addEventListener("change", function () {
    document.getElementById(
      "goa-location3"
    ).innerHTML = `<option value="0">North-Goa I</option>
  <option value="1">North-Goa II</option>
  <option value="2">South Goa</option>
  <option value="3">Extreme south Goa</option>`;

    selectedLevel1 = Number(document.getElementById("goa-location1").value);
    selectedLevel2 = Number(document.getElementById("goa-location2").value);

    document.getElementById("goa-location3").removeChild(document.getElementById("goa-location3").children[selectedLevel2]);
    document.getElementById("goa-location3").removeChild(document.getElementById("goa-location3").children[selectedLevel1]);

    const select3ToNone = (document.getElementById(
      "goa-location3"
    ).selectedIndex = -1);
  });

document
  .getElementById("goa-location3")
  .addEventListener("change", function () {
    selectedLevel1 = Number(document.getElementById("goa-location1").value);

    selectedLevel2 = Number(document.getElementById("goa-location2").value);
    selectedLevel3 = Number(document.getElementById("goa-location3").value);

    const goaSpan4 = document.querySelector(".goa-span4");
    goaSpan4.style.display = "block";

    const result = 6 - (selectedLevel1 + selectedLevel2 + selectedLevel3);

    const goaLocation = {
      0: "North-Goa I",
      1: "North-Goa II",
      2: "South Goa",
      3: "Extreme south Goa",
    };

    document.getElementById(
      "goa-location4"
    ).innerHTML = `your Day 4 is set to ${goaLocation[result]}`;
  });

function resets() {
  
  resets.selectedIndex = -1;
  goaSpan1.style.display = "none";
  goaSpan2.style.display = "none";
  goaSpan3.style.display = "none";

  document.getElementById("HQ").selectedIndex= -1;
  document.getElementById("goa-location1").selectedIndex = -1;
  document.getElementById("goa-location2").selectedIndex = -1;
  document.getElementById("goa-location3").selectedIndex = -1;

  document.getElementById("goa-location1").value = "";
  document.getElementById("goa-location2").value = "";
  document.getElementById("goa-location3").value = "";

  document.getElementById("goa-location2").innerHTML = "";
  document.getElementById("goa-location3").innerHTML = "";
  document.getElementById("goa-location4").innerHTML = "";
  document.getElementById("goa-location4").innerHTML = "";
}

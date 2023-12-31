"use strict";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {initializeApp} from 'firebase/app';
import {getFirestore,collection,getDocs,addDoc} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBPIn98znYDQH3TPSQBJiQ2AIwjYZLKy3U",
  authDomain: "goa-firebase.firebaseapp.com",
  projectId: "goa-firebase",
  storageBucket: "goa-firebase.appspot.com",
  messagingSenderId: "497483938786",
  appId: "1:497483938786:web:9f5c35eb43c32d0736d7bb",
  measurementId: "G-CB36YB3SJN"
};

let textArray = [];
let totalPersons = 0;
let totalNights = 0;
let totalCosts = 0;
let hotelName = [];
let roomsTwoShareSelected;
let roomsThreeShareSelected;
let roomsFourShareSelected;
let totalCostForHotelRooms = 0;
let sightSeeingCost;
let costForPickandDrop;
let costForAddon;
let numberValue = 0;
let specialisedRooms;
let costForSif = 0;
let isblockdate = false;
let blockedCount = 0;
let normaldays = 0;
let fileter;
let trackroomAndFoodCost = [];
let valuesArray = []; //for south indian food
let siteSeeingStatus = false; //to generate pdf inclusion and exclusion
let pickUpDropStatus = false;
let addonStatus = "";
let originalTotalNights = 0;
let includingServiceChargePerHead = 0;
let allCost = 0;
let perHeadCost = 0;
let radioButtons=[];
const optionMenu = document.getElementById("hotel-id");
let hotels;
//lets make a function to get the text content of selected index
function textContentOfSelectedIndex(id) {
  const selectedItem = document.getElementById(id);
  const selectedItemIndex = selectedItem.selectedIndex;
  return selectedItem.options[selectedItemIndex].textContent;
}
const blockedDates = [
  "2023-08-10",
  "2023-08-11",
  "2023-08-12",
  "2023-08-13",
  "2023-08-14",
  "2023-08-15",
  "2023-08-16",
  "2023-08-17",
  "2023-08-18",
  "2023-09-15",
  "2023-09-16",
  "2023-09-17",
  "2023-09-18",
  "2023-09-19",
  "2023-09-20",
  "2023-09-21",
  "2023-09-28",
  "2023-09-29",
  "2023-09-30",
  "2023-10-01",
  "2023-10-02",
  "2023-10-03",
];
document.getElementById("no-of-persons").selectedIndex = null;
document.getElementById("goa-location1").selectedIndex = null;
document.getElementById("goa-location2").selectedIndex = null;
document.getElementById("goa-location3").selectedIndex = null;
document.getElementById("goa-location4").selectedIndex = null;
document.getElementById("food-id").selectedIndex = -1;
let arrayToCollectLoc = [];

document.querySelector(".Submit").addEventListener("click", formValidation);
function formValidation(event) {
  console.log("validating before every other Event listner");
  const noOfPersons = document.getElementById("no-of-persons");
  const dateIn = document.getElementById("check-in");
  const dateOut = document.getElementById("check-out");
  const hotelCategory = document.getElementById("hotel-type-id");
  const foodType = document.getElementById("food-id");
  const pickUpLocation = document.querySelector(".add-pickup");
  const dropLocation = document.querySelector(".add-drop");
  console.log(document.querySelector(".add-pickup-drop").textContent);
  const checkEachField = [
    noOfPersons,
    dateIn,
    dateOut,
    hotelCategory,
    foodType,
  ];
  for (let i = 0; i < checkEachField.length; i++) {
    if (!checkEachField[i].value) {
      console.log(`checking the ${checkEachField[i].nodeName} field`);
      checkEachField[i].classList.add("error");
      setTimeout(() => {
        checkEachField[i].classList.remove("error");
      }, 1000);
      // checkEachField[i].classList.remove('error'); // Remove the 'error' class if the field is filled

      return false;
    }
  }
  return true;
}

// clickEvent function--when click submit button
function clickedEvent(event) {
  // console.log("formValidationStatus "+formValidationStatus)
  console.log(
    "-----------------------1st Evnt listner it has following cost---------------------------------"
  );
  //taking the input how many persons
  event.preventDefault();
  totalPersons = document.getElementById("no-of-persons").value;
  console.log("totalPersons " + totalPersons);

  //1.getting the input from the drop down 1,2,and 3

  roomsTwoShareSelected = document.getElementById("twoshare");
  roomsThreeShareSelected = document.getElementById("threeshare");
  roomsFourShareSelected = document.getElementById("fourshare");

  //2.getting the input from the food menu

  let foodMenu = Number(document.getElementById("food-id").value);

  //3.getting input from hotel check-in-out

  // let checkIn = new Date(document.getElementById("check-in").value);
  // let checkOut = new Date(document.getElementById("check-out").value);
  // let timeDiff = checkOut.getTime() - checkIn.getTime();
  // totalNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  // console.log("Nights: " + totalNights);

  if (false) {
    alert("Check in date cannot be greater than check out date");
  } else {
    //pushing the room share value to the array
    // textArray = [];

    // textArray.push(
    //   Number(
    //     roomsTwoShareSelected.options[roomsTwoShareSelected.selectedIndex].text
    //   )
    // );
    // textArray.push(
    //   Number(
    //     roomsThreeShareSelected.options[roomsThreeShareSelected.selectedIndex]
    //       .text
    //   )
    // );
    // textArray.push(
    //   Number(
    //     roomsFourShareSelected.options[roomsFourShareSelected.selectedIndex]
    //       .text
    //   )
    // );

    // const costRoomFood = calculateTheCost(textArray, foodMenu, totalNights);

    //--------------the above code is not needed any more as we have to calculate from the google sheets,,,,that new data is in the function calulateCostForHotels

    //-------------adding sightseeing cost---------------//

    sightSeeingCost = totalCostForSightSeeing();

    //-----adding pickupdrop----------------//
    // const total=totalCostForPickupAndDrop();
    const seater = calcSeaters();
    costForPickandDrop = calcPickupDropcost(
      seater,
      pickupPoint.value,
      dropPoint.value
    );
    totalCosts = sightSeeingCost + costForPickandDrop;

    console.log("sightSeeingCost " + sightSeeingCost);
    console.log("costForPickandDrop " + costForPickandDrop);
    console.log(
      "_______End of first Event listner____________________________"
    );
  }

  // document.getElementById("no-of-persons").value = null;
}

document.querySelector(".Submit").addEventListener("click", clickedEvent);

//calculating the cost

const foodCostArray = {
  0: [1400, 1600, 1900],
  1: [1800, 2200, 2700],
  2: [2200, 3000, 3800],
  3: [2700, 3500, 4000],
};

function calculateTheCost(textArray, foodMenu, totalNights) {
  let sum = 0;
  for (const [index, val] of textArray.entries()) {
    //note:foodCostArray[foodMenu] means you are calling the object foodcostArray

    sum += foodCostArray[foodMenu][index] * val;
  }
  console.log("food+room for 1 day: " + sum);
  //displaying the result
  sum = sum * totalNights;

  console.log("food+room: " + "for " + totalNights + " nights " + sum);

  // document.getElementById(
  //   "result"
  // ).textContent = ` The Cost of your Customised Package is Rs ${sum}`;
  return sum;
}

//-------------------sight seeing-----------------------------//

//It displays according to the radio button selected
function handleRadioClick() {
  const hideSelect = document.querySelector(".hidden-select");

  const hideRadio = document.querySelector(".hidden-radio");
  const hiddenQuestion = document.querySelector(".hiddenQuestion");
  const hideTwoWheelers = document.querySelector(".hidden-two-wheeler");
  const hideTwoWheelerquestion = document.querySelector(
    ".two-wheeler-question"
  );
  const hideFourWheelerquestion = document.querySelector(
    ".four-wheeler-question"
  );

  if (document.getElementById("self-drive-cars").checked) {
    calculateSelfDriveCars();

    hideSelect.style.display = "none";
    hiddenQuestion.style.display = "none";
    hideTwoWheelers.style.display = "none";
    hideTwoWheelerquestion.style.display = "none";
    hideFourWheelerquestion.style.display = "block";
  }
  if (document.getElementById("Vechicle--driver").checked) {
    hiddenQuestion.style.display = "block";
    // document.getElementById("HQ").selectedIndex = -1;

    hideRadio.style.display = "none";
    hideSelect.style.display = "block";
    hideTwoWheelers.style.display = "none";
    hideTwoWheelerquestion.style.display = "none";
    hideFourWheelerquestion.style.display = "none";
  }
  if (document.getElementById("Two-Wheeler").checked) {
    calculateTwoWheelers();
    hideRadio.style.display = "none";
    hideSelect.style.display = "none";
    hiddenQuestion.style.display = "none";
    hideTwoWheelerquestion.style.display = "block";
    hideFourWheelerquestion.style.display = "none";
  }
}

//event listneer method when radio button is clicked
radioButtons = document.querySelectorAll('input[name="sight-seeing"]');
radioButtons.forEach((radio) => {
  radio.addEventListener("click", handleRadioClick);
});

//global declaration
const goaSpan1 = document.querySelector(".goa-span1");
const goaSpan2 = document.querySelector(".goa-span2");
const goaSpan3 = document.querySelector(".goa-span3");
const goaSpan4 = document.querySelector(".goa-span4");

//to display according to number of days selected

document.getElementById("HQ").addEventListener("change", function () {
  // if(document.getElementById('HQ').value==0){
  //   goaSpan1.style.display='block';
  // }
  const switches = document.getElementById("HQ").value;
  console.log(switches);

  switch (switches) {
    case "0":
      goaSpan1.style.display = "block";
      goaSpan2.style.display = "none";
      goaSpan3.style.display = "none";
      goaSpan4.style.display = "none";
      break;
    case "1":
      goaSpan1.style.display = "block";
      goaSpan2.style.display = "block";
      goaSpan3.style.display = "none";
      goaSpan4.style.display = "none";
      break;
    case "2":
      goaSpan1.style.display = "block";
      goaSpan2.style.display = "block";
      goaSpan3.style.display = "block";
      goaSpan4.style.display = "none";
      break;
    case "3":
      goaSpan1.style.display = "block";
      goaSpan2.style.display = "block";
      goaSpan3.style.display = "block";
      goaSpan4.style.display = "block";
    case " ":
      goaSpan1.style.display = "block";
      goaSpan2.style.display = "block";
      goaSpan3.style.display = "block";
      goaSpan4.style.display = "block";
  }
});

// global declaration
let selectedLevel1 = document.getElementById("goa-location1").value;
let selectedLevel2 = document.getElementById("goa-location2");
let selectedLevel3 = document.getElementById("goa-location3");
let selectedLevel4 = document.getElementById("goa-location4");

const select1ToNone = (document.getElementById("goa-location1").selectedIndex =
  -1);

// change evet for day 1
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

// change evet for day 2
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

    document
      .getElementById("goa-location3")
      .removeChild(
        document.getElementById("goa-location3").children[selectedLevel2]
      );
    document
      .getElementById("goa-location3")
      .removeChild(
        document.getElementById("goa-location3").children[selectedLevel1]
      );

    const select3ToNone = (document.getElementById(
      "goa-location3"
    ).selectedIndex = -1);
  });

// change evet for day 3 and day 4

document
  .getElementById("goa-location3")
  .addEventListener("change", function () {
    selectedLevel1 = Number(document.getElementById("goa-location1").value);

    selectedLevel2 = Number(document.getElementById("goa-location2").value);
    selectedLevel3 = Number(document.getElementById("goa-location3").value);

    // const goaSpan4 = document.querySelector(".goa-span4");
    // goaSpan4.style.display = "block";

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

//resetiing only 3rd options in the radio
function resets() {
  resets.selectedIndex = -1;
  console.log(resets.selectedIndex);
  goaSpan1.style.display = "none";
  goaSpan2.style.display = "none";
  goaSpan3.style.display = "none";

  // document.getElementById("HQ").selectedIndex = -1;
  document.getElementById("goa-location1").selectedIndex = -1;
  document.getElementById("goa-location2").selectedIndex = -1;
  document.getElementById("goa-location3").selectedIndex = -1;

  document.getElementById("goa-location1").value = "";
  document.getElementById("goa-location2").value = "";
  document.getElementById("goa-location3").value = "";

  document.getElementById("goa-location2").innerHTML = "";
  document.getElementById("goa-location3").innerHTML = "";
  document.getElementById("goa-location4").innerHTML = "";

  document.getElementById("HQ").selectedIndex = -1;
  document.getElementById("HQ").value = "";

  document.getElementById("four-wheeler-question").value =
    document.getElementById("four-wheeler-question").innerHTML = "";

  document.getElementById("two-wheeler-question").value =
    document.getElementById("two-wheeler-question").innerHTML = "";
}
// console.log(document.querySelector("goa-location4"));

//calcualte cost for two wheelers
const calculateTwoWheelers = function () {
  document.querySelector(".hidden-two-wheeler").style.display = "block";
  totalPersons = document.getElementById("no-of-persons").value;
  const daysTwoWheeler = document.getElementById("two-wheeler-question").value;
  document.getElementById("htw").innerHTML = `You Will Get ${Math.round(
    totalPersons / 2
  )} bikes`;
  const costForTwoWheeler = 400 * Math.round(totalPersons / 2) * daysTwoWheeler;
  console.log("costForTwoWheeler 1 day: " + 400 * Math.round(totalPersons / 2));
  console.log(`costForTwoWheeler ${daysTwoWheeler} days: ${costForTwoWheeler}`);

  // console.log(costForTwoWheeler/daysTwoWheeler)
  return costForTwoWheeler;
};

//calclualte cosr selfdrive cars
const calculateSelfDriveCars = function () {
  totalPersons = document.getElementById("no-of-persons").value;
  const daysFourWheeler = document.getElementById(
    "four-wheeler-question"
  ).value;
  console.log(totalPersons);
  // hideRadio.style.display = "block";
  const totalPasssengers = totalPersons;
  let fiveSeater = 0;
  let eightSeater = 0;
  let remiander = totalPasssengers % 8;
  let quotient = Math.floor(totalPasssengers / 8);
  if (remiander == 0) {
    eightSeater = quotient;
    fiveSeater = 0;
  } else {
    if (totalPasssengers < 8) {
      if (totalPasssengers <= 5) {
        fiveSeater = 1;
        eightSeater = 0;
      }
      if (totalPasssengers > 5 && totalPasssengers < 8) {
        eightSeater = 1;
        fiveSeater = 0;
      }
    } else {
      if (remiander <= 2) {
        eightSeater = quotient - 1;
        fiveSeater = 2;
      }
      if (remiander >= 6) {
        eightSeater = quotient + 1;
        fiveSeater = 0;
      }
      if (remiander >= 3 && remiander <= 5) {
        fiveSeater = 1;
        eightSeater = quotient;
      }
    }
  }

  // console.log(document.getElementById("hr"));

  document.getElementById("hr").style.display = "block";

  document.getElementById(
    "hr"
  ).innerHTML = `You will get ${eightSeater} Eight seater and ${fiveSeater} Five seater`;
  const costForSelfDrive =
    (eightSeater * 2500 + fiveSeater * 1500) * daysFourWheeler;
  console.log(
    `costForSelfDrive for 1 day: ${eightSeater * 2500 + fiveSeater * 1500}`
  );
  console.log(
    `costForSelfDrive for ${daysFourWheeler} days: ${costForSelfDrive}`
  );

  return costForSelfDrive;
};

//function to determine how many seaters will bea available
totalPersons = document.getElementById("no-of-persons").value;
function calcSeaters() {
  let seater = 0;
  const noOfPack = document.getElementById("no-of-persons").value;
  console.log("totalPerson " + noOfPack);
  let remainingPersons = noOfPack;
  if (noOfPack > 40) {
    console.log(noOfPack % 40, Math.trunc(noOfPack / 40));
    remainingPersons = noOfPack % 40;
  }

  if (remainingPersons <= 4) {
    seater = 4;
  }
  if (remainingPersons > 4 && remainingPersons <= 7) {
    seater = 7;
  }
  if (remainingPersons > 7 && remainingPersons <= 13) {
    seater = 13;
  }
  if (remainingPersons > 13 && remainingPersons <= 17) {
    seater = 17;
  }
  if (remainingPersons > 17 && remainingPersons <= 20) {
    seater = 20;
  }
  if (remainingPersons > 20 && remainingPersons <= 26) {
    seater = 26;
  }
  if (remainingPersons > 26 && remainingPersons <= 30) {
    seater = 30;
  }
  if (remainingPersons > 30 && remainingPersons <= 40) {
    seater = 40;
  }
  return seater;
}

//calculate for divered vechicles
function calculateVechicleWithDrivers(arrRate, switches) {
  const newArrRate = arrRate.fill(-1, switches, 4);

  const seater = calcSeaters();
  // if(seater=true){
  //   const wholeFourties = Math.trunc(totalPersons/40);
  //   console.log(wholeFourties);
  // }

  console.log(`You will get ${seater} seater`);
  const rate = {
    4: [2500, 2500, 3000, 5000],
    7: [3200, 3200, 3700, 7300],
    13: [3700, 3700, 4500, 7300],
    17: [3800, 3800, 4700, 8300],
    20: [3800, 3800, 4500, 8300],
    26: [4700, 4700, 5000, 9700],
    30: [6000, 6000, 7000, 11000],
    40: [7000, 7000, 8000, 12000],
  };
  console.log(rate[seater]);
  const rateSeater = rate[seater];
  console.log(newArrRate);
  const newArrRatefiltered = newArrRate.filter((seat) => seat > -1);
  console.log(newArrRatefiltered);
  let sum = 0;
  let sumForfourties = 0; //to book more than 40 person
  let timesFourty = Math.trunc(totalPersons / 40); //how many fourties in total booking
  console.log(timesFourty);
  console.log(newArrRatefiltered.length);
  for (let i = 0; i <= newArrRatefiltered.length - 1; i++) {
    sum += rateSeater[newArrRatefiltered[i]];
    sumForfourties += rate["40"][newArrRatefiltered[i]];
  }

  console.log("sumForfourties " + sumForfourties);
  console.log("sumForfourties* " + sumForfourties * timesFourty);
  console.log("sum " + sum);

  return sum + sumForfourties * timesFourty;
}
//calling when add to pcakage is clicked

function calc() {
  const switches = Number(document.getElementById("HQ").value);
  console.log("switches " + switches);

  selectedLevel1 = Number(document.getElementById("goa-location1").value);

  selectedLevel2 = Number(document.getElementById("goa-location2").value);
  selectedLevel3 = Number(document.getElementById("goa-location3").value);

  const result = 6 - (selectedLevel1 + selectedLevel2 + selectedLevel3);
  const arrRate = [selectedLevel1, selectedLevel2, selectedLevel3, result];

  console.log(arrRate);
  calculateVechicleWithDrivers(arrRate, switches + 1);
}
function totalCostForSightSeeing() {
  let sumForSightSeeing = 0;

  if (document.getElementById("self-drive-cars").checked) {
    sumForSightSeeing = calculateSelfDriveCars();
  }

  if (document.getElementById("Vechicle--driver").checked) {
    const switches = Number(document.getElementById("HQ").value);
    console.log("switches " + switches);

    selectedLevel1 = Number(document.getElementById("goa-location1").value);

    selectedLevel2 = Number(document.getElementById("goa-location2").value);
    selectedLevel3 = Number(document.getElementById("goa-location3").value);

    const result = 6 - (selectedLevel1 + selectedLevel2 + selectedLevel3);
    const arrRate = [selectedLevel1, selectedLevel2, selectedLevel3, result];

    console.log(arrRate);
    sumForSightSeeing = calculateVechicleWithDrivers(arrRate, switches + 1);
  }
  if (document.getElementById("Two-Wheeler").checked) {
    // console.log(totalNights + "from main totalNights")
    sumForSightSeeing = calculateTwoWheelers();
  }

  console.log("sumForSightSeeing :" + sumForSightSeeing);
  return sumForSightSeeing;
}
//accordian menu for sight seeing
const sight = document.getElementsByClassName("sight");

for (let i = 0; i < sight.length; i++) {
  sight[i].addEventListener("click", function (e) {
    // this.classList.toggle("active");
    let content = this.nextElementSibling;

    if (e.target.className === "add-sight") {
      const scrolls = document.querySelector(".content");

      if (content.style.maxHeight) {
        console.log("hello");
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = 353 + "px";
      }
    }
  });
} //add service button
const addSighttbtn = document.querySelector(".add-sight");
addSighttbtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (addSighttbtn.textContent === "Remove service") {
    addSighttbtn.textContent = "Add service";
  } else {
    addSighttbtn.textContent = "Remove service";
  }
});
//single Event listener for whole pick-updrop using event delegation
const pickupDrop = document.querySelector(".pickup-drop-container");
const addPickupDropBtn = document.querySelector(".add-pickup-drop");
const pickupPoint = document.querySelector(".add-pickup");
const dropPoint = document.querySelector(".add-drop");
const pickupMessage = document.querySelector(".message-pick-up");
const dropMessage = document.querySelector(".message-drop");
const pickupText = document.querySelector(".pick-up-text");
pickupPoint.selectedIndex = dropPoint.selectedIndex = -1;
pickupDrop.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.className === "add-pickup-drop") {
    const scrolls = document.querySelector(".pick-drop-content");
    let content = this.lastElementChild;
    if (addPickupDropBtn.textContent === "Remove service") {
      addPickupDropBtn.textContent = "Add service";
      console.log("from if");
      //setting drop down menu value to zero as remove service is selected
      pickupPoint.value = dropPoint.value = "";
    } else {
      addPickupDropBtn.textContent = "Remove service";
    }

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      // console.log(content.scrollHeight);
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }
  pickupMessage.style.visibility = dropMessage.style.visibility = "hidden";

  console.log(pickupPoint.value);

  if (pickupPoint.selectedIndex != -1) {
    const seater = calcSeaters();
    pickupMessage.style.visibility = "visible";

    pickupMessage.textContent =
      pickupPoint.value !== "Not Needed"
        ? `A ${seater} seater will Pick you at ${pickupPoint.value}`
        : "Pick up service Removed";
  }
  if (dropPoint.selectedIndex != -1) {
    const seater = calcSeaters();
    dropMessage.style.visibility = "visible";

    dropMessage.textContent =
      dropPoint.value !== "Not Needed"
        ? `A ${seater} seater will Drop you at ${dropPoint.value}`
        : "Drop service Removed";
    const sumForPickAndDrop = calcPickupDropcost(
      seater,
      pickupPoint.value,
      dropPoint.value
    );
  }
});
let fetchedData;

function processFetchedData(data) {
  // Access and use the fetched data here
  console.log(data);

  const seater = 13;
  const findArray = data.find((rate) => rate.vehicle === `${seater} Seater`);
  console.log(findArray);
  // Perform any other operations with the data
}

const calcPickupDropcost = function (seater, pickup, drop) {
  const dataArray = [
    {
      vehicle: "4 Seater",
      "Not Needed": 0,
      Madgon: 1700,
      Vasco: 1700,
      Thivim: 1000,
      "Dabolim Airport": 1700,
      "Mopa Airport": 1500,
      Panjim: 1000,
      Mapusa: 900,
    },
    {
      vehicle: "7 Seater",
      "Not Needed": 0,
      Madgon: 2200,
      Vasco: 2200,
      Thivim: 1700,
      "Dabolim Airport": 2200,
      "Mopa Airport": 2500,
      Panjim: 1500,
      Mapusa: 1400,
    },
    {
      vehicle: "13 Seater",
      "Not Needed": 0,
      Madgon: 3200,
      Vasco: 3200,
      Thivim: 2200,
      "Dabolim Airport": 3200,
      "Mopa Airport": 3500,
      Panjim: 2000,
      Mapusa: 1800,
    },
    {
      vehicle: "17 Seater",
      "Not Needed": 0,
      Madgon: 4200,
      Vasco: 4200,
      Thivim: 2600,
      "Dabolim Airport": 3800,
      "Mopa Airport": 4500,
      Panjim: 2600,
      Mapusa: 2400,
    },
    {
      vehicle: "20 Seater",
      "Not Needed": 0,
      Madgon: 4500,
      Vasco: 4500,
      Thivim: 3700,
      "Dabolim Airport": 4500,
      "Mopa Airport": 5200,
      Panjim: 3700,
      Mapusa: 3500,
    },
    {
      vehicle: "26 Seater",
      "Not Needed": 0,
      Madgon: 5500,
      Vasco: 5500,
      Thivim: 4000,
      "Dabolim Airport": 5500,
      "Mopa Airport": 5500,
      Panjim: 4000,
      Mapusa: 3700,
    },
    {
      vehicle: "30 Seater",
      "Not Needed": 0,
      Madgon: 7000,
      Vasco: 7000,
      Thivim: 4500,
      "Dabolim Airport": 7500,
      "Mopa Airport": 7500,
      Panjim: 4500,
      Mapusa: 4000,
    },
    {
      vehicle: "40 Seater",
      "Not Needed": 0,
      Madgon: 8000,
      Vasco: 8000,
      Thivim: 5000,
      "Dabolim Airport": 8500,
      "Mopa Airport": 8500,
      Panjim: 5000,
      Mapusa: 4500,
    },
  ];

  // console.log(seater);
  const findArray = dataArray.find(
    (rate) => rate.vehicle === `${seater} Seater`
  );

  if (addPickupDropBtn.textContent == "Remove service") {
    const sum = findArray[pickup] + findArray[drop];

    return sum;
  } else {
    return 0;
  }
};

//for addevent listner  to add serveice button
const addonService = document.querySelector(".addon-container");
addonService.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.className === "add-add-on") {
    console.log(e.target.textContent);
    let content = this.lastElementChild;
    console.log(this);
    //  if(e.target.textContent==='Remove service'){
    //    e.target.textContent='Add service';
    //    console.log('ues')
    //  }
    //  else{
    //    e.target.textContent='Remove service'
    //  }
    e.target.textContent =
      e.target.textContent === "Remove service"
        ? "Add service"
        : "Remove service";
    if (e.target.textContent === "Add service") {
      document.getElementById("add-on-options").selectedIndex = -1;
    }
    //  if(this.lastElementChild.style.maxHeight){
    //   this.lastElementChild.style.maxHeight=null;
    //  }else{
    //   this.lastElementChild.style.maxHeight=this.lastElementChild.scrollHeight+'px';
    //  }
    content.style.maxHeight = content.style.maxHeight
      ? null
      : content.scrollHeight + "px";
  }
});

// Select the dropdown element that gets populated dynamically
const dynamicDropdown = document.getElementById("hotel-id");

// Callback function for the MutationObserver
const handleDropdownChange = (mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      // Handle the event when the dropdown gets filled
      console.log("Dropdown got filled with options.");
      break;
      // You can trigger any necessary actions here
      // For example, you might want to fetch data based on the selected option or perform other operations.
    }
  }
};

// Create a new MutationObserver instance with the callback function
const observer = new MutationObserver(handleDropdownChange);

// Configure the observer to watch for changes to the children of the dropdown
const observerConfig = { childList: true };

// Start observing the dropdown for changes
observer.observe(dynamicDropdown, observerConfig);

const transformedData = {};
let SPREADSHEET_ID = "1KP1-2HrfPObwMr4_IIEuuS0Vpk_KObKfog7qArUbhxk";
let SHEET_NAME = "Sheet1";
let YOUR_API_KEY = "AIzaSyAiexK0EyyHNWViGEp29zbkCwTnklGYvVc";

// document.querySelector('.table-date').addEventListener('click',isBlockedDates)
// let isblockdate=false;
// function isBlockedDates(e) {
//   console.log(e);
//   //seperate the block dates and normal dates
//   const dateIn = document.querySelector(".table-date");

//   const clickedElement = e.target;
//   const clickedDate = clickedElement.getAttribute("data-date");

//   for (const date of blockedDates) {
//     if (clickedDate === date) {
//       isblockdate = true;
//       SHEET_NAME = "Sheet2";
//       fetchAddonData(SHEET_NAME);
//       return SHEET_NAME;
//     }
//   }

//   // If the loop finishes without finding a match, set default SHEET_NAME
//   SHEET_NAME = "Sheet1";
//   isblockdate = false;
//   fetchAddonData(SHEET_NAME);

//   return SHEET_NAME;
// }
let option = document.getElementById("add-on-options");
function fetchAddonData(SHEET_NAME) {
  fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A1:B12?key=${YOUR_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      // Process the data
      console.log(data.values);
      const values = data.values;

      for (let i = 1; i < values.length; i++) {
        const key = values[i][0];
        const value = values[i][1];
        transformedData[key] = value;
      }
      costForAddon = transformedData;
      // funcCostForAddon(costForAddon);

      console.log(transformedData);
      const keys = Object.keys(transformedData);

      console.log(keys); //it has the options to be populated
      while (option.firstChild) {
        option.removeChild(option.firstChild);
      }

      keys.forEach(
        /*[Grand Island Scuba,
        Malwan Scuba,
        Dudhsagar Water falls,
        Baga Water Sports,
        Bungee Jumping (Normal),
        Bungee Jumping (Jumping Heights),
        Dinner Cruise,
        Evening Cruise,
        Dolphin Boat Ride,
        Fly Boarding,
        Casino]*/ (options) => {
          const optionElement = document.createElement("option");
          optionElement.value = options;
          optionElement.text = options;
          optionElement.title = "press Ctrl to Select more than one option";
          option.appendChild(optionElement);
        }
      );
      option.selectedIndex = -1;

      document
        .querySelector(".Submit")
        .addEventListener("click", clickedEvent2);
    })
    .catch((error) => {
      // Handle error
      console.error(error);
    });
}

// iam trying to listen to submit button click event to transfer the data of previous sums to here
function clickedEvent2() {
  let tempArray = [];
  console.log(
    "                                                                              "
  );
  console.log("_____________________I am 2nd Event Listner___________");
  console.log(transformedData);
  let selectedAddon = document.getElementById("add-on-options").selectedOptions;
  // Convert the selectedOptions collection to an array of values
  selectedAddon = Array.from(selectedAddon).map((options) => options.value);
  console.log(selectedAddon);
  selectedAddon.forEach((eachAddon) => {
    costForAddon = transformedData[eachAddon];
    tempArray.push(parseFloat(costForAddon.replace(/,/g, "")));
    if (numberValue === undefined) {
      numberValue = 0;
    }

    // if (costForAddon !== 0) {
    //   ;
    // }
  });
  numberValue = tempArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  console.log("costForAddon :" + numberValue + " " + typeof numberValue);

  console.log(" costForAddon blockDates Included :" + numberValue);
  console.log(`for ${totalPersons} persons ${numberValue * totalPersons}`);

  console.log(totalCosts + " sight seeing + pickup and drop");
  totalCosts = totalPersons * (totalCosts + numberValue);

  console.log("room hotel rate " + totalCostForHotelRooms);

  console.log(
    "----------------------------End of Event Listner 2--------------------------------------------"
  );
}
function fetchHotelRate(SHEET_NAME, sheetPos) {
  console.log("readfing for the " + SHEET_NAME);
  SPREADSHEET_ID = "1KP1-2HrfPObwMr4_IIEuuS0Vpk_KObKfog7qArUbhxk";
  YOUR_API_KEY = "AIzaSyAiexK0EyyHNWViGEp29zbkCwTnklGYvVc";
  let optionMenu = document.getElementById("hotel-id");
  fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!${sheetPos}?key=${YOUR_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      // Process the data
      console.log(data.values);
      const hotels = data.values;

      let roomStatus = []; //to get the room requirement of the user if no room selected it is 0 else 1;
      const truePos = []; //this array is used to get the postition of true element in room status array
      let listofHotels = []; //this will be finally displayed
      let fileter;
      document
        .getElementById("food-id")
        .addEventListener("change", function () {
          console.log(
            "-------------------------------------------------------------------------------------"
          );
          roomStatus = []; //resetting the value for every click
          listofHotels = [];

          //now changing the rooms selection in to true or false array
          //if room is selected it is true other wise it is false
          roomStatus.push(
            document.getElementById("twoshare").selectedIndex > 0,
            document.getElementById("threeshare").selectedIndex > 0,
            document.getElementById("fourshare").selectedIndex > 0
          );
          console.log("roomStatus :" + roomStatus); //room status array is now ready

          //this room filter stores the postition of the true in room status array
          const roomsFilter = roomStatus.forEach((element, index) => {
            if (element === true) {
              truePos.push(index);
            }
          });
          console.log("truePos :" + truePos);

          //iterating each and every r  ow of the data(13 elements in each array)
          hotels.forEach((arr) => {
            let choosedRoomAvailability = [];

            fileter = filteredHotels(arr, this.selectedIndex);
            //using this if condition trying to display hotel names only when filtere array has atleast one element
            if (fileter.length != 0) {
              // console.log((index+1)+" "+hotelName)
              console.log(fileter); //output['2 sharing - 2000', '3 sharing - 2500', '4 sharing - 3000']
              //now iterating over the not null values in each array
              roomStatus.forEach((element, index) => {
                //roomStatus array contains[true false true] :example
                choosedRoomAvailability.push(fileter[index] !== undefined);
                //trying to populate the choosedRoomAvailablity array only for defined values
              });

              console.log("roomsNeeded :" + roomStatus);

              console.log(
                "choosedRoomAvailability :" + choosedRoomAvailability
              );
              let allSatisfied = false;
              for (let i = 0; i < truePos.length; i++) {
                if (choosedRoomAvailability[truePos[i]] === true) {
                  allSatisfied = true;
                } else {
                  allSatisfied = false;
                }
              }
              if (allSatisfied) {
                console.log("hotelName :" + hotelName);

                listofHotels.push(hotelName);
              }
            }
            // if (fileter.length === 0) {
            //   listofHotels.push("Option Unavailable");
            //   console.log("option unavailable");
            // }
          });
          console.log(fileter);
          calculateCostforHotels(fileter, optionMenu, hotels, SHEET_NAME);

          console.log(listofHotels);
          // Clear existing options
          while (optionMenu.firstChild) {
            optionMenu.removeChild(optionMenu.firstChild);
          }

          listofHotels.forEach((options) => {
            const optionElement = document.createElement("option");
            optionElement.value = options;
            optionElement.text = options;
            optionMenu.appendChild(optionElement);
          });
        });
    })
    .catch((error) => {
      // Handle error
      console.error(error);
    });
}

function hotelType(sheetPos) {
  console.log(isblockdate + "isblockdate");

  if (blockedCount != 0) {
    console.log("blocked date is true");
    SHEET_NAME = "Sheet2";
    fetchHotelRate(SHEET_NAME, sheetPos);
    fetchAddonData(SHEET_NAME);
  }
  if (normaldays != 0) {
    console.log("normal date is true");
    SHEET_NAME = "Sheet1";
    fetchHotelRate(SHEET_NAME, sheetPos);
    fetchAddonData(SHEET_NAME);
  }
  console.log("i am using " + SHEET_NAME);
}
// this function helps to switch the hotel accorrding to the hotel Type

const selectHotelType = document.getElementById("hotel-type-id");
selectHotelType.selectedIndex = -1;
selectHotelType.addEventListener("change", function (event) {
  document.getElementById("twoshare").value =
    document.getElementById("threeshare").value =
    document.getElementById("fourshare").value =
      0;
  console.log(this.selectedIndex);
  switch (this.selectedIndex) {
    case 0:
      // Call function with argument for option 0
      hotelType("A16:M29");
      break;
    case 1:
      // Call function with argument for option 1
      hotelType("A33:M41"); //couple
      break;
    case 2:
      // Call function with argument for option 2
      hotelType("A45:M48"); //family
      break;
    case 3:
      // Call function with argument for option 3
      hotelType("A52:M59"); //3star
      break;

    case 5:
      specialRoomCategories("A62:U63");
      break;
    // Add more cases for additional options
    default:
      console.log("no matching");
      break;
  }
});
function specialRoomCategories(sheetPos) {
  SPREADSHEET_ID = "1KP1-2HrfPObwMr4_IIEuuS0Vpk_KObKfog7qArUbhxk";
  SHEET_NAME = "Sheet1";
  YOUR_API_KEY = "AIzaSyAiexK0EyyHNWViGEp29zbkCwTnklGYvVc";

  function fetchSpecialRoomategories() {
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!${sheetPos}?key=${YOUR_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Process the data
        console.log(data.values);
        hotels = data.values;
        let roomStatus = []; //to get the room requirement of the user if no room selected it is 0 else 1;
        const truePos = []; //this array is used to get the postition of true element in room status array
        let listofHotels = []; //this will be finally displayed

        document
          .getElementById("food-id")
          .addEventListener("change", function () {
            console.log(
              "-------------------------------------------------------------------------------------"
            );
            roomStatus = []; //resetting the value for every click
            listofHotels = [];

            //now changing the rooms selection in to true or false array
            //if room is selected it is true other wise it is false
            roomStatus.push(
              document.getElementById("twoshare").selectedIndex > 0,
              document.getElementById("threeshare").selectedIndex > 0,
              document.getElementById("fourshare").selectedIndex > 0,
              document.getElementById("fiveshare").selectedIndex > 0
            );
            console.log("roomStatus :" + roomStatus); //room status array is now ready

            //this room filter stores the postition of the true in room status array
            const roomsFilter = roomStatus.forEach((element, index) => {
              if (element === true) {
                truePos.push(index);
              }
            });
            console.log("truePos :" + truePos);

            //iterating each and every r  ow of the data(13 elements in each array)
            hotels.forEach((arr) => {
              let choosedRoomAvailability = [];

              fileter = filteredHotels(arr, this.selectedIndex);
              //using this if condition trying to display hotel names only when filtere array has atleast one element
              if (fileter.length != 0) {
                // console.log((index+1)+" "+hotelName)
                console.log(fileter); //output['2 sharing - 2000', '3 sharing - 2500', '4 sharing - 3000']
                //now iterating over the not null values in each array
                roomStatus.forEach((element, index) => {
                  //roomStatus array contains[true false true] :example
                  choosedRoomAvailability.push(fileter[index] !== undefined);
                  //trying to populate the choosedRoomAvailablity array only for defined values
                });

                console.log("roomsNeeded :" + roomStatus);

                console.log(
                  "choosedRoomAvailability :" + choosedRoomAvailability
                );
                let allSatisfied = false;
                for (let i = 0; i < truePos.length; i++) {
                  if (choosedRoomAvailability[truePos[i]] === true) {
                    allSatisfied = true;
                  } else {
                    allSatisfied = false;
                  }
                }
                if (allSatisfied) {
                  console.log("hotelName :" + hotelName);

                  listofHotels.push(hotelName);
                }
              }
              if (fileter.length === 0) {
                listofHotels.push("Option Unavailable");
                console.log("option unavailable");
              }
            });
            calculateCostforHotels(fileter, optionMenu, hotels);

            console.log(listofHotels);
            // Clear existing options
            while (optionMenu.firstChild) {
              optionMenu.removeChild(optionMenu.firstChild);
            }

            listofHotels.forEach((options) => {
              const optionElement = document.createElement("option");
              optionElement.value = options;
              optionElement.text = options;
              optionMenu.appendChild(optionElement);
            });
          });
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }
}
//hiding the room sharing optins 2,3,4 when specialised rooms has been clicked
document.querySelector(".hotel").addEventListener("click", function (e) {
  const targetSpan = document.querySelector(".fourshare-insert");
  const newSpan = document.createElement("span");
  console.log(selectHotelType.selectedIndex);

  while (targetSpan.nextElementSibling) {
    console.dir(targetSpan.nextElementSibling);
    targetSpan.nextElementSibling.remove();
  }
  if (selectHotelType.selectedIndex === 5) {
    targetSpan.insertAdjacentElement("afterend", newSpan);
    newSpan.innerHTML = `
    <label class="text" for="fiveshare">5 Sharing</label>

    <select name="fiveshare" id="fiveshare">
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
    </select>`;
  } else {
    console.log(targetSpan.nextElementSibling);
    // targetSpan.removeChild(targetSpan.nextElementSibling)
  }
});

function calculateCostforHotels(filter, optionMenu, hotelName, SHEET_NAME) {
  console.log("reading for calcautecostforhetle " + SHEET_NAME);

  document.querySelector(".Submit").addEventListener("click", function (e) {
    if (blockedCount === 0 || normaldays === 0) {
      trackroomAndFoodCost = [];
    }
    console.log("sheet name from calcualte hotes cost" + SHEET_NAME);
    let roomAndFoodCost = 0;

    console.log("originalTotalNights " + originalTotalNights);

    console.log("                                    ");
    console.log(
      "----------------------3rd event listnre for submit----------------------"
    );

    // console.log(hotelName)
    const findHotel = hotelName.find((element) => {
      // console.log(element[0]===optionMenu.value,element[0]);
      return element[0] === optionMenu.value;
    });

    console.log(findHotel);
    const fileter = filteredHotels(
      findHotel,
      document.getElementById("food-id").selectedIndex
    );
    const seperateArray = fileter
      .map((element) => [element])
      .map((el) => el[0].slice(-4));
    console.log("_______________________________");
    console.log(seperateArray); //seprating the array for calcualtion so that you can easily multipy with no of rooms;

    console.log("_______________________________");
    const noOfRooms = [
      roomsTwoShareSelected.value,
      roomsThreeShareSelected.value,
      roomsFourShareSelected.value,
    ];
    const noofRoomsSliced = noOfRooms.slice(0, seperateArray.length);
    console.log(roomsTwoShareSelected.value, roomsThreeShareSelected.value);
    console.log(noofRoomsSliced, noofRoomsSliced.length);

    noofRoomsSliced.forEach((element, index) => {
      if (element !== undefined) {
        const roomsSelected = Number(element);
        const roomRate = Number(seperateArray[index]);

        console.log(roomsSelected);
        console.log(roomRate);
        roomAndFoodCost += roomsSelected * roomRate;
        console.log(roomAndFoodCost + " totalCostForHotelRooms for 1 night");
      }
    });

    console.log(roomAndFoodCost + " totalCostForHotelRooms for 1 night");
    console.log(`for${totalNights} nights ${roomAndFoodCost * totalNights}`);

    if (SHEET_NAME === "Sheet1") {
      if (totalNights !== originalTotalNights) {
        totalNights = originalTotalNights;
      } //to prevent changing of the total night values
      console.log(
        totalNights +
          " total nights reduced to " +
          normaldays +
          " normal days as it is sheet 1"
      );
      totalNights = normaldays;
    } else {
      if (totalNights !== originalTotalNights) {
        totalNights = originalTotalNights;
      }
      console.log(
        totalNights +
          " total nights reduced to " +
          blockedCount +
          " blocked day as it is sheet 2"
      );

      totalNights = blockedCount;
    }
    trackroomAndFoodCost.push(roomAndFoodCost * totalNights);
    console.log("trackroomAndFoodCost " + trackroomAndFoodCost);
    //since the event listner prints only the last event we need to track the previous elemnt as well so we store it in array and use it later
    // Using the Array.reduce() method to calculate the sum
    roomAndFoodCost = trackroomAndFoodCost
      .slice(0, 2)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    console.log("The sum is: " + roomAndFoodCost);

    console.log("sightSeeingCost " + sightSeeingCost);
    console.log("costForPickandDrop " + costForPickandDrop);
    console.log(" costForAddon :" + totalPersons * numberValue);
    const southIndianFood = calcSif();
    console.log("south indian food " + southIndianFood);

    totalCosts = totalNights * (totalCosts + roomAndFoodCost);
    // const

    // console.log("formValidationStatus :"+formValidationStatus);
    console.log(document.getElementById("hotel-type-id").selectedIndex);
    const servicePerHead = document.getElementById("service-id").value;

    if (document.getElementById("hotel-type-id").selectedIndex !== 5) {
      allCost =
        roomAndFoodCost +
        sightSeeingCost +
        costForPickandDrop +
        totalPersons * numberValue;
      perHeadCost = allCost / totalPersons;
      includingServiceChargePerHead = perHeadCost + Number(servicePerHead);
      if (document.getElementById("food-id").selectedIndex === 0) {
        allCost =
          roomAndFoodCost * totalNights +
          sightSeeingCost +
          costForPickandDrop +
          southIndianFood +
          totalPersons * numberValue;
      }
      displayResult(allCost, includingServiceChargePerHead);
    } else {
      let formattedContent = "";
      let finalCost =
        roomAndFoodCost * totalNights +
        sightSeeingCost +
        costForPickandDrop +
        totalPersons * numberValue;
      for (const line of specialisedRooms) {
        const rateAlone = line.slice(-4);
        const exceptRate = line.slice(0, -4);
        console.log(Number(rateAlone), exceptRate);
        formattedContent += `Package ${exceptRate} ${
          Number(rateAlone) + finalCost
        } \n`;
        console.log(formattedContent);
        const resultSpecial = document.getElementById("result");

        resultSpecial.innerHTML = `<pre style="text-align: left">${formattedContent} </pre>`;
      }
    }

    console.log(
      "-------------------End of 3rd event listner------------------"
    );
  });
}
function displayUserMessage() {}
//this function filters the hotel alone
function filteredHotels(arr, ind) {
  console.log("i am inside filtered hotel");
  console.log(arr);

  let noFoodEnd = 6;
  let breakFastEnd = 11;
  let lunchEnd = 16;
  let dinnerEnd = 21;

  if (selectHotelType.selectedIndex !== 5) {
    noFoodEnd = 4;
    breakFastEnd = 7;
    lunchEnd = 10;
    dinnerEnd = 13;
  }

  hotelName = arr[0];
  const noFood = arr.slice(1, noFoodEnd);
  const breakFast = arr.slice(noFoodEnd, breakFastEnd);
  const lunch = arr.slice(breakFastEnd, lunchEnd);
  const dinner = arr.slice(lunchEnd, dinnerEnd);

  const bachelourHotels = [hotelName, noFood, breakFast, lunch, dinner];
  const onlyFood = [noFood, breakFast, lunch, dinner];
  console.log(onlyFood);

  //in filteter array we store only non null values and removing all the null values
  const fileter = onlyFood[ind].filter((element, index) => element !== "NULL");
  console.log("+++++++++++++++++++++++++++++++++++");
  console.log(fileter, fileter.length, typeof fileter);
  if (fileter.length > 0) {
    specialisedRooms = fileter[0].split("|");
    console.log(specialisedRooms);
  }
  console.log("+++++++++++++++++++++++++++++++++++");
  return fileter;
}

//function to validate form
document.querySelector(".fill").addEventListener("click", function () {
  document.getElementById("no-of-persons").value = 100;
  document.getElementById("check-in").value = "2023-07-16";
  document.getElementById("check-out").value = "2023-07-19";
  // document.getElementById('hotel-type-id').selectedIndex=1;
  // document.getElementById('twoshare').selectedIndex=1;
  // document.getElementById('food-id').selectedIndex=1;
});
//south indian food
document.getElementById("food-id").addEventListener("change", function () {
  console.log("reading");
  let content = document.querySelector(".south-indian-food");
  if (this.selectedIndex === 0) {
    console.log(content);
    content.style.maxHeight = content.style.maxHeight
      ? null
      : content.scrollHeight + "px";
  } else {
    console.log(content);
    content.style.maxHeight = null;
  }
});
//function to get south indian food input
function calcSif() {
  const sifElements = document.querySelectorAll(".it");

  costForSif = 0;

  sifElements.forEach((element) => {
    if (element === undefined) {
      element = 0;
    }
    valuesArray.push(Number(element.value));
  });

  console.log(valuesArray);
  const rateForSif = [120, 150, 150];
  for (let i = 0; i < rateForSif.length; i++) {
    costForSif += rateForSif[i] * valuesArray[i] * totalPersons;
  }
  console.log(totalPersons);
  return costForSif;
}
// setInterval(calcSif, 2000);

//generate calender
// Array of blocked dates (in yyyy-mm-dd format)

let year;
let month;
let table;
let months = []; //to store the months
//generating today
const today = new Date();
console.log("today " + today);

function generateCalender(inputYear, inputMonth, calenderType) {
  year = inputYear;
  month = inputMonth;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (calenderType === "in") {
    table = document.querySelector(".table-date");
    table.innerHTML = "";
    const tableBody = document.getElementById("date-text");
    tableBody.textContent = `${months[month]} ${year}`;
    textBlur.textContent = `${months[month]} ${year}`;
  }
  if (calenderType === "out") {
    table = document.querySelector(".table-date-out");
    table.innerHTML = "";
    const tableBodyOut = document.getElementById("date-text-out");
    tableBodyOut.textContent = `${months[month]} ${year}`;
    textBlurOut.textContent = `${months[month]} ${year}`;
  }

  const headerRow = table.insertRow();

  weekDays.forEach((day) => {
    const cell = headerRow.insertCell();
    cell.textContent = day;
  });
  // const btns = document.querySelectorAll('.btn');
  // btns.forEach(btn => btn.style.display = 'block')
  // document.getElementById('pre-month').innerHTML = '&lt;'
  // document.getElementById('next-month').innerHTML = '&gt;'

  let date = 1;

  for (let i = 0; i < 6; i++) {
    const row = table.insertRow();
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        const cell = row.insertCell();
        cell.textContent = "";
      } else if (date > daysInMonth) {
        const cell = row.insertCell();
        cell.textContent = "";
      } else {
        const cell = row.insertCell();
        cell.textContent = date;
        cell.dataset.date = new Date(year, month, date)
          .toISOString()
          .slice(0, 10);
        const todayDate = today.toISOString().slice(0, 10);

        if (cell.dataset.date === todayDate) {
          console.log(todayDate);
          cell.classList.add("today");
        }
        if (cell.dataset.date < todayDate) {
          cell.classList.add("past-date");
        }
        blockedDates.forEach((datum) => {
          // console.log("datum " + datum,cell.dataset.date)
          if (cell.dataset.date === datum) {
            cell.classList.add("block-dates");
          }
        });

        date++;
      }
    }
  }
}

const textBlur = document.getElementById("blur-text");
const textBlurOut = document.querySelector(".blur-month-out");
generateCalender(today.getFullYear(), today.getMonth(), "in");
generateCalender(today.getFullYear(), today.getMonth(), "out");

document.getElementById("next-month").addEventListener("click", nextMonth);
document.getElementById("next-month-out").addEventListener("click", nextMonth);

function nextMonth(e) {
  let calenderType = "";
  console.log(e.target.className);
  if (e.target.className === "btn nav-arrow-in") {
    table = document.querySelector(".table-date");
    table.innerHTML = "";

    calenderType = "in";
    console.log(calenderType);
    month = new Date(`${this.previousElementSibling.textContent} 1`).getMonth();
  }
  if (e.target.className === "btn nav-arrow-out") {
    table = document.querySelector(".table-date-out");
    table.innerHTML = "";
    calenderType = "out";
    console.log(calenderType);
    month = new Date(`${this.previousElementSibling.textContent} 1`).getMonth();
    console.log(
      new Date(`${this.previousElementSibling.textContent} 1`).getDate()
    );
  }

  console.log("before Clicking: " + month);
  e.preventDefault();

  if (month === 11) {
    console.log(`this is the ${month} month`);
    month = -1;
    year++;
  }
  month = month + 1;

  console.log("after Clicking: " + month);

  generateCalender(year, month, calenderType);
}

document.getElementById("pre-month").addEventListener("click", preMonth);
document.getElementById("pre-month-out").addEventListener("click", preMonth);

function preMonth(e) {
  e.preventDefault();
  let calenderType = "";
  console.log(e.target.className === "btn nav-arrow-in");
  if (e.target.className === "btn nav-arrow-in") {
    table = document.querySelector(".table-date");
    table.innerHTML = "";

    calenderType = "in";
    console.log(calenderType);
    month = new Date(`${this.nextElementSibling.textContent} 1`).getMonth();
  }
  if (e.target.className === "btn nav-arrow-out") {
    table = document.querySelector(".table-date-out");
    table.innerHTML = "";

    calenderType = "out";
    console.log(calenderType);
    month = new Date(`${this.nextElementSibling.textContent} 1`).getMonth();
  }
  console.log(month);

  if (month === 0) {
    console.log(`this is the ${month} month`);
    month = 12;
    year--;
  }
  month = month - 1;

  generateCalender(year, month, calenderType);
}
//designing the nav button on the overlay
const navButtonLeft = document.querySelector(".test");
const navButtonright = document.querySelector(".test-right");

navButtonLeft.addEventListener("click", blurNavBtnPre);

document.querySelector(".test-out").addEventListener("click", blurNavBtnPre);

function blurNavBtnPre(e) {
  e.preventDefault();
  let calenderType = "";
  console.log(e.target.className);
  if (e.target.className === "test show") {
    table = document.querySelector(".table-date");
    table.innerHTML = "";

    calenderType = "in";
    console.log(calenderType);
    month = new Date(
      `${document.getElementById("pre-month").nextElementSibling.textContent} 1`
    ).getMonth();
  }
  if (e.target.className === "test test-out show") {
    console.log("reading");
    table = document.querySelector(".table-date");
    table.innerHTML = "";

    calenderType = "out";
    console.log(calenderType);
    month = new Date(
      `${
        document.getElementById("pre-month-out").nextElementSibling.textContent
      } 1`
    ).getMonth();
    console.log(month);
  }
  if (month === 0) {
    console.log(`this is the ${month} month`);
    month = 12;
    year--;
  }
  month = month - 1;

  generateCalender(year, month, calenderType);
}

navButtonright.addEventListener("click", blurNavBtnPost);
document
  .querySelector(".test-right-out")
  .addEventListener("click", blurNavBtnPost);

function blurNavBtnPost(e) {
  e.preventDefault();
  let calenderType = "";
  console.log(e.target.className);

  if (e.target.className === "test-right show") {
    table = document.querySelector(".table-date");
    table.innerHTML = "";

    calenderType = "in";
    console.log(calenderType);
    month = new Date(
      `${
        document.getElementById("next-month").previousElementSibling.textContent
      } 1`
    ).getMonth();
  }
  if (e.target.className === "test-right test-right-out show") {
    table = document.querySelector(".table-date-out");
    table.innerHTML = "";

    calenderType = "out";
    console.log(calenderType);
    month = new Date(
      `${
        document.getElementById("next-month-out").previousElementSibling
          .textContent
      } 1`
    ).getMonth();
  }
  if (month === 11) {
    console.log(`this is the ${month} month`);
    month = -1;
    year++;
  }
  month = month + 1;

  console.log("after Clicking: " + month);

  generateCalender(year, month, calenderType);
}

const showCalender = document.getElementById("date-text");
const showCalenderOut = document.getElementById("date-text-out");
const overlay = document.querySelector(".overlay");

showCalender.addEventListener("click", showcalender);
showCalenderOut.addEventListener("click", showcalender);

function showcalender(e) {
  e.preventDefault();
  console.log(e.target.className);

  if (e.target.className === "btn month-in") {
    document.querySelector(".table-date").classList.toggle("show");

    overlay.style.display = "block";
    navButtonLeft.classList.toggle("show");
    navButtonright.classList.toggle("show");
    document.querySelector(".blur-month").classList.toggle("show");
    document.querySelector(".tebut").classList.add("show");
  } else {
    document.querySelector(".table-date-out").classList.toggle("show");
    document.querySelector(".tebut-out").classList.add("show");
    document.querySelector(".test-out").classList.add("show");
    document.querySelector(".test-right-out").classList.add("show");
    document.querySelector(".blur-month-out").classList.add("show");
    overlay.style.display = "block";
  }
}

document.querySelector(".table-date").addEventListener("click", hideCalender);
document
  .querySelector(".table-date-out")
  .addEventListener("click", hideCalender);
function hideCalender(e) {
  if (e.target.closest(".table-date")) {
    document.querySelector(".table-date").classList.remove("show");
    navButtonLeft.classList.remove("show");
    navButtonright.classList.remove("show");
    document.querySelector(".blur-month").classList.remove("show");
    overlay.style.display = "none";
    console.log(e.target.textContent);
    const day = e.target.textContent;
    const tableBody = document.getElementById("date-text");
    tableBody.textContent = `${day} ${months[month]} ${year}`;
  }
  if (e.target.closest(".table-date-out")) {
    document.querySelector(".table-date-out").classList.remove("show");
    overlay.style.display = "none";
    console.log(e.target);
    const day = e.target.textContent;
    document.querySelector(".tebut-out").classList.remove("show");
    document.querySelector(".test-out").classList.remove("show");
    document.querySelector(".test-right-out").classList.remove("show");
    document.querySelector(".blur-month-out").classList.remove("show");
    const tableBody = document.getElementById("date-text-out");
    tableBody.textContent = `${day} ${months[month]} ${year}`;
  }
}

let calenderDates = []; //this is for calculating total Nights
let compareDates = []; //this for genrating allt he between dates in correct format
let blockeddateCounter = 0;
document.querySelector(".date-in-out").addEventListener("click", sepdates);
function sepdates(e) {
  //seperate the block dates and normal dates
  let dateIn = document.querySelector(".table-date");
  let dateOut = document.querySelector(".table-date-out");

  const clickedElement = e.target;

  const clickedDate = clickedElement.getAttribute("data-date");

  if (e.target.closest(".table-date")) {
    dateIn = clickedDate;
    console.log("dateIn " + dateIn);
    const inDate = new Date(dateIn);
    console.log("inDate " + inDate);

    calenderDates.push(inDate);
    compareDates.push(dateIn);
  } else if (e.target.closest(".table-date-out")) {
    dateOut = clickedDate;
    console.log(dateOut);
    const OutDate = new Date(dateOut);

    calenderDates.push(OutDate);
    compareDates.push(dateOut);
  }
  console.log("calenderDates " + calenderDates);
  if (calenderDates.length > 1) {
    const calenderIn = calenderDates[0];
    const calenderOut = calenderDates[1];

    let timeDiff = calenderOut.getTime() - calenderIn.getTime();
    totalNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    console.log("Nights: " + totalNights);
    originalTotalNights = totalNights;

    function formatDate(checkInDate, checkOutDate) {
      const datesArray = [];
      const currentDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);

      while (currentDate < endDate) {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate() + 1).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate);

        datesArray.push(formattedDate);

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return datesArray;
    }

    const betweenDates = formatDate(compareDates[0], compareDates[1]);
    console.log(betweenDates);
    function countBlockedDates(datesBetweenCheckInOut, blockedDates) {
      const blockedCount = betweenDates.filter((date) =>
        blockedDates.includes(date)
      ).length;
      return blockedCount;
    }
    blockedCount = countBlockedDates(betweenDates, blockedDates);

    console.log("total block dates " + blockedCount);
    normaldays = totalNights - blockedCount;
    console.log("normal dates " + normaldays);
  }

  for (const date of blockedDates) {
    if (clickedDate === date) {
      isblockdate = true;
      SHEET_NAME = "Sheet2";
      fetchAddonData(SHEET_NAME);
      return SHEET_NAME;
    }
  }

  // If the loop finishes without finding a match, set default SHEET_NAME
  SHEET_NAME = "Sheet1";
  isblockdate = false;
  fetchAddonData(SHEET_NAME);

  return SHEET_NAME;
}

// Output: 3
// observering the customized hotel for getting it filled

// Define the generatePDF function in the global scope
function generatePDFs(e) {
  e.preventDefault();
  const yourName = window.prompt("Enter Customer name:");
  const bookingLocation = window.prompt("Enter Customer Location");
  const assName = window.prompt("Enter Travel Assistant Name");
  const translang = window.prompt("Enter translator Language");

  console.log(allCost, totalPersons, includingServiceChargePerHead);

  let pickupAndDrop = `pickup drop service `;

  let nights = `${totalNights} Nights Accommodation in AC Rooms with Swimming Pool Resorts in North Goa, near Calangute Beach`;
  let foodTimes = `All Days On Restaurant - Map  Times Times`;

  let siteSeeing = "Sight Seeing Service North Goa and South Goa";
  let translator = `Local ${translang} Speaking Coordinator assistance 24/7 over the course of your stay. `;
  let medical =
    "Basic Medical Support with Free Taxi service for near by Hospital is also Included in this Package.";
  let ticket = `Two way Train Tickets from your Hometown to Goa, Round Trip Flight `;
  let GST = `Gst 5%`;
  let bevarage = "Alcoholic beverages";
  let disclaimer =
    "Any activities not specifically mentioned in the inclusions";

  const selectedFoodIndex = document.getElementById("food-id").selectedIndex;
  let inclusionList = [];
  let exclusionList = [];
  let statusArray = [];
  
  //for pick up and drop status
  if(pickupPoint.value!==''||dropPoint.value!==""){

    console.log('changing the pickup and drop value')

    pickupAndDrop = `Pickup service from ${pickupPoint.value} , Drop service to ${dropPoint.value}`;
    pickUpDropStatus=true;
  }
  
  //food status

  let selectedFoodType = textContentOfSelectedIndex("food-id");
  let countOfFood = totalNights * Number(selectedFoodIndex);
  console.log(valuesArray);
  //to get the sum of all the south india n food input
  console.log(selectedFoodIndex === "0");
  console.log(selectedFoodIndex);
  if (selectedFoodIndex === 0) {
    selectedFoodType = "South Indian Food";
    let sum = 0;
    document.querySelectorAll(".it").forEach((element) => {
      if (element === undefined) {
        element = 0;
      }

      sum = Number(element.value) + sum;
    });
    countOfFood = sum;
    console.log("countOfFood " + countOfFood);
  }
  console.log(selectedFoodType);
  foodTimes = `All Days On Restaurant ${selectedFoodType} - Map ${countOfFood} Times`;



  //to determine if services are added in inclusion or exclusion
  let checkedValue='';
  for(const radio of radioButtons ) {
    if(radio.checked){
      checkedValue=radio.value;
      siteSeeingStatus=true;
      console.log(checkedValue);
      break;
    }
  };
  if(siteSeeingStatus){

    siteSeeing = `${totalNights+1} days North Goa & South Goa Sightseeing by ${checkedValue}`;
  }

  
  //lets put all the status into array
  //if it is add service state then they are put in exclusion
  console.log(pickupAndDrop,siteSeeing);
  statusArray = [pickUpDropStatus, siteSeeingStatus, addonStatus];
  let statusContent=[pickupAndDrop,siteSeeing];
  inclusionList = [nights, foodTimes, translator, medical];

  


  
  statusArray.forEach((status,index) => {
    if ((status === true)) {
      //then that is included
      inclusionList.splice(2,0,statusContent[index])
      
    }
  });
  let masterList = [
    pickupAndDrop,
    nights,
    foodTimes,
    siteSeeing,
    translator,
    medical,
    ticket,
    GST,
    bevarage,
    disclaimer,
  ];
  exclusionList = masterList.filter((items) => !inclusionList.includes(items));
  console.log(exclusionList);

  // Create the document definition

  

  let docDefinition = {
    // defaultStyle: {
    //   font: 'Arial', // Set the font family to 'Arial'
      
    // },
    header: {
      // Place the image at the top of the page and center it
      stack: [
        {
          image: dataURL,
          width: 600, // Adjust the width of the image as needed
          height: 120,
          alignment: "center",
        },
      ],
      margin: [-20, 0],
    },
    content: [
      {
        text: '"Sun-Kissed Delights: Unveiling the Best of Goa - Customized Quotation"',
        style: "header",
        relativePosition: { x: 0, y: 140 },
      },
      {
        text: "Dear Brother/Sister,",
        relativePosition: { x: 0, y: 250 },
      },
      {
        text: "Thank you for considering Tick your Tour Private Limited for your upcoming trip to Goa. We are delighted to present you with a customized quotation for our exciting Goa Package. Please find the details below.",
        relativePosition: { x: 0, y: 270 },
      },
      {
        table: {
          widths: [250, 250],
          heights: [30, 30, 30, 30, 30, 30, 30],
          body: [
            ["Date", `${today.toISOString().slice(0, 10)}`],
            ["Name ", `${yourName}`],
            ["Location ", `${bookingLocation}`],
            ["Number of travellers ", `${totalPersons}`],
            ["Duration ", `${totalNights} Nights/${totalNights + 1} days`],
            ["Travel Assissant Name ", `${assName}`],
            [
              "Tour Date ",
              `${document.getElementById("date-text").textContent}`,
            ],
          ],
        },
        relativePosition: { x: 0, y: 350 },
        color: "blue",
      },
      {
        text: "Inclusions :",
        color: "red",
        fontSize: 15,
        pageBreak: "before",
        relativePosition: { x: 0, y: 100 },
      },
      {
        ul: inclusionList,
        relativePosition: { x: 10, y: 120 },
      },
      {
        text: "Exclusions :",
        color: "red",
        fontSize: 15,
        relativePosition: { x: 0, y: 250 },
      },
      {
        ul: exclusionList,
        relativePosition: { x: 10, y: 270 },
      },
      {
        table: {
          widths: [250, 250],
          heights: [30, 30, 30, 30, 30, 30, 30],
          body: [
            [
              "Type of Package",
              `${textContentOfSelectedIndex("hotel-type-id")}`,
            ],
            ["Hotel Options", `${textContentOfSelectedIndex("hotel-id")}`],
            ["Number of Rooms ", "Another one here"],
            ["Travelling ", "No Train/Flight/Bus"],
            ["Package Price Per Head ", `Rs ${allCost / totalPersons}`],
            [
              "GST 5% ",
              `Rs ${
                includingServiceChargePerHead * 0.05 +
                includingServiceChargePerHead
              }`,
            ],
            [
              "Total Package Price Including GST ",
              `Rs ${includingServiceChargePerHead * 0.05 + allCost}`,
            ],
          ],
        },
        // 			layout: 'noBorders',
        relativePosition: { x: 0, y: 400 },
        color: "blue",
        bold: true,
      },
      {
        text: '"Fun in the Sun: Comic Capers in Coastal Playground of Goa!"',
        pageBreak: "before",
        color: "red",
        fontSize: "14",
        alignment: "center",
        relativePosition: { x: 0, y: 100 },
      },
      {
        table: {
          widths: [200, 300],
          heights: [10, 30, 30, 30, 30, 30, 30],
          body: [
            [
              {
                image: agodaFort,
                fit: [200, 200],
              },
              {
                text: "Aguda Fort: Prepare for a blast from the past at Aguda Fort! This ancient stronghold has seen it all - from fierce battles to jaw-dropping views. It is the perfect spot to channel your inner history buff while enjoying some fort-ified fun!",
              },
            ],
            [
              {
                image: anjunaBeach,
                fit: [200, 200],
              },
              {
                text: "Anjuna Beach: Get ready to beach out at Anjuna Beach! Known for its lively flea markets, bohemian vibes, and groovy beach parties, this place is a haven for free spirits and dancing souls. Do not forget your dancing shoes and your inner hippie!",
              },
            ],
            [
              {
                image: bagaBeach,
                fit: [200, 200],
              },
              {
                text: "Baga Beach: Prepare yourself for a beach experience like no other at Baga Beach! From thrilling water sports that will make your heart race to vibrant beach shacks serving up lip-smacking seafood, this place will have you saying, Baga, please!",
              },
            ],
            [
              {
                image: calBeach,
                fit: [200, 200],
              },
              {
                text: "Calangute Beach: Calangute Beach is the epitome of beach bliss! Sun, sand, and a never-ending carousel of water sports await you. So grab your sunscreen, put on your coolest shades, and get ready to make waves of unforgettable memories!",
              },
            ],
          ],
        },
        pageBreak: "after",
        relativePosition: { x: 0, y: 130 },
      },
      {
        text:'Payment Policy',
        alignment:'center',
        fontSize:20,
        color:'red',
        relativePosition: { x: 0, y: 80 },
    },
    {
        table: {
      body: [
        [{text:'Step 1: Plan your Travel Date',color:'blue'}],
        ['Choose your preferred travel dates for a memorable journey. Our team will assist you in securing the best discounted prices for flights, trains, or buses, ensuring a cost-effective and convenient travel experience.']
      ]
    },
    layout: 'noBorders',
    relativePosition: { x: 0, y: 120 },
    },
     {
        table: {
      body: [
        [{text:'Step 2: Provide Co-Traveler Details',color:'blue'}],
        ['Please prepare a list of co-travelers names along with their valid government ID proof. This information is essential for a smooth booking process and ensures compliance with travel regulations.']
      ]
    },
    layout: 'noBorders',
    relativePosition: { x: 0, y: 200 },
    },
    {
        table: {
      body: [
        [{text:'Step 3: Secure your Booking with a Token Advance',color:'blue'}],
        ['To confirm your trip, a token advance of ₹1500 is required. This advance payment guarantees your reservation and allows us to make the necessary arrangements to provide you with a seamless travel experience.']
      ]
    },
    layout: 'noBorders',
    relativePosition: { x: 0, y: 280 },
    },
    {
        table: {
      body: [
        [{text:'Step 4: Payment Options',color:'blue'}],
        ['The remaining balance can be paid at the time of your travel, providing you with flexibility and convenience. Alternatively, you can also visit one of our nearby Tick your Tour offices to confirm your tour by making a direct payment']
      ]
    },
    layout: 'noBorders',
    relativePosition: { x: 0, y: 360 },
    },
    {
        table: {
      body: [
        [{text:'Account Details ',color:'red',alignment:'center'}],
        [{text:'Account Number : 234805000946\nAccount Holder is name : TICK YOUR TOUR PRIVATE LIMITED\nUPI : tickyourtour@Icici\nIFSC Code: ICIC0002348',alignment:'center'}],
      ]
    },
    alignment:'center',
// 			layout: 'noBorders',
    relativePosition: { x: 95, y: 500 },
    pageBreak:'after',
    }, {
      text:'Terms & Conditions',
      alignment:'center',
      fontSize:20,
      color:'red',
      relativePosition: { x: 0, y: 80 },
  },
  {
      image:termsAndCond,
      relativePosition: { x: 0, y: 120 },
      width:530,
  },
  {
      text:'Cancellation Policy',
      relativePosition: { x: 0, y: 600 },
      color:'red',
      
  },
  {
      ul: [
    '90% Refund if canceled 30 days prior to scheduled arrival.',
    '70% refund, if canceled more than 15 days prior to scheduled arrival (but less than 30 days)',
    '50% refund  if canceled more than 15 days prior to scheduled arrival.',
    'No refund, if canceled less than 7 days prior to scheduled arrival.',
    'During the Trip if canceled there will be No Refund.',
    'Incase of refund the refund period would be 15 days (working)',
  ],
  relativePosition: { x: 0, y: 620 },
  margin: [15, 0],
  pageBreak:'after',
  },{
    text:['Thank you for considering', {text:' Tick your Tour',color:'red'},' for your Goa Package! We have carefully crafted a customized quotation to ensure an unforgettable experience. Should you have any questions or need further information, please do not hesitate to contact us. We value your trust and would greatly appreciate it if you could provide a reference for our services. We look forward to serving you and creating lasting memories.'],
    relativePosition: { x: 0, y: 300 },
    fontSize:15,
    
},
 {
    text:'Our Branches ',
    relativePosition: { x: 0, y: 600 },
    color:'red',
    
},
{
    ul: [
  'Chennai : 23/1, Ground Floor, Alagiri Nagar 5th Street, Vadapalani, Chennai – 600023 ',
  'Kochi : 2422, Bank Rd, Kaloor, Kochi, Kerala 682017',
],
relativePosition: { x: 0, y: 620 },
margin: [15, 0],

},

    ],
    styles: {
      header: {
        bold: true,
        fontSize: 23,
        alignment: "center", // Optionally center the header text
        color: "red",
      },
    },
  };

  // Generate the PDF and initiate download
  pdfMake.createPdf(docDefinition).download("Goa_Booking.pdf");
}

// Attach event listener to the button after the page loads
document.addEventListener("DOMContentLoaded", function () {
  // Get the button element by its ID
  let generatePDFBtn = document.getElementById("generate-pdf-btn");

  // Attach the click event listener to the button
  generatePDFBtn.addEventListener("click", generatePDFs);
});

document.querySelector(".Submit").addEventListener("click", displayResult);
function displayResult(allCost, includingServiceChargePerHead) {
  const overlay = document.querySelector(".overlay");
  const messageCard = document.querySelector(".message-card");
  overlay.style.display = "block";
  messageCard.style.display = "block";
  document.getElementById("result-test").innerHTML = `<h1 style="
  background: black;
  color: white;
  padding-left: 25%;
">Packge Cost</h1>
<table class="tbl-result" style="
  border: none;
"><tbody><tr><td>The Cost of your Customised Package is</td> <td class="rate"> Rs ${allCost}</td></tr>
<tr><td>The cost per head is </td> <td class="rate"> Rs ${
    allCost / totalPersons
  }</td>

</tr><tr><td>The cost per head including service charge </td> <td class="rate"> Rs ${includingServiceChargePerHead}</td></tr>
<tr><td>The cost per head including Service and GST </td> <td class="rate"> Rs ${
    includingServiceChargePerHead * 0.05 + includingServiceChargePerHead
  } </td></tr></tbody></table>`;

  //close buuton event listner
  document.querySelector(".btn-close").addEventListener("click", function () {
    overlay.style.display = "none";
    messageCard.style.display = "none";
  });
}



//for fire base

initializeApp(firebaseConfig);
const db= getFirestore()//init service
const colref=collection(db,'login');//referring the collection
getDocs(colref)
  .then((snapshot)=>{
    let login=[];
    snapshot.docs.forEach((doc)=>{
      login.push({...doc.data(),id:doc.id})
    })
    console.log(login);
  })
  .catch(err=>{
    console.log(err.message)
  });

  const submit=document.querySelector('.Submit').addEventListener('click',(e)=>{
    e.preventDefault();
    addDoc(colref,{
      paxNumber:noOfPersons,
      totalNights:totalNights,
      
    })  
  })
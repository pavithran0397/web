"use strict";

/* "use strict";


let textArray = [];
let totalPersons = 0;
document.getElementById("no-of-persons").selectedIndex = null;
document.getElementById("goa-location1").selectedIndex=null
document.getElementById("goa-location2").selectedIndex=null
document.getElementById("goa-location3").selectedIndex=null
document.getElementById("goa-location4").selectedIndex=-null
let arrayToCollectLoc=[];

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
  //-------------adding sightseeing cost---------------//

  

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

//-------------------sight seeing-----------------------------//


//It displays according to the radio button selected
function handleRadioClick() {
  const hideSelect = document.querySelector(".hidden-select");

  const hideRadio = document.querySelector(".hidden-radio");
  const hiddenQuestion = document.querySelector(".hiddenQuestion");
  const hideTwoWheelers = document.querySelector(".hidden-two-wheeler");

  if (document.getElementById("self-drive-cars").checked) {
    calculateSelfDriveCars(10);

    hideSelect.style.display = "none";
    hiddenQuestion.style.display = "none";
    hideTwoWheelers.style.display = "none";
  }
  if (document.getElementById("Vechicle--driver").checked) {
    hiddenQuestion.style.display = "block";
    document.getElementById("HQ").selectedIndex = -1;

    hideRadio.style.display = "none";
    hideSelect.style.display = "block";
    hideTwoWheelers.style.display = "none";
  }
  if (document.getElementById("Two-Wheeler").checked) {
    calculateTwoWheelers();
    hideRadio.style.display = "none";
    hideSelect.style.display = "none";
    hiddenQuestion.style.display = "none";
  }
}


//event listneer method when radio button is clicked
const radioButtons = document.querySelectorAll('input[name="sight-seeing"]');
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
      goaSpan4.style.display = "none";
      break;
    case "3":
      goaSpan1.style.display = "block";
      goaSpan2.style.display = "block";
      goaSpan3.style.display = "block";
      goaSpan4.style.display = "block";
    default:
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
  goaSpan1.style.display = "none";
  goaSpan2.style.display = "none";
  goaSpan3.style.display = "none";

  document.getElementById("HQ").selectedIndex = -1;
  document.getElementById("goa-location1").selectedIndex = -1;
  document.getElementById("goa-location2").selectedIndex = -1;
  document.getElementById("goa-location3").selectedIndex = -1;

  document.getElementById("goa-location1").value = "";
  document.getElementById("goa-location2").value = "";
  document.getElementById("goa-location3").value = "";

  document.getElementById("goa-location2").innerHTML = "";
  document.getElementById("goa-location3").innerHTML = "";
  document.getElementById("goa-location4").innerHTML = "";
}
// console.log(document.querySelector("goa-location4"));


//calcualte cost for two wheelers
function calculateTwoWheelers() {
  document.querySelector(".hidden-two-wheeler").style.display = "block";
  totalPersons = document.getElementById("no-of-persons").value;
  document.getElementById("htw").innerHTML = `You Will Get ${Math.round(
    totalPersons / 2
  )} bikes`;
  const costForTwoWheeler=600*(Math.round(
    totalPersons / 2
  ))
  console.log(costForTwoWheeler)
}

//calclualte cosr selfdrive cars
function calculateSelfDriveCars() {
  totalPersons = document.getElementById("no-of-persons").value;
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

  console.log(document.getElementById("hr"));

  document.getElementById("hr").style.display = "block";

  document.getElementById(
    "hr"
  ).innerHTML = `You will get ${eightSeater} Eight seater and ${fiveSeater} Five seater`;
  const costForSelfDrive=(eightSeater*2000)+(fiveSeater*1500)
  console.log(costForSelfDrive)
}


//calculate for divered vechicles
function calculateVechicleWithDrivers(arrRate,switches) {
  
  const newArrRate=arrRate.fill(-1, switches, 4 );
  
  
  totalPersons = document.getElementById("no-of-persons").value;
  let seater = 0;
  
  if (totalPersons <= 4) {
    seater = 4
  }
  if (totalPersons > 4 && totalPersons <= 7) {
    seater = 7
   
  }
  if (totalPersons > 7 && totalPersons <= 13) {
    seater = 13
 
  }
  if (totalPersons > 13 && totalPersons <= 17) {
    seater = 17
   
  }
  if (totalPersons > 17 && totalPersons <= 20) {
    seater = 20
 
  }
  if (totalPersons > 20 && totalPersons <= 26) {
    seater = 26

  }
  if (totalPersons > 26 && totalPersons <= 30) {
    seater = 30
  
  }
  if (totalPersons > 30 && totalPersons <= 40) {
    seater = 40
 
  }
  console.log(`You will get ${seater} seater`)
  const rate={
    4:[2500,	2500,	3000,	5000],
    7:[3200,	3200,	3700,	7300],
    13:[3700,	3700,	4500,	7300],
    17:[3800,	3800,	4700,	8300],
    20:[3800,  3800,	4500,	8300],
    26:[4700,	4700,	5000,	9700],
    30:[6000,	6000,	7000,	11000],
    40:[7000,	7000,	8000,	12000]
  }
  console.log(rate[seater])
  const rateSeater = rate[seater];
  console.log(newArrRate)
  const newArrRatefiltered=newArrRate.filter(seat=>seat>-1)
  console.log(newArrRatefiltered)
  let sum=0
  console.log(newArrRatefiltered.length)
  for(let i=0;i<=newArrRatefiltered.length-1;i++){
    sum+=rateSeater[newArrRatefiltered[i]];

  }
  console.log("sum "+sum)


  
}
//calling when add to pcakage is clicked

function calc(){
  const switches = Number(document.getElementById("HQ").value);
  console.log("switches "+switches)
  
  selectedLevel1 = Number(document.getElementById("goa-location1").value);

    selectedLevel2 = Number(document.getElementById("goa-location2").value);
    selectedLevel3 = Number(document.getElementById("goa-location3").value);

    const result = 6 - (selectedLevel1 + selectedLevel2 + selectedLevel3);
    const arrRate=[selectedLevel1,selectedLevel2,selectedLevel3,result]

    console.log(arrRate);
    calculateVechicleWithDrivers(arrRate,switches+1)

} */

let textArray = [];
let totalPersons = 0;
document.getElementById("no-of-persons").selectedIndex = null;
document.getElementById("goa-location1").selectedIndex = null;
document.getElementById("goa-location2").selectedIndex = null;
document.getElementById("goa-location3").selectedIndex = null;
document.getElementById("goa-location4").selectedIndex = -null;
let arrayToCollectLoc = [];

// clickEvent function--when click submit button
function clickedEvent(event) {
  //taking the input how many persons
  event.preventDefault();
  totalPersons = document.getElementById("no-of-persons").value;
  console.log("totalPersons " + totalPersons);

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
  console.log("Nights: " + totalNights);
  if (checkIn > checkOut) {
    alert("Check in date cannot be greater than check out date");
  } else {
    //pushing the room share value to the array
    textArray = [];

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

    const costRoomFood = calculateTheCost(textArray, foodMenu, totalNights);

    //-------------adding sightseeing cost---------------//

    const sightSeeingCost = totalCostForSightSeeing();

    //-----adding pickupdrop----------------//
    // const total=totalCostForPickupAndDrop();
    const seater = calcSeaters();
    const costForPickandDrop = calcPickupDropcost(
      seater,
      pickupPoint.value,
      dropPoint.value
    );
    console.log("costForPickandDrop " + costForPickandDrop);
    console.log(addPickupDropBtn.textContent=="Add Service")
    if(addPickupDropBtn.textContent == "Remove service"){
      pickupPoint.required='true'
      dropPoint.required='true';

    }
    console.log(pickupPoint.required)

    document.getElementById(
      "result"
    ).textContent = ` The Cost of your Customised Package is Rs ${
      sightSeeingCost + costRoomFood + costForPickandDrop
    } `;

    
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
    document.getElementById("HQ").selectedIndex = -1;

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
const radioButtons = document.querySelectorAll('input[name="sight-seeing"]');
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
      goaSpan4.style.display = "none";
      break;
    case "3":
      goaSpan1.style.display = "block";
      goaSpan2.style.display = "block";
      goaSpan3.style.display = "block";
      goaSpan4.style.display = "block";
    default:
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
  goaSpan1.style.display = "none";
  goaSpan2.style.display = "none";
  goaSpan3.style.display = "none";

  document.getElementById("HQ").selectedIndex = -1;
  document.getElementById("goa-location1").selectedIndex = -1;
  document.getElementById("goa-location2").selectedIndex = -1;
  document.getElementById("goa-location3").selectedIndex = -1;

  document.getElementById("goa-location1").value = "";
  document.getElementById("goa-location2").value = "";
  document.getElementById("goa-location3").value = "";

  document.getElementById("goa-location2").innerHTML = "";
  document.getElementById("goa-location3").innerHTML = "";
  document.getElementById("goa-location4").innerHTML = "";
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
function calcSeaters() {
  let seater = 0;
  totalPersons = document.getElementById("no-of-persons").value;

  if (totalPersons <= 4) {
    seater = 4;
  }
  if (totalPersons > 4 && totalPersons <= 7) {
    seater = 7;
  }
  if (totalPersons > 7 && totalPersons <= 13) {
    seater = 13;
  }
  if (totalPersons > 13 && totalPersons <= 17) {
    seater = 17;
  }
  if (totalPersons > 17 && totalPersons <= 20) {
    seater = 20;
  }
  if (totalPersons > 20 && totalPersons <= 26) {
    seater = 26;
  }
  if (totalPersons > 26 && totalPersons <= 30) {
    seater = 30;
  }
  if (totalPersons > 30 && totalPersons <= 40) {
    seater = 40;
  }
  return seater;
}

//calculate for divered vechicles
function calculateVechicleWithDrivers(arrRate, switches) {
  const newArrRate = arrRate.fill(-1, switches, 4);

  const seater = calcSeaters();

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
  console.log(newArrRatefiltered.length);
  for (let i = 0; i <= newArrRatefiltered.length - 1; i++) {
    sum += rateSeater[newArrRatefiltered[i]];
  }
  console.log("sum " + sum);

  return sum;
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

  console.log(sumForSightSeeing);
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
      console.log(content.scrollHeight);
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }
  pickupMessage.style.visibility = dropMessage.style.visibility = "hidden";
 

  console.log(pickupPoint.value);

  if (pickupPoint.selectedIndex != -1) {
    const seater = calcSeaters();
    pickupMessage.style.visibility = "visible";
    console.log(pickupPoint.required);
    pickupPoint.required='true'
    pickupMessage.textContent =
      pickupPoint.value !== "Not Needed"
        ? `A ${seater} seater will Pick you at ${pickupPoint.value}`
        : "Pick up service Removed";
  }
  if (dropPoint.selectedIndex != -1) {
    const seater = calcSeaters();
    dropMessage.style.visibility = "visible";
    dropPoint.required='true'
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
  console.log(seater);
  const findArray = dataArray.find(
    (rate) => rate.vehicle === `${seater} Seater`
  );
  const sum = findArray[pickup] + findArray[drop];
  console.log(sum);
  return sum;
};

// const sumss()

let inputFood = document.getElementById("input-food");
let inputBtn = document.getElementById("input-btn");
let foodContainer = document.getElementById("food-container");
let noListEl = document.getElementById("no-list");
const foodListStatistics = document.getElementById("food-list-statistics");


let foodItems="FoodItems"

document.addEventListener('DOMContentLoaded',()=>{


    const fetchedData = [...JSON.parse(localStorage.getItem(foodItems))];
    
    fetchedData.forEach(data =>{
      

          
      let newFoodItemEl = document.createElement("li");

      let div = document.createElement("div"); 
      let divBtn = document.createElement("div");

      newFoodItemEl.append(div, divBtn);

      div.textContent = data.foodItem;
      newFoodItemEl.className = "food-item";

      divBtn.setAttribute("onClick", "removeFoodItem(event)");
      divBtn.innerHTML = `<i class="fa fa-xmark"></i>`;
      newFoodItemEl.append(divBtn);

      foodContainer.append(newFoodItemEl);
    });

    refreshUI();
});

const handleInputFood = () => {
 
  let newFoodItemEl = document.createElement("li");

  let div = document.createElement("div"); 
  let divBtn = document.createElement("div");

  newFoodItemEl.append(div, divBtn);

  div.textContent = inputFood.value;
  newFoodItemEl.className = "food-item";

  divBtn.setAttribute("onClick", "removeFoodItem(event)");
  divBtn.innerHTML = `<i class="fa fa-xmark"></i>`;
  newFoodItemEl.append(divBtn);

  foodContainer.append(newFoodItemEl);
  
  localStorage.setItem(
    foodItems,
    JSON.stringify(
      [...JSON.parse(localStorage.getItem(foodItems)||'[]'),{foodItem: inputFood.value}]
    )
  );



  // resetting the inputFood value
  inputFood.value = "";

  refreshUI();
};

inputBtn.addEventListener("click", handleInputFood);

inputFood.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleInputFood();
  } else if (event.key === "KeyZ" && (event.ctrlKey || event.metaKey)) {
    // Undo Operations
    inputFood.value = "";
  }
});

// remove Food items
function removeFoodItem(event) {
  const existingList = event.target.parentNode.parentNode;
  existingList.remove();

  const fetchedData = [...JSON.parse(localStorage.getItem(foodItems))];
  fetchedData.forEach( (value)=>{
      if(value.foodItem === existingList.textContent){
        fetchedData.splice(fetchedData.indexOf(value),1)
      }
  });
  localStorage.setItem(foodItems,JSON.stringify(fetchedData));

  refreshUI();
}

function refreshUI() {
  foodListStatistics.innerText = `You have ${foodContainer.children.length} lists`;

  // if (foodContainer.children.length > 0) {
  //   //  children exist, so don't show `no-list` div
  //   noListEl.hidden = true;
  // } else {
  //   // children not exist, show `no-list` div
  //   noListEl.hidden = false;
  // }

  // You can write better!
  foodContainer.children.length > 0
    ? ((noListEl.hidden = true), (foodListStatistics.hidden = false))
    : ((noListEl.hidden = false), (foodListStatistics.hidden = true));
}

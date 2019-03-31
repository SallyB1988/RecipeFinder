const defaultRecipeImage = "./assets/images/groceries.png"; 

window.onload = function() {

  const data = JSON.parse(localStorage.getItem("data"));
  console.log(data);
  updateRecipeDetails(data);
};


const updateRecipeDetails = (data) => {
  $("#recipe-details-title").append(`<h2>${data.name}</h2>`);
  $("#recipe-details-instructions").append(`<h2>${data.instructions[0]}</h2>`);
}


var ingredients = [];   // this will contain ingredient objects (with name and image)

var defaultIngredients = ['chicken', 'beef', 'cheese', 'salmon'];
var searchItems = [];
const defaultImage = "./assets/images/groceries.png"; 

/**
 * When an item in the selected items list is clicked, remove it from the searchItems array and update the list
 */
$(document).on("click", ".selected-item", function() {
  let food = $(this).attr("food-item");
  let index = searchItems.indexOf(food);
  searchItems.splice(index,1);
  updateSelectedItemsList("#selected-list");        // update modal list
  updateSelectedItemsList("#main-selected-list");   // update main page list
})

/**
 * When an item is clicked, add it to the searchItems array and update the selected items list
 */
$(document).on("click", ".single-option", function() {

  let food = $(this).attr("food-item");
  if (!searchItems.includes(food)) {
    searchItems.push(food);
    updateSelectedItemsList("#selected-list");
  }
})

  /*
  * Creates clickable images and puts them in the ingredients-options box
  */
 const createIngredientChoices = () => {
   let $ingredientOptions = $('#ingredient-options');
   $ingredientOptions.empty();
   let foodImage = "";
   for (let i = 0; i < ingredients.length; i++) {

     if (ingredients[i].image !== "") {
       try {
         foodImage = `<img id="ingredient-${i}"
          class="ingredient-option-image"
          src=${ingredients[i].image}
          onerror="this.src='${defaultImage}'" >`
       } catch {
         foodImage = "";
       }
     }

    $('#ingredient-options').append(`<div id="ingredient-${i}" class="m-1 float-left ingredient-frame">
      <div class="single-option" food-item="${ingredients[i].name}">
        <div class="text-center ingredient-name">${ingredients[i].name}</div>
        ${foodImage}
      </div>`);
   }
 }

  const updateSelectedItemsList = (divId) => {
    const $selectedList = $(divId);
    $selectedList.empty();  // clear out current list
    if (searchItems) {
      let $listGroup = $selectedList.append("<div>").addClass("list-group");
      for (i=0; i<searchItems.length; i++) {
        $listGroup.append(`<button type="button" class="list-group-item list-group-item-action w-50 mx-auto text-center py-1 selected-item" food-item="${searchItems[i]}">${searchItems[i]}</button>`);
      }
    }
  }

  // Do the AJAX call to get recipes. Initially set it to find 6 recipes
  $("#search-api").on("click", function() {
    // TEMPORARILY COMMENT OUT THE CALL TO GET THE RECIPES
   // getRecipes(searchItems, 6);
    $("#select-ingredients").modal('hide');
    updateSelectedItemsList("#main-selected-list");
    createMainPageButtons()
  })

function createMainPageButtons() {
  let $mainIngredientBtns = $("#fav-btns");
  for (i=0; i<ingredients.length; i++) {
    $mainIngredientBtns.append(`<button type="button" class="btn text-center py-1 m-2 main-button" food-item="${ingredients[i].name}">${ingredients[i].name}</button>`);
  }  
}

// On click of add ingredient button
  $("#add-ingredient").on("click", (e) => {
    e.preventDefault();
    var subject = $("#new-ingredient-input").val().trim();
    if (subject !== "" && !ingredientExists(subject)) {
      ingredients.push(createIngredientObject(subject))
      createIngredientChoices();
    }
    $("#new-ingredient-input").val('');    // clear input field
  })

  // Returns true if ingredient exists in list, otherwise returns false
  function ingredientExists(item) {

    var index = ingredients.filter((obj) => {
      return obj.name === item;
    })
    if (index.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  function createIngredientObject(item) {
    return (
      {
        "name": item,
        "image": getIngredientImage(item),
      }
    )
  }

  function getIngredientImage(food) {
    let findImage;
    try {
      findImage = `https://www.themealdb.com/images/ingredients/${food}.png`;
    } catch {
      findImage = '';
    }
    return findImage
  }

  $(document).ready(() =>{
    defaultIngredients.forEach((item) => {
      ingredients.push(createIngredientObject(item))
      createIngredientChoices();
    })    

  })
let yummyRow = document.getElementById("yummyRow");
let searchContainer = document.getElementById("searchContainer");
// display multiple meals by default using search api by set the search value to empty
$(document).ready(() => {
    $(".loading-screen").fadeIn(500);
    closeNav();
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500);
        $("body").css("overflow", "visible");
    });
});

function openNav() {
    $(".side-nav-menu").animate({ left: 0}, 500);
    $(".slider-icon").removeClass("fa-align-justify");
    $(".slider-icon").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({ top: 0 }, (i + 5) * 150);
    }
}

function closeNav() {
    let sideNavWidth = $(".side-nav-menu .nav-tab").outerWidth();
    $(".side-nav-menu").animate({left: -sideNavWidth}, 500);
    $(".slider-icon").addClass("fa-align-justify");
    $(".slider-icon").removeClass("fa-x");
    $(".links li").animate({top:"400"}, 500);
}

$(".slider-icon").click(function () { 
    if ($(".side-nav-menu").css("left") == "0px") {
        closeNav();
    } else {
        openNav();
    }
});

    //------------------------------------------------------------

    async function fetchCategoryMeals(category) {
        yummyRow.innerHTML = "";
        searchContainer.innerHTML = "";
        $(".inner-loading-screen").fadeIn(300);
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        response = await response.json();
        if (response && response.meals) {
            displayMeals(response.meals.slice(0, 20));
        }
        $(".inner-loading-screen").fadeOut(300);
    }

    async function fetchAreaMeals(area) {
        yummyRow.innerHTML = "";
        searchContainer.innerHTML = "";
        $(".inner-loading-screen").fadeIn(300);
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        response = await response.json();
        displayMeals(response.meals.slice(0, 20))
        $(".inner-loading-screen").fadeOut(300);
    }

    async function fetchIngredientsMeals(ingredients) {
        yummyRow.innerHTML = "";
        searchContainer.innerHTML = "";
        $(".inner-loading-screen").fadeIn(300);
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
        response = await response.json();
        displayMeals(response.meals.slice(0, 20))
        $(".inner-loading-screen").fadeOut(300);
    }

    function displayMeals(array) {
        let meals = "";
        for (let i = 0; i < array.length; i++) {
            meals += `
            <div>
            <div onclick="fetchMealDetails('${array[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${array[i].strMealThumb}" alt="" srcset="">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${array[i].strMeal}</h3>
                </div>
            </div>
            </div>`;
        }
        yummyRow.innerHTML = meals;
    }

    //----------------------------------------------------------------

    async function Categories() {
        closeNav();
        yummyRow.innerHTML="";
        searchContainer.innerHTML = "";
        $(".inner-loading-screen").fadeIn(300);
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        response = await response.json();
        displayCategories(response.categories);
        $(".inner-loading-screen").fadeOut(300);
    }

    function displayCategories(array) {
        let categories = "";
        for (let i = 0; i < array.length; i++) {
            categories += `<div>
            <div onclick="fetchCategoryMeals('${array[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${array[i].strCategoryThumb}" alt="meal img">
                <div class="meal-layer position-absolute text-center text-black p-2">
                    <h3>${array[i].strCategory}</h3>
                    <p>${array[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
            </div>
        </div>`;
        }
        yummyRow.innerHTML = categories;
    }

    //-------------------------------------------------------------
    async function getArea() {
        closeNav();
        yummyRow.innerHTML = "";
        searchContainer.innerHTML = "";
        $(".inner-loading-screen").fadeIn(300);
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        response = await response.json();
        displayArea(response.meals);
        $(".inner-loading-screen").fadeOut(300);
    }

    function displayArea(array) {
        let aries = "";
        for (let i = 0; i < array.length; i++) {
            aries += `<div>
            <div onclick="fetchAreaMeals('${array[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${array[i].strArea}</h3>
            </div>
        </div>`;
        }

        yummyRow.innerHTML = aries;
    }

    //---------------------------------------------------------------
    async function getIngredients() {
        closeNav();
        yummyRow.innerHTML = "";
        searchContainer.innerHTML = "";
        $(".inner-loading-screen").fadeIn(300);
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
            response = await response.json();
            displayIngredients(response.meals);
        $(".inner-loading-screen").fadeOut(300);
    }

    function displayIngredients(array) {
        let Ingredients = "";
        for (let i = 0; i < 20; i++) {
            if (array[i].strDescription)
            {  
                Ingredients += `  <div>
                    <div onclick="fetchIngredientsMeals('${array[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${array[i].strIngredient}</h3>
                    <p>${(array[i].strDescription).split(" ").slice(0,20).join(" ")}</p>
            </div>
            </div>`;
            }}
         
        yummyRow.innerHTML = Ingredients;
    }

    //-------------------------------------------------------------

    async function fetchMealDetails(mealID) {
        closeNav();
        yummyRow.innerHTML="";
        searchContainer.innerHTML = "";
        $(".inner-loading-screen").fadeOut(300);
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
        response= await response.json();
        displayMealDetails(response.meals[0]);
        $(".inner-loading-screen").fadeOut(300);
    }

    function displayMealDetails(array) {
        let ingredientsDetails = ``;
        for (let i = 1; i <= 20; i++) {
            let ingredient = array[`strIngredient${i}`];
            let measure = array[`strMeasure${i}`];
            if (ingredient !== "" && ingredient !== null && ingredient !== undefined) {
                ingredientsDetails += `<li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>`;
            }
        }
        let tagsStr = array.strTags ? array.strTags.split(",") : [];
        let tags = "";
        for (let i = 0; i < tagsStr.length; i++) {
            tags += `<li class="alert alert-danger m-2 p-1">${tagsStr[i]}</li>`;
        }

        let mealDetailsHTML = `
        <div class="col-md-4">
            <img class="w-100 rounded-3" src="${array.strMealThumb}" alt="${array.strMeal}">
            <h2>${array.strMeal}</h2>
        </div>
        <div class="col-md-8 flex-grow-1">
            <h2>Instructions</h2>
            <p class="instructions" >${array.strInstructions}</p>
            <h3><span class="fw-bolder">Area: </span>${array.strArea}</h3>
            <h3><span class="fw-bolder">Category: </span>${array.strCategory}</h3>
            <h3>Recipes:</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">${ingredientsDetails}</ul>
            <h3>Tags:</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">${tags}</ul>
            <a target="_blank" href="${array.strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${array.strYoutube}" class="btn btn-danger">Youtube</a>
        </div>`;

    yummyRow.innerHTML = mealDetailsHTML;

    }

    //----------------------------------------------------------------
    // search for meals and display them
    function displaySearchInputs() {
        closeNav();
        searchContainer.innerHTML = `
        <div class="row py-4 ">
            <div class="col-md-6 ">
                <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white searhinput" type="text" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchByLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white searhinput" type="text" placeholder="Search By First Letter">
            </div>
        </div>`

        yummyRow.innerHTML = ""
    }
    async function searchByName(name){
            closeNav();
            yummyRow.innerHTML = "";
            $(".inner-loading-screen").fadeIn(300);
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
            response = await response.json();
            response.meals? displayMeals(response.meals) : displayMeals([]);
            $(".inner-loading-screen").fadeOut(300);
        }

    async function searchByLetter(character){
            closeNav();
            yummyRow.innerHTML = "";
            $(".inner-loading-screen").fadeIn(300);
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${character}`);
            response = await response.json();
            response.meals? displayMeals(response.meals) : displayMeals([]);
            $(".inner-loading-screen").fadeOut(300);
    } 

    //----------------------------------------------------------------
    //call function when clicked on the list items by sending to each child li his function 
    $(".links li:nth-child(1)").click(function() {displaySearchInputs();});
    $(".links li:nth-child(2)").click(function() {Categories();});
    $(".links li:nth-child(3)").click(function() {getArea();});
    $(".links li:nth-child(4)").click(function() {getIngredients();});
    $(".links li:nth-child(5)").click(function() {showContacts();});
    
    //-----------------------------------------------------------------
function showContacts() {
    closeNav();
    searchContainer.innerHTML = "";
    yummyRow.innerHTML = `
        <div class="contact min-vh-100 d-flex justify-content-center align-items-center flex-grow-1">
            <div class="container w-75 text-center">
                <div class="row g-4">
                    <div class="col-md-6">
                        <input id="name" oninput="validateInputs(this)" type="text" class="form-control" placeholder="Enter Your Name">
                        <p class="text-danger fs-5 text-start d-none">Special characters and numbers not allowed</p>
                    </div>
                    <div class="col-md-6">
                        <input id="email" oninput="validateInputs(this)" type="email" class="form-control" placeholder="Enter Your Email">
                        <p class="text-danger fs-5 text-start d-none">Email is not valid</p>
                    </div>
                    <div class="col-md-6">
                        <input id="phone" oninput="validateInputs(this)" type="text" class="form-control" placeholder="Enter Your Phone">
                        <p class="text-danger fs-5 text-start d-none">Please enter a valid phone number</p>
                    </div>
                    <div class="col-md-6">
                        <input id="age" oninput="validateInputs(this)" type="number" class="form-control" placeholder="Enter Your Age">
                        <p class="text-danger fs-5 text-start d-none">Please enter a valid age</p>
                    </div>
                    <div class="col-md-6">
                        <input id="password" oninput="validateInputs(this)" type="password" class="form-control" placeholder="Enter Your Password">
                        <p class="text-danger fs-5 text-start d-none">Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
                    </div>
                    <div class="col-md-6">
                        <input id="repassword" oninput="validateInputs(this)" type="password" class="form-control" placeholder="Re-enter Password">
                        <p class="text-danger fs-5 text-start d-none">Password don't match</p>
                    </div>
                </div>
                <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3" type="submit">Submit</button>
            </div>
        </div>`;
    }
    // set the default contacts regex
    let regex = {
        name: /^[a-zA-Z ]+$/,
        email: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
        phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        age: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
        password: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
        repassword: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/
    };
//check all of inputs value is valid
    function validateInputs(element) {
        let inputValue = element.value;
        let password = document.getElementById("password").value;
        let repassword = document.getElementById("repassword").value;
        let passwordsMatch = password === repassword;
        let correctValid = regex[element.id].test(inputValue);
        if (element.id === "repassword") {
            if (passwordsMatch) {
                element.nextElementSibling.classList.add("d-none");
            } else {
                element.nextElementSibling.classList.remove("d-none");
            }
        } else {
            if (correctValid) {
                element.nextElementSibling.classList.add("d-none");
            } else {
                element.nextElementSibling.classList.remove("d-none");
            }
        }
        submitContact();
    }
    
    function submitContact() {
        let submitBtn = document.getElementById("submitBtn");
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let age = document.getElementById("age").value;
        let password = document.getElementById("password").value;
        let repassword = document.getElementById("repassword").value;
        let passwordsMatch = password === repassword;
    
        if (regex.name.test(name) && 
            regex.email.test(email) &&
            regex.phone.test(phone) &&
            regex.age.test(age) &&
            regex.password.test(password) && passwordsMatch)
        {
            submitBtn.removeAttribute("disabled");
        } else {
            submitBtn.setAttribute("disabled", "disabled");
        }
    }

   
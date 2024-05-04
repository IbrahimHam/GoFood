const findDropdown = document.getElementById('find_dropdown')
const dropdownMenu = document.getElementById('dropdown-menu')
const restaurantCard = document.getElementById('restaurant-card')

const dropdownRender = () => {
  findDropdown.addEventListener('focus', function () {
    dropdownMenu.style.display = 'block';
  });

  findDropdown.addEventListener('blur', function () {
    dropdownMenu.style.display = 'none';
  });

}
const displayRestaurants = (restaurants) => {
  const restaurantList = document.getElementById("restaurant-list");
  restaurantList.innerHTML = "";
  restaurants.forEach(restaurant => {
    const tags = restaurant.tags;
    const cuisines = tags.join(', ');

    const card = document.createElement("div");
    card.classList.add("card", "mb-3");
    card.innerHTML = `
        <div id="restaurant-card" class="card-body " >
          <h3 class="card-title">${restaurant.name}</h3>
          <p class="card-text">Cuisines: ${cuisines}</p>
          <p class="card-text">Location: ${restaurant.location.address}</p>
          <a href="#" class="btn btn-primary">Order Now</a>
          <a href="#" class="btn btn-secondary">View Details</a>
          <a href="#" class="btn btn-success">Add to Cart</a>
        </div>
      `;

    card.addEventListener('click', () => {
      const queryParams = new URLSearchParams();
      const locationObject = restaurant.location;
      console.log(locationObject)

      queryParams.append('id', restaurant.id);
      queryParams.append('name', restaurant.name);
      queryParams.append('imageURL', restaurant.imageURL);
      queryParams.append('address', locationObject.address);
      queryParams.append('city', locationObject.city);
      queryParams.append('state', locationObject.state);
      queryParams.append('zip_code', locationObject.zip_code);
      queryParams.append('tags', restaurant.tags.join(', '));
      queryParams.append('rating', restaurant.rating);
      queryParams.append('reviews', JSON.stringify(restaurant.reviews));

      window.location.href = `./restaurant.html?${queryParams.toString()}`;
    })
    restaurantList.appendChild(card);
  });
}

const createCuisineOptions = (restaurants) => {
  const cuisineFilter = document.getElementById("cuisine-filter");
  const cuisines = new Set();

  // Extract all cuisines from the list of restaurants
  restaurants.forEach(restaurant => {
    restaurant.tags.forEach(tag => {
      cuisines.add(tag);
    });
  });

  // Remove existing options
  cuisineFilter.innerHTML = "";

  // Create option for "All Cuisines"
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All Cuisines";
  cuisineFilter.appendChild(allOption);

  // Create options for each cuisine
  cuisines.forEach(cuisine => {
    const option = document.createElement("option");
    option.value = cuisine.toLowerCase();
    option.textContent = cuisine;
    cuisineFilter.appendChild(option);
  });

  // Event listener for filter dropdown
  cuisineFilter.addEventListener("change", () => {
    const selectedCuisine = cuisineFilter.value;
    const filteredRestaurants = filterRestaurantsByCuisine(restaurants, selectedCuisine);
    displayRestaurants(filteredRestaurants);
  });
};

const filterRestaurants = (cuisine) => {
  if (cuisine === "all") {
    displayRestaurants(restaurants);
  } else {
    const filteredRestaurants = restaurants.filter(restaurant => restaurant.cuisine === cuisine);
    console.log(filteredRestaurants)
    displayRestaurants(filteredRestaurants);
  }
}

const cuisineFilter = document.getElementById("cuisine-filter");
cuisineFilter.addEventListener("change", () => {
  const selectedCuisine = cuisineFilter.value;
  filterRestaurants(selectedCuisine);
});

const fetchRestaurantData = async () => {
  try {
    const response = await fetch('https://yelp-backend-rho.vercel.app/restaurants');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching restaurant data:', error);
  }
}

const filterRestaurantsByCuisine = (restaurants, cuisine) => {
  if (cuisine === "all") {
    return restaurants;
  } else {
    return restaurants.filter(restaurant => restaurant.tags.includes(cuisine));
  }
};

fetchRestaurantData()
  .then(restaurants => {
    displayRestaurants(restaurants)
    createCuisineOptions(restaurants);

  })
  .catch(error => console.error('Error rendering restaurant data:', error));

findDropdown.addEventListener('click', dropdownRender)

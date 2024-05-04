class Restaurant {
  constructor(id, name, imageURL, location, tags, rating, reviews) {
    this.id = id;
    this.name = name;
    this.imageURL = imageURL;
    this.location = location;
    this.tags = tags;
    this.rating = rating;
    this.reviews = reviews;
  }

  render() {
    renderRestaurantName(this.name);
    renderAddress(this.location.address, this.location.city, this.location.state, this.location.zip_code);
    renderDescription(this.name, this.tags, this.rating);
    renderReviews(this.reviews);
  }
}

//Ruth

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


//Ali


// Function to display restaurant cards
const displayRestaurants = (restaurants) => {
  console.log("Hello form display")
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
      const queryParams = new URLSearchParams(restaurant);
      window.location.href = `./restaurant.html?${queryParams}`;
    })
    fetchRestaurantData(restaurant)
    restaurantList.appendChild(card);
  });
}

// Function to filter restaurants by cuisine
const filterRestaurants = (cuisine) => {
  if (cuisine === "all") {
    displayRestaurants(restaurants);
  } else {
    const filteredRestaurants = restaurants.filter(restaurant => restaurant.cuisine === cuisine);
    displayRestaurants(filteredRestaurants);
  }
}

// Event listener for filter dropdown
const cuisineFilter = document.getElementById("cuisine-filter");
cuisineFilter.addEventListener("change", () => {
  const selectedCuisine = cuisineFilter.value;
  filterRestaurants(selectedCuisine);
});


//Ibrahim

const renderRestaurantName = (name = 'Pasta Central') => {
  const restaurantNameElement = document.getElementById('restaurantName');

  document.title = name
  restaurantNameElement.innerHTML = name;
}

const renderAddress = (address = '456 Noodle Street', city = 'Pastaville', state = 'NY', zipCode = '10001') => {
  const addressElement = document.getElementById('address');
  const cityElement = document.getElementById('city');
  const stateElement = document.getElementById('state');
  const zipCodeElement = document.getElementById('zipCode');

  addressElement.innerHTML = address;
  cityElement.innerHTML = city;
  stateElement.innerHTML = state;
  zipCodeElement.innerHTML = zipCode;
}

const renderDescription = (restaurantName = 'Pasta Central', cuisines = ['Italian'], rating = 4) => {
  const description = document.getElementById('description');

  const specialties = cuisines.join(', ');
  const descriptionText = `Welcome to ${restaurantName}, where culinary excellence meets warm hospitality. Specializing in ${specialties}, our ${rating} star-rated restaurant offers a diverse menu crafted with the finest ingredients sourced locally and globally. From traditional favorites to adventurous creations, our passionate chefs ensure a symphony of flavors to delight your palate. Come experience the essence of gastronomic bliss at ${restaurantName}.`;

  description.innerHTML = descriptionText;
}

const renderReviews = (reviewsData) => {
  const reviewsContainer = document.getElementById('reviews')
  reviewsContainer.innerHTML = "";
  reviewsData.forEach((review) => {
    const reviewElement = document.createElement("div");
    reviewElement.classList.add("review");

    reviewElement.innerHTML = `
        <div class="review">
          <p class="fst-italic review-rating"> ${review.user_id} Rating: ${review.rating}/5</p>
          <p class="lh-1 review-text">${review.text}</p>
        </div>
      `;

    reviewsContainer.appendChild(reviewElement);
  });
}

const fetchRestaurantData = async () => {
  try {
    const response = await fetch('https://yelp-backend-rho.vercel.app/restaurants');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching restaurant data:', error);
  }
}

const displayRestaurant = (restaurant) => {
  restaurant = new Restaurant(data.id, data.name, data.image_URL, data.location, data.tags, data.rating, data.reviews);
  restaurant.render();
}


fetchRestaurantData()
  .then(restaurants => {
    displayRestaurants(restaurants)
  })
  .catch(error => console.error('Error rendering restaurant data:', error));

findDropdown.addEventListener('click', dropdownRender)

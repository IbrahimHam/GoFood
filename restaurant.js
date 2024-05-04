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

    const specialties = cuisines;
    const descriptionText = `Welcome to ${restaurantName}, where culinary excellence meets warm hospitality. Specializing in ${specialties}, our ${rating} star-rated restaurant offers a diverse menu crafted with the finest ingredients sourced locally and globally. From traditional favorites to adventurous creations, our passionate chefs ensure a symphony of flavors to delight your palate. Come experience the essence of gastronomic bliss at ${restaurantName}.`;

    description.innerHTML = descriptionText;
}

const renderReviews = (reviewsData) => {
    reviewsData = JSON.parse(reviewsData);

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

const displayRestaurant = (restaurant) => {
    restaurant = new Restaurant(data.id, data.name, data.image_URL, data.location, data.tags, data.rating, data.reviews);
    restaurant.render();
}

const queryParams = new URLSearchParams(window.location.search);
const restaurantId = queryParams.get('id');
const restaurantName = queryParams.get('name');
const restaurantImageURL = queryParams.get('imageURL');
const address = queryParams.get('address');
const city = queryParams.get('city');
const state = queryParams.get('state');
const zipCode = queryParams.get('zip_code');
const restaurantTags = queryParams.get('tags');
const restaurantRating = queryParams.get('rating');
const restaurantReviews = queryParams.get('reviews');
const locationObject = {
    address: address,
    city: city,
    state: state,
    zip_code: zipCode
  };

const restaurant = new Restaurant(restaurantId, restaurantName, restaurantImageURL, locationObject, restaurantTags, restaurantRating, restaurantReviews)

restaurant.render()
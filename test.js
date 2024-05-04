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

// const fetchRestaurantData = async () => {
//     try {
//         const response = await fetch('https://yelp-backend-rho.vercel.app/restaurants');
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching restaurant data:', error);
//     }
// }

const displayRestaurant = (restaurant) => {
    restaurant = new Restaurant(data.id, data.name, data.image_URL, data.location, data.tags, data.rating, data.reviews);
    restaurant.render();
}

const queryParams = new URLSearchParams(window.location.search);
// id, name, imageURL, location, tags, rating, reviews
const id1 = queryParams.get('id'); // Returns 'John'
const name1 = queryParams.get('name'); // Returns 'John'
const imageURL1 = queryParams.get('imageURL'); // Returns 'John'
const location1 = queryParams.get('location'); // Returns 'John'
const tags1 = queryParams.get('tags'); // Returns 'John'
const rating1 = queryParams.get('rating'); // Returns 'John'
const reviews1 = queryParams.get('reviews'); // Returns 'John'

const restaurant = new Restaurant(id1, name1, imageURL1, location1, tags1, rating1, reviews1)
restaurant.render()
console.log(restaurant)


// console.log(name)
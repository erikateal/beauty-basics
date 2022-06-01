let product;
let allProducts = []; // stores the API in an array
let productCategories = { // stores the product type in an object
  // "example": [
  //   {label:"product1"}
  // ]
};
let selectedProductCategory = []; 
let productArr = [];
const url = `/js/products.json`; // cached API
let selectedProductIndex = 0; // needed to loop through the contents of the selected product array

fetch(url)
  .then(res => res.json()) //parse response as JSON
  .then(data => {
    allProducts = data // stores the API in an array
    for(let i = 0; i < data.length; i++){
      productArr.push(data[i].product_type); // pushing every element in the product type to an array
      if (productCategories[data[i].product_type] === undefined) {
        productCategories[data[i].product_type] = [];
      }
      productCategories[data[i].product_type].push(data[i]);
    }
    let uniqueProduct = [...new Set(productArr)]; // creating a new set w/ just the unique values from the array
    uniqueProduct.map(product => {
      let productCapitalized = product[0].toUpperCase() + product.slice(1);
      let formattedProduct = productCapitalized.replace('_', ' ');
      const option = document.createElement('option'); // <option></option>
      option.value = product; // <option value ='product'></option>
      option.innerText = formattedProduct; // <option value ='product'>Product</option>
      selectProductCategory.appendChild(option);
    })

  })
  .catch(err => {
    console.log(`error ${err}`);
  });

const selectProductCategory = document.querySelector('.productType');
selectProductCategory.addEventListener('change', event => {
  product = event.target.value;
  selectedProductCategory = productCategories[product];
})

document.querySelector('.submit').addEventListener('click', function (){
  updateProduct(); // manipulates the DOM
  document.querySelector('.image').classList.remove('hidden');
  document.querySelector('h4').classList.add('hidden');
  document.querySelector('.previous').classList.remove('hidden');
  document.querySelector('.next').classList.remove('hidden');
})

function updateProduct(index = 0) { // selects info for product in index[0] of the array
  document.querySelector('.productName').innerText = selectedProductCategory[index].name;
  document.querySelector('.productImage').src = selectedProductCategory[index].image_link;
  document.querySelector('.productLink').href = selectedProductCategory[index].product_link;
  selectedProductIndex = index;
}

  document.querySelector('.next').addEventListener('click', nextProduct)
	function nextProduct(e){ // increments through the array when > is clicked
		e.preventDefault();
    let currentIndex = selectedProductIndex;
		currentIndex++
		if (currentIndex > selectedProductCategory.length - 1) currentIndex = 0;
    updateProduct(currentIndex);
	};

  document.querySelector('.previous').addEventListener('click', previousProduct)
	function previousProduct(e){ // decrements through the array when < is clicked
		e.preventDefault();
    let currentIndex = selectedProductIndex;
    currentIndex--
		if (currentIndex < 0) currentIndex = selectedProductCategory.length - 1;
    updateProduct(currentIndex);
	};

// Makeup API link: https://www.programmableweb.com/api/makeup-rest-api-v10
// Documentation: https://makeup-api.herokuapp.com/
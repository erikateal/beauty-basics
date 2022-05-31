let product;
let urlChoice;
let allProducts = [];
let productCategories = {
  // "example": [
  //   {label:"product1"}
  // ]
};
let selectedProductCategory = [];
let productArr = [];
let productName = [];
let productImage = [];
let productLink = [];
const url = `/js/products.json`;
// const url = `https://makeup-api.herokuapp.com/api/v1/products.json`;
let selectedProductIndex = 0;

fetch(url)
  .then(res => res.json()) //parse response as JSON
  .then(data => {
    // console.log(data)
    allProducts = data
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
  // urlChoice = `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${product}`;
  selectedProductCategory = productCategories[product];
  // console.log(product);
})

document.querySelector('.submit').addEventListener('click', function (){
  // getProductImage(product, urlChoice);
  updateProduct();
  document.querySelector('.image').classList.remove('hidden');
  document.querySelector('h4').classList.add('hidden');
  document.querySelector('.previous').classList.remove('hidden');
  document.querySelector('.next').classList.remove('hidden');
})

function updateProduct(index = 0) {
  document.querySelector('.productName').innerText = selectedProductCategory[index].name;
  document.querySelector('.productImage').src = selectedProductCategory[index].image_link;
  document.querySelector('.productLink').href = selectedProductCategory[index].product_link;
  selectedProductIndex = index;
}

    document.querySelector('.previous').addEventListener('click', previousProduct)
	function previousProduct(e){
		e.preventDefault();
		// count--
		// if (count < 0) count = data.length - 1;
    let currentIndex = selectedProductIndex;
    currentIndex--
		if (currentIndex < 0) currentIndex = selectedProductCategory.length - 1;
    updateProduct(currentIndex);
	};

	document.querySelector('.next').addEventListener('click', nextProduct)
	function nextProduct(e){
		e.preventDefault();
    let currentIndex = selectedProductIndex;
		currentIndex++
		if (currentIndex > selectedProductCategory.length - 1) currentIndex = 0;
    updateProduct(currentIndex);
	};

// Makeup API link: https://www.programmableweb.com/api/makeup-rest-api-v10
// Documentation: https://makeup-api.herokuapp.com/
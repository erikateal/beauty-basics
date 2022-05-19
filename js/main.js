let product;
let urlChoice;
const url = `https://makeup-api.herokuapp.com/api/v1/products.json`

fetch(url)
  .then(res => res.json()) //parse response as JSON
  .then(data => {
    let array = [];
    for(let i = 0; i < data.length; i++){
      array.push(data[i].product_type) // pushing every element in the product type to an array
    }
    let uniqueProduct = [...new Set(array)]; // creating a new set w/ just the unique values from the array
    uniqueProduct.map(product => {
      product = product[0].toUpperCase() + product.slice(1);
      let formattedProduct = product.replace('_', ' ');
      const option = document.createElement('option') // <option></option>
      option.value = product // <option value ='product'></option>
      option.innerText = formattedProduct // <option value ='product'>Product</option>
      selectProduct.appendChild(option)
    })
  })
  .catch(err => {
    console.log(`error ${err}`)
  });

const selectProduct = document.querySelector('.productType');
selectProduct.addEventListener('change', event => {
  product = event.target.value
  urlChoice = `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${product}`;
  console.log(product);
})

document.querySelector('.submit').addEventListener('click', function (){
  getProductImage(product, urlChoice)
  document.querySelector('.image').classList.remove('hidden')
  document.querySelector('h4').classList.add('hidden')
})

const getProductImage = (value, urlChoice) => {
  fetch(urlChoice)
  .then(res => res.json()) //parse response as JSON
  .then(data => {
    for(let i = 0; i < data.length; i++){
      document.querySelector('.productName').innerText = data[i].name
      document.querySelector('.productImage').src = data[i].image_link
      document.querySelector('.productLink').href = data[i].product_link
    }
    // document.querySelector('.productName').innerText = data[i].name
    // document.querySelector('.productImage').src = data[i].image_link
    // document.querySelector('.productLink').href = data[i].product_link
  })
}


// document.querySelector('.previous').addEventListener('click', previous)

// 	function previous(e){
// 		e.preventDefault();
// 		count--
// 		if (count < 0) count = data.length - 1;
// 		document.querySelector('h2').innerText = data[count].name
// 		document.querySelector('img').src = data[count].image_link
// 		document.querySelector('p').innerText = data[count].product_link
// 	};

// 	document.querySelector('.next').addEventListener('click', next)

// 	function next(e){
// 		e.preventDefault();
// 		count++
// 		if (count > data.length - 1) count = 0;
// 		document.querySelector('h2').innerText = data[count].name
// 		document.querySelector('img').src = data[count].image_link
// 		document.querySelector('p').innerText = data[count].product_link
// 	};


// Makeup API link: https://www.programmableweb.com/api/makeup-rest-api-v10
// Documentation: https://makeup-api.herokuapp.com/

const url1 = `https://makeup-api.herokuapp.com/api/v1/products.json`

fetch(url1)
.then(res => res.json()) // parse response as JSON
.then(data => {
  console.log(data)
})
.catch(err => {
    console.log(`error ${err}`)
});
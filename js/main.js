let product;
let urlChoice;
let count;
let productArr = [];
let productName = [];
let productImage = [];
let productLink = [];
const url = `https://makeup-api.herokuapp.com/api/v1/products.json`

fetch(url)
  .then(res => res.json()) //parse response as JSON
  .then(data => {
    // console.log(data)
    for(let i = 0; i < data.length; i++){
      productArr.push(data[i].product_type) // pushing every element in the product type to an array
    }
    let uniqueProduct = [...new Set(productArr)]; // creating a new set w/ just the unique values from the array
    uniqueProduct.map(product => {
      product = product[0].toUpperCase() + product.slice(1);
      let formattedProduct = product.replace('_', ' ');
      const option = document.createElement('option') // <option></option>
      option.value = product // <option value ='product'></option>
      option.innerText = formattedProduct // <option value ='product'>Product</option>
      selectProduct.appendChild(option)
    })
  //   document.querySelector('.previous').addEventListener('click', previous)
	// function previous(e){
	// 	e.preventDefault();
	// 	count--
	// 	if (count < 0) count = data.length - 1;
	// 	document.querySelector('h2').innerText = productName[count]
	// 	document.querySelector('img').src = productImage[count]
	// 	document.getElementsByClassName('productLink').innerText = productLink[count]
	// };

	// document.querySelector('.next').addEventListener('click', next)
	// function next(e){
	// 	e.preventDefault();
	// 	count++
	// 	if (count > data.length - 1) count = 0;
	// 	document.querySelector('h2').innerText = productName[count]
	// 	document.querySelector('img').src = productImage[count]
	// 	document.getElementsByClassName('productLink').innerText = productLink[count]
	// };
  })
  .catch(err => {
    console.log(`error ${err}`)
  });

const selectProduct = document.querySelector('.productType');
selectProduct.addEventListener('change', event => {
  product = event.target.value
  urlChoice = `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${product}`;
  // console.log(product);
})

document.querySelector('.submit').addEventListener('click', function (){
  getProductImage(product, urlChoice)
  document.querySelector('.image').classList.remove('hidden')
  document.querySelector('h4').classList.add('hidden')
  document.querySelector('.previous').classList.remove('hidden')
  document.querySelector('.next').classList.remove('hidden')
})

const getProductImage = (value, urlChoice) => {
  fetch(urlChoice)
  .then(res => res.json()) //parse response as JSON
  .then(data => {
    for(let i = 0; i < data.length; i++){
      document.querySelector('.productName').innerText = data[i].name
      document.querySelector('.productImage').src = data[i].image_link
      document.querySelector('.productLink').href = data[i].product_link
      // productName.push(data[i].name)
      // productImage.push(data[i].image_link)
      // productLink.push(data[i].product_link)
    }
    // let random = Math.floor(Math.random() * productName.length)
    // document.querySelector('.productName').innerText = productName[random]
    // document.querySelector('.productImage').src = productImage[random]
    // document.querySelector('.productLink').href = productLink[random]
    // console.log(random)
  })
  // console.log(productName)
  // console.log(productImage)
  // console.log(productLink)
}

// Makeup API link: https://www.programmableweb.com/api/makeup-rest-api-v10
// Documentation: https://makeup-api.herokuapp.com/
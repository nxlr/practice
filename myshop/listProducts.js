var shop = require("./node_modules/faker");

for (let index = 0; index < 9; index++) {
    console.log(shop.fake("{{commerce.productName}}, {{commerce.price}}"));   
}

console.log(shop.commerce.price());
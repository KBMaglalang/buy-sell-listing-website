# Buy Sell Listing Website

# Technical Specifications

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- EJS
- SASS
- Morgan
- Express
- Dotenv
- Chalk

# Screenshots

!['homeage'](docs/1-homepage.png)
!['product-page'](docs/2-productPage.png)
!['add-to-favorites'](docs/3-addToFavorites.png)
!['chat-with-seller'](docs/4-chatWithSeller.png)
!['seller's-product-page'](docs/5-sellersProductPage.png)
!['seller-add-new-product'](docs/6-sellerAddNewProduct.png)
!['marked-favorites'](docs/7-makedFavorites.png)
!['favorites-associated-with-another-account'](docs/8-favoritesAssociatedWithAnotherAccount.png)
!['product-price-filtering'](docs/9-productPriceFiltering.png)

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
   - username: `labber`
   - password: `labber`
   - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
   - Check the db folder to see what gets created and seeded in the SDB
6. Run the server: `npm run local`
   - Note: nodemon is used, so you should not have to restart your server
7. Visit `http://localhost:8080/`

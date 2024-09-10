# Carter

**Carter** is a full-stack e-commerce platform that allows users not only to purchase products but also to sell them effortlessly. It provides a seamless experience for both buyers and sellers with robust management tools and functionality.

## Features

### User Features

- **User Authentication**: Secure login system with both basic authentication and OAuth integration.
- **User Dashboard**: Manage orders, profile settings, and more from an intuitive user dashboard.
- **Product Search and Filtering**: Easily find products by searching and filtering based on categories and price.
- **Single & Bulk Purchase**: Option to buy individual products or use the cart system for bulk purchases.
- **Order Cancellation**: Ability to cancel individual product orders.

### Seller Features

- **Seller Dashboard**: Manage products through dedicated seller dashboard.
- **Add New Products**: Effortlessly list new products for sale with detailed descriptions and pricing.
- **Manage Orders**: Sellers can manage customer orders.

## Backend

- **REST API Development**: Built a robust backend to handle the e-commerce workflow.
- **Prisma ORM**: Used for efficient database queries with PostgreSQL.
- **Redis Cache**: Implemented caching for improved performance.
- **Passport.js**: Integrated OAuth for secure login and authorization.
- **Unit Testing**: Comprehensive testing with Jest and Supertest.
- **File Upload**: Support for image/file uploads to third-party cloud storage.
- **Zod**: For type validation and error handling.
- **Password Encryption**: Ensured user data security by encrypting passwords.

## Frontend

- **React Development**: Built the frontend using React and Vite for fast bundling.
- **Component-Based Design**: Modular components for maintainable and reusable code.
- **React Router**: For seamless navigation between different pages.
- **Global State Management**: Managed application state using React Context.
- **Custom Hooks**: Leveraged hooks for cleaner and more refactored code.

## Learning Outcomes

- Mastered REST API development with Prisma and PostgreSQL.
- Implemented caching and optimized performance using Redis.
- Integrated OAuth with Passport.js.
- Strengthened frontend skills with React and custom hooks.
- Improved testing techniques with Jest and Supertest.

## TODO

- Resolve state persistence issue on reload (context not updating).
- Fix bug in cart item deletion functionality.
- Handle cloud-stored images during product updates.
- Implement loader for image uploads.✅
- Improve Redis cache handling during modifications (update cache timeout).
- Payment gateway integration

<!-- - meesage to seller and user mail on purchase and cancel product delivery
- email sendign when user pruchase somehign and showing the pruchased item in the seller dashboard

!IMP
-- the image that is being uploaded are not managed properly
-- need to make some modification to some queries like removing some uncessary fields
-- time of the cache
-- REFACTOR THE QUERY COLMUN DATA
-- meesage to seller mail on purchase and cancel product delivery
-- Need to fix the redis time on differnt routes


have to use lazy loading later for performance optimiZation : code splitting

---

TODO:8/9/2024 (fb)

-loader
-integrate payment gateway

- minor bug in the cart page while deleting state is not being updated

- lazy and infinite scrolling
- react hooks for further opimization

---

 -->

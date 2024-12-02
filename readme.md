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

- **Seller Dashboard**: Manage products through a dedicated seller dashboard.
- **Add New Products**: Effortlessly list new products for sale with detailed descriptions and pricing.
- **Manage Orders**: Sellers can manage customer orders.

## Backend

- **REST API Development**: Built a robust backend to handle the e-commerce workflow.
- **Prisma ORM**: Used for efficient database queries with PostgreSQL.
- **Redis Cache**: Implemented caching for improved performance.
- **Passport.js**: Integrated OAuth for secure login and authorization.
- **File Upload**: Support for image/file uploads to third-party cloud storage.
- **Zod**: For type validation and error handling.
- **Password Encryption**: Ensured user data security by encrypting passwords.
- **Stripe Payment Integration**: Users can make online payments via card.

## Frontend

- **React Development**: Built the frontend using React and Vite for fast bundling.
- **Component-Based Design**: Modular components for maintainable and reusable code.
- **React Router**: For seamless navigation between different pages.
- **Global State Management**: Managed application state using React Context.
- **Custom Hooks**: Leveraged hooks for cleaner and more refactored code.
- **Stripe Payment Integration**: Used Stripe React component for the integration.

## Learning Outcomes

- Mastered REST API development with Prisma and PostgreSQL.
- Implemented caching and optimized performance using Redis.
- Integrated OAuth with Passport.js.
- Strengthened frontend skills with React and custom hooks.
- Learned payment gateway integration and how to deal with online payments.
- Used Docker effectively to containerize the entire application, streamlining development and deployment.

## How to Run the Program

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-repository-link
   cd carter
   ```

2. **Set Up Environment Variables**:

   - Use the provided `.env.example` files for both `client` and `server`.

3. **Run locally**

- Client

```bash

cd client 
npm i&&npm run dev

```

- Server

```bash

cd server 
npm i 
npx prisma migrate deploy
npm run start

```

- Seed Data (seed if you want to see products)

```bash

cd server && npm run seed

```

3. **Run with Docker Compose**:

```bash
docker-compose up --build
```

4. **Access the Application**:

   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8080`
   - Default email: default@gmail.com
   - Default password: 123456

5. **Stop the Application**:

   ```bash
   docker-compose down
   ```

Want to know more about the story behind Carter? Check out my <strong> [detailed blog post](https://codeshaine.bearblog.dev/carter-an-typical-e-commerce-project/) </strong> where I share my journey, challenges, and lessons learned while building this project.

---

<!-- ## TODO

- Bug Major: when there is no product the next button will go to  next in product list page
- Improve Unify the purchase route
- Feature: Payment gateway integration

**improvemetns**
- product list page have mutliple state updating issue uncessary api call is made when the component is mounted


- Feature: add the discount
- Improvements: write review should be moved recommendation section showed in product page instead
- Product update page
- Feature:push notification through web sock (optional)
- Frontend Design changes-
- mulitple product upload
- Lazy loading, useMemo, useCallback,React.memo
- Unit and Integration test (optional)

- have to use lazy loading later for performance optimiZation : code splitting

-->

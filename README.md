# [Project: "Stellar Burgers"](https://bacer.store)

The "Stellar Burgers" project is an educational web-app of a cosmic burger shop, written in TypeScript. It is an interactive platform where users can create their own cosmic burgers, place orders, and track the cooking process.

## Features

- Backend communication via ws and API: The project uses WebSocket and API for backend interaction. This allows for real-time order information updates and ensures fast and smooth application state refreshes.

- Drag'n'Drop: Users can easily build their own cosmic burgers by dragging and dropping various ingredients, thanks to the Drag'n'Drop functionality.

- Routing and protected routes: Routing has been implemented to manage different pages of the application. For instance, some pages, such as the profile page, are accessible only to registered users.

- Registration and profile page: Users can register in the application and create their profile. On the profile page, they can edit their personal information and view their past orders.

- Checkout: Users can select the necessary ingredients for their burger, specify the quantity, add it to the cart, and place an order. They can also view their current cart and edit it before checking out.

- Real-time order feed: Users can see a list of all orders placed in the application in real-time. This allows users to stay informed about fresh orders and follow the cooking process.

## Technologies Used:

- React: A JavaScript library for building user interfaces.
- TypeScript: A statically typed variant of JavaScript that enables error detection during development.
- React-dnd: A library for implementing Drag'n'Drop functionality in React applications.
- Redux: A library for managing application state.
- Jest: A framework for writing tests for JavaScript applications.
- Cypress: A framework for writing end-to-end tests for applications.

## Development

### Prerequisites

Before you begin, make sure you have the following tools installed:

- git (for cloning the repository)
- Node.js (to run the project)

### Installation

1. Clone the repository:
```
git clone https://github.com/LedyBacer/react-stellar-burger.git
```
2. Go to the project folder:
```
cd react-stellar-burger
```
3. Install dependencies:
```
npm install
```
4. Run the project:
```
npm start
```

After completing these steps, your project will be accessible at http://localhost:3000/ in your web browser.

### Deployment

To deploy the project on a server, follow these steps:

1. Build the project for production:
```
npm run build
```

This will create a `build` folder with files optimized for production.

2. Deploy the contents of the build folder on your web server.

For deployment, you can use the services of any hosting provider that supports static sites. Examples include [Netlify](https://www.netlify.com/), [Vercel(https://vercel.com/)], [GitHub Pages(https://pages.github.com/)], and others.

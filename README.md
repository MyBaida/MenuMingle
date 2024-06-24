# MenuMingle

## Description

MenuMingle is an innovative restaurant website designed as a personal project to showcase my web development skills using React and Django. The website enhances the dining experience by allowing customers to scan a QR code specific to their table, view the menu, and place orders online. The system includes a comprehensive admin panel for managing the restaurant's operations.

## Features

### Customer Features

- **QR Code Integration:** Scan a table-specific QR code to access the menu.
- **Menu Display:** Browse through a detailed menu with descriptions and prices.
- **Online Ordering:** Add items to the cart and place orders directly from the website.
- **Category Filtering:** Filter menu items by categories to find specific types of food.

### Admin Features

- **Order Management:** View and manage all orders made by customers.
- **Product Management (CRUD):** Create, read, update, and delete menu items.
- **Category Management (CRUD):** Create, read, update, and delete food categories.
- **Table Management:** Create, read, update, and delete tables and generate specific QR codes for each table.
- **QR Code Generation:** Generate, download, or print QR codes for tables.
- **Customization:** Change the background color of the site.
- **Menu Item Display Styles:** Choose between two different card styles for displaying menu items.
- **User Site Preview:** Preview the user-facing site within the admin panel.

## Technologies Used

- **Front-End:** React
- **Back-End:** Django
- **Database:** SQLite
- **Other Tools:** Git, GitHub

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- Python 3.x
- pip
- Node.js
- npm
- Visual Studio Code (VS Code)

### Installation

Follow these steps to set up the project on your local machine:

1. **Clone the repository**
2. **Open the project in VS Code**

### Backend Setup

1. Navigate to the backend directory: `cd RestaurantMenu`
2. Install backend dependencies: `pip install -r requirements.txt`
3. Run the Django development server: `python manage.py runserver`

### Frontend Setup

1. Open another terminal and navigate to the frontend directory: `cd frontend`
2. Install frontend dependencies: `npm install`
3. Start the React development server: `npm start`

### Access the Application

[Add '/table/tableid' to the localhost url to mimic scanning the qrcode on a table. This will send you to the menu website] (http://localhost:3000/table/1)

**Admin Access:**

[Add '/admin/login' to the localhost url to go to the admin panel] (http://localhost:3000/admin/login)

Login with the following credentials :
- **Email:** admin@gmail.com
- **Password:** admin123

Or, create a superuser using the Django admin interface: `python manage.py createsuperuser`

## Contributing

Feel free to fork this repository and contribute by submitting pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

CREATE TABLE Customer (
    customer_id INT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    address VARCHAR(100),
    phone_number VARCHAR(100)
);

CREATE TABLE Category (
    category_id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE Product (
    product_id INT PRIMARY KEY,
    SKU VARCHAR(100),
    description VARCHAR(100),
    price DECIMAL(10,2),
    stock INT,
    Category_category_id INT,
    FOREIGN KEY (Category_category_id) REFERENCES Category(category_id)
);

CREATE TABLE Cart (
    cart_id INT PRIMARY KEY,
    quantity INT,
    Customer_customer_id INT,
    Product_product_id INT,
    FOREIGN KEY (Customer_customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (Product_product_id) REFERENCES Product(product_id)
);

CREATE TABLE Wishlist (
    wishlist_id INT PRIMARY KEY,
    Customer_customer_id INT,
    Product_product_id INT,
    FOREIGN KEY (Customer_customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (Product_product_id) REFERENCES Product(product_id)
);

CREATE TABLE Payment (
    payment_id INT PRIMARY KEY,
    payment_date DATETIME,
    payment_method VARCHAR(100),
    amount DECIMAL(10,2),
    Customer_customer_id INT,
    FOREIGN KEY (Customer_customer_id) REFERENCES Customer(customer_id)
);

CREATE TABLE Shipment (
    shipment_id INT PRIMARY KEY,
    shipment_date DATETIME,
    address VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(20),
    country VARCHAR(50),
    zip_code VARCHAR(10),
    Customer_customer_id INT,
    FOREIGN KEY (Customer_customer_id) REFERENCES Customer(customer_id)
);

CREATE TABLE `Order` (
    order_id INT PRIMARY KEY,
    order_date DATETIME,
    total_price DECIMAL(10,2),
    Customer_customer_id INT,
    Payment_payment_id INT,
    Shipment_shipment_id INT,
    FOREIGN KEY (Customer_customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (Payment_payment_id) REFERENCES Payment(payment_id),
    FOREIGN KEY (Shipment_shipment_id) REFERENCES Shipment(shipment_id)
);

CREATE TABLE Order_Item (
    order_item_id INT PRIMARY KEY,
    quantity INT,
    price DECIMAL(10,2),
    Product_product_id INT,
    Order_order_id INT,
    FOREIGN KEY (Product_product_id) REFERENCES Product(product_id),
    FOREIGN KEY (Order_order_id) REFERENCES `Order`(order_id)
);

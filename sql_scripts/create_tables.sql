-- Create the Person table
CREATE TABLE Person (
    ID INT PRIMARY KEY,
    First_Name VARCHAR(50),
    Middle_Name VARCHAR(50),
    Last_Name VARCHAR(50),
    Address VARCHAR(255)
);

-- Create the Customer table inheriting from Person
CREATE TABLE Customer (
    ID INT PRIMARY KEY,
    Email VARCHAR(100) NOT NULL,
    Password VARCHAR(64) NOT NULL,
    Registration_Date DATE NOT NULL,
    CONSTRAINT customer_id_fkey
        FOREIGN KEY (ID) 
        REFERENCES Person(ID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- Create the Hotel Chain table
CREATE TABLE Hotel_Chain (
    Chain_ID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Hotel_Amount INT
);

-- Create the Hotel table
CREATE TABLE Hotel (
    Hotel_Name VARCHAR(100) PRIMARY KEY,
    Number_of_Rooms INT NOT NULL,
    Email VARCHAR(100),
    Address VARCHAR(255) NOT NULL,
    Stars INT CHECK (Stars BETWEEN 1 AND 5),
    Phone_Number VARCHAR(20),
    HotelChain_ID INT NOT NULL,
    location VARCHAR(100),
    CONSTRAINT hotel_hotelchain_id_fkey
        FOREIGN KEY (HotelChain_ID) 
        REFERENCES Hotel_Chain(Chain_ID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- Create the Room table
CREATE TABLE Room (
    Room_Number INT NOT NULL,
    Hotel_Name VARCHAR(100) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Capacity INT NOT NULL,
    View_Type VARCHAR(50),
    PRIMARY KEY (Room_Number, Hotel_Name),
    CONSTRAINT room_hotel_name_fkey
        FOREIGN KEY (Hotel_Name) 
        REFERENCES Hotel(Hotel_Name)    
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- Create the Employee table
CREATE TABLE Employee (
    SIN INT PRIMARY KEY CHECK (SIN >= 100000000 AND SIN <= 999999999),
    Email VARCHAR(100) NOT NULL,
    Password VARCHAR(64) NOT NULL,
    Role VARCHAR(50) NOT NULL,
    Hotel_Name VARCHAR(100) NOT NULL,
    CONSTRAINT employee_hotel_name_fkey
        FOREIGN KEY (Hotel_Name) 
        REFERENCES Hotel(Hotel_Name)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    CONSTRAINT employee_sin_fkey
        FOREIGN KEY (SIN)
        REFERENCES Person(ID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- Create the Office table
CREATE TABLE Office (
    Office_ID SERIAL PRIMARY KEY,
    Chain_ID INT NOT NULL,
    Address VARCHAR(255) NOT NULL,
    Email VARCHAR(100),
    Phone_Number VARCHAR(20),
    CONSTRAINT office_chain_id_fkey
        FOREIGN KEY (Chain_ID)
		REFERENCES Hotel_Chain(Chain_ID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE StatusLookup (
    id SERIAL PRIMARY KEY,
    status VARCHAR(255) UNIQUE
);

INSERT INTO StatusLookup (status) VALUES
    ('Complete'),
    ('Scheduled'),
    ('Pending'),
    ('Canceled');

-- Create the Booking table
CREATE TABLE Booking (
    Booking_ID SERIAL PRIMARY KEY,
    Date DATE,
    Check_In DATE NOT NULL,
    Check_Out DATE NOT NULL,
    Customer_Booked INT NOT NULL,
    Room_Booked INT NOT NULL,
    Hotel_Name VARCHAR(100) NOT NULL,
    status_id INT NOT NULL,
    CONSTRAINT booking_status_id_fkey
        FOREIGN KEY (status_id)
        REFERENCES StatusLookup(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    CONSTRAINT booking_customer_booked_fkey
        FOREIGN KEY (Customer_Booked) 
        REFERENCES Customer(ID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    CONSTRAINT booking_room_booked_hotel_name_fkey
        FOREIGN KEY (Room_Booked, Hotel_Name) 
        REFERENCES Room(Room_Number, Hotel_Name)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- Create the Renting table
CREATE TABLE Renting (
    Renting_ID SERIAL PRIMARY KEY,
    Date DATE,
    Check_In DATE NOT NULL,
    Check_Out DATE NOT NULL,
    Customer_ID INT NOT NULL,
    Employee_SIN INT NOT NULL,
    Room_Booked INT NOT NULL,
    Hotel_Name VARCHAR(100) NOT NULL,
    status_id INT NOT NULL,
    CONSTRAINT renting_status_id_fkey
        FOREIGN KEY (status_id)
        REFERENCES StatusLookup(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    CONSTRAINT renting_customer_id_fkey
        FOREIGN KEY (Customer_ID) 
        REFERENCES Customer(ID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    CONSTRAINT renting_employee_sin_fkey
        FOREIGN KEY (Employee_SIN) 
        REFERENCES Employee(SIN)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    CONSTRAINT renting_room_booked_hotel_name_fkeyll
        FOREIGN KEY (Room_Booked, Hotel_Name) 
        REFERENCES Room(Room_Number, Hotel_Name)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- Create the Payment table
CREATE TABLE Payment (
    Payment_ID SERIAL PRIMARY KEY,
    Renting_ID INT NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    Date DATE NOT NULL,
    Payment_Type VARCHAR(50) NOT NULL,
    CONSTRAINT payment_renting_id_fkey
        FOREIGN KEY (Renting_ID) 
        REFERENCES Renting(Renting_ID)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);
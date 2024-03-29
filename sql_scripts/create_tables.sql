-- Create the Person table
CREATE TABLE Person (
    ID SERIAL PRIMARY KEY,
    First_Name VARCHAR(50),
    Middle_Name VARCHAR(50),
    Last_Name VARCHAR(50),
    Address VARCHAR(255)
);

-- Create the Customer table inheriting from Person
CREATE TABLE Customer (
    ID INT PRIMARY KEY,
    Registration_Date DATE,
    FOREIGN KEY (ID) REFERENCES Person(ID)
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
    Address VARCHAR(255),
    Stars INT CHECK (Stars BETWEEN 1 AND 5),
    Phone_Number VARCHAR(20),
    HotelChain_ID INT,
    FOREIGN KEY (HotelChain_ID) REFERENCES Hotel_Chain(Chain_ID)
);

-- Create the Room table
CREATE TABLE Room (
    Room_Number INT,
    Hotel_Name VARCHAR(100),
    Price DECIMAL(10, 2),
    Capacity INT,
    View_Type VARCHAR(50),
    PRIMARY KEY (Room_Number, Hotel_Name),
    FOREIGN KEY (Hotel_Name) REFERENCES Hotel(Hotel_Name)
);

-- Create the Employee table
CREATE TABLE Employee (
    SIN VARCHAR(12) PRIMARY KEY,
    Role VARCHAR(50),
    Hotel_Name VARCHAR(100) NOT NULL,
    FOREIGN KEY (Hotel_Name) REFERENCES Hotel(Hotel_Name)
);

-- Create the Office table
CREATE TABLE Office (
    Office_ID SERIAL PRIMARY KEY,
    Chain_ID INT REFERENCES Hotel_Chain(Chain_ID),
    Address VARCHAR(255),
    Email VARCHAR(100),
    Phone_Number VARCHAR(20)
);

-- Create the Booking table
CREATE TABLE Booking (
    Booking_ID SERIAL PRIMARY KEY,
    Date DATE,
    Check_In DATE,
    Check_Out DATE,
    Customer_Booked INT,
    Room_Booked INT,
    Hotel_Name VARCHAR(100),
    FOREIGN KEY (Customer_Booked) REFERENCES Customer(ID),
    FOREIGN KEY (Room_Booked, Hotel_Name) REFERENCES Room(Room_Number, Hotel_Name)
);

-- Create the Renting table
CREATE TABLE Renting (
    Renting_ID SERIAL PRIMARY KEY,
    Date DATE,
    Check_In DATE,
    Check_Out DATE,
    Customer_ID INT,
    Employee_SIN VARCHAR(12),
    Room_Booked INT,
    Hotel_Name VARCHAR(100),
    FOREIGN KEY (Customer_ID) REFERENCES Customer(ID),
    FOREIGN KEY (Employee_SIN) REFERENCES Employee(SIN),
    FOREIGN KEY (Room_Booked, Hotel_Name) REFERENCES Room(Room_Number, Hotel_Name)
);

-- Create the Payment table
CREATE TABLE Payment (
    Payment_ID SERIAL PRIMARY KEY,
    Renting_ID INT,
    Amount DECIMAL(10, 2),
    Date DATE,
    Payment_Type VARCHAR(50),
    FOREIGN KEY (Renting_ID) REFERENCES Renting(Renting_ID)
);
-- Example data for the Person table
INSERT INTO Person (First_Name, Middle_Name, Last_Name, Address)
VALUES ('John', 'Doe', NULL, '123 Main St'),
       ('Jane', 'Doe', 'Alice', '456 Elm St');

-- Example data for the Customer table
INSERT INTO Customer (ID, Registration_Date)
VALUES (1, '2023-01-15'),
       (2, '2023-02-20');

-- Example data for the Hotel_Chain table
INSERT INTO Hotel_Chain (Name, Hotel_Amount)
VALUES ('Example Chain', 3),
       ('Another Chain', 2);

-- Example data for the Hotel table
INSERT INTO Hotel (Hotel_Name, Number_of_Rooms, Email, Address, Stars, Phone_Number, HotelChain_ID)
VALUES ('Hotel A', 50, 'hotelA@example.com', '123 Main St', 4, '123-456-7890', 1),
       ('Hotel B', 40, 'hotelB@example.com', '456 Elm St', 3, '987-654-3210', 1),
       ('Hotel C', 60, 'hotelC@example.com', '789 Oak St', 5, '456-789-0123', 2);

-- Example data for the Room table
INSERT INTO Room (Room_Number, Hotel_Name, Price, Capacity, View_Type)
VALUES (101, 'Hotel A', 100, 2, 'City View'),
       (102, 'Hotel A', 120, 2, 'City View'),
       (201, 'Hotel B', 90, 2, 'Garden View'),
       (202, 'Hotel B', 110, 2, 'Garden View'),
       (301, 'Hotel C', 150, 4, 'Ocean View'),
       (302, 'Hotel C', 200, 4, 'Ocean View');

-- Example data for the Employee table
INSERT INTO Employee (SIN, Role, Hotel_Name)
VALUES ('123456789', 'Manager', 'Hotel A'),
       ('987654321', 'Receptionist', 'Hotel B'),
       ('456789012', 'Housekeeping', 'Hotel C');

-- Example data for the Office table
INSERT INTO Office (Chain_ID, Address, Email, Phone_Number)
VALUES (1, '123 Central St', 'office@example.com', '123-456-7890'),
       (2, '456 North St', 'office@anotherchain.com', '987-654-3210');

-- Example data for the Booking table
INSERT INTO Booking (Date, Check_In, Check_Out, Customer_Booked, Room_Booked, Hotel_Name)
VALUES ('2023-03-01', '2023-03-10', '2023-03-15', 1, 101, 'Hotel A'),
       ('2023-03-02', '2023-03-12', '2023-03-18', 2, 202, 'Hotel B');

-- Example data for the Renting table
INSERT INTO Renting (Date, Check_In, Check_Out, Customer_ID, Employee_SIN, Room_Booked, Hotel_Name)
VALUES ('2023-04-01', '2023-04-10', '2023-04-15', 1, '123456789', 201, 'Hotel B'),
       ('2023-04-02', '2023-04-12', '2023-04-18', 2, '987654321', 302, 'Hotel C');

-- Example data for the Payment table
INSERT INTO Payment (Renting_ID, Amount, Date, Payment_Type)
VALUES (1, 1200.00, '2023-03-05', 'Credit Card'),
       (2, 1500.00, '2023-04-10', 'Cash');

-- Database Queries
-- Retrieve all customers and their registration dates
SELECT * FROM Customer;

-- Calculate the average number of rooms per hotel
SELECT AVG(Number_of_Rooms) AS Avg_Rooms_Per_Hotel
FROM Hotel;

-- Retrieve all employees who work at hotels with more than 50 rooms
SELECT *
FROM Employee
WHERE Hotel_Name IN (SELECT Hotel_Name FROM Hotel WHERE Number_of_Rooms > 50);

-- Retrieve all bookings with customer information and the associated hotel name
SELECT Booking.*, Customer.*, Hotel.Hotel_Name
FROM Booking
JOIN Customer ON Booking.Customer_Booked = Customer.ID
JOIN Room ON Booking.Room_Booked = Room.Room_Number AND Booking.Hotel_Name = Room.Hotel_Name
JOIN Hotel ON Booking.Hotel_Name = Hotel.Hotel_Name;

-- Database Modification
CREATE OR REPLACE FUNCTION prevent_customer_deletion()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM Booking
        WHERE Customer_Booked = OLD.ID
    ) THEN
        RAISE EXCEPTION 'Cannot delete customer with associated bookings';
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_customer_delete_trigger
BEFORE DELETE ON Customer
FOR EACH ROW
EXECUTE FUNCTION prevent_customer_deletion();

CREATE OR REPLACE FUNCTION enforce_max_rooms_constraint()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM Room WHERE Hotel_Name = NEW.Hotel_Name) >= 100 THEN
        RAISE EXCEPTION 'Cannot add more than 100 rooms to a hotel';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_max_rooms_trigger
BEFORE INSERT ON Room
FOR EACH ROW
EXECUTE FUNCTION enforce_max_rooms_constraint();

-- Database Indexes
CREATE INDEX idx_customer_registration_date ON Customer (Registration_Date);

CREATE INDEX idx_booking_customer_hotel ON Booking (Customer_Booked, Hotel_Name);

CREATE INDEX idx_room_hotel_name ON Room (Hotel_Name);

-- Database Views
CREATE VIEW available_rooms_per_area AS
SELECT Hotel.Address AS Area,
       COUNT(Room.Room_Number) AS Available_Rooms
FROM Hotel
LEFT JOIN Room ON Hotel.Hotel_Name = Room.Hotel_Name
GROUP BY Hotel.Address;

CREATE VIEW aggregated_capacity_per_hotel AS
SELECT Hotel.Hotel_Name,
       SUM(Room.Capacity) AS Aggregated_Capacity
FROM Hotel
LEFT JOIN Room ON Hotel.Hotel_Name = Room.Hotel_Name
GROUP BY Hotel.Hotel_Name;

CREATE VIEW occupancy_rate_per_hotel AS
SELECT Hotel.Hotel_Name,
       COUNT(Booking.Booking_ID) AS Total_Bookings,
       COUNT(Room.Room_Number) AS Total_Rooms,
       (COUNT(Booking.Booking_ID) / COUNT(Room.Room_Number)::numeric) * 100 AS Occupancy_Rate
FROM Hotel
LEFT JOIN Room ON Hotel.Hotel_Name = Room.Hotel_Name
LEFT JOIN Booking ON Room.Room_Number = Booking.Room_Booked AND Hotel.Hotel_Name = Booking.Hotel_Name
GROUP BY Hotel.Hotel_Name;

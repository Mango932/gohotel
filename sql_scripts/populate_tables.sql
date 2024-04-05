-- Example data for the Person table
INSERT INTO Person (ID, First_Name, Middle_Name, Last_Name, Address)
VALUES (1, 'John', 'Doe', NULL, '123 Main St'),
       (2, 'Jane', 'Doe', 'Alice', '456 Elm St'),
       (123456789, 'Jake', 'Doe', 'Alice', '789 Elm St'),
       (987654321, 'Joseph', 'Doe', 'Alice', '753 Elm St'),
       (456789012, 'Jone', 'Doe', 'Alice', '159 Elm St');

-- Example data for the Customer table
INSERT INTO Customer (ID, Email, Password, Registration_Date)
VALUES (1, 'johndoe@example.com', 'password1', '2023-01-15'),
       (2, 'janedoe@example.com', 'password2', '2023-02-20');

-- Example data for the Hotel_Chain table
INSERT INTO Hotel_Chain (Name, Hotel_Amount, Chain_ID)
VALUES ('Holiday In', 1, 2),
        ('TravelFree', 2, 4),
       ('GreatVacation', 3, 3);

-- Example data for the Hotel table
INSERT INTO Hotel (Hotel_Name, Number_of_Rooms, Email, Address, Stars, Phone_Number, HotelChain_ID, location)
VALUES 
    ('Sakura Inn', 40, 'sakura@example.com', '1 Cherry Blossom Ln', 3, '123-456-7890', 2, 'Japan'),
    ('Maple Leaf Hotel', 30, 'mapleleaf@example.com', '10 Maple St', 4, '987-654-3210', 3, 'Canada'),
    ('Golden Gate Lodge', 50, 'goldengate@example.com', '100 Golden Gate Blvd', 5, '456-789-0123', 2, 'United States'),
    ('Tokyo Tower Suites', 25, 'tokyotower@example.com', '2 Tokyo Tower Ave', 4, '111-222-3333', 4, 'Japan'),
    ('Snowy Peaks Resort', 35, 'snowypeaks@example.com', '20 Mountain Rd', 4, '444-555-6666', 2, 'Canada'),
    ('Liberty Hotel', 60, 'liberty@example.com', '30 Liberty St', 5, '777-888-9999', 2, 'United States'),
    ('Cherry Blossom Plaza', 45, 'cherryblossom@example.com', '3 Cherry Blossom Rd', 3, '666-777-8888', 3, 'Japan'),
    ('Rocky Mountain Lodge', 55, 'rockymountain@example.com', '40 Rocky Mountain Dr', 4, '222-333-4444', 3, 'Canada'),
    ('Empire Grand Hotel', 65, 'empiregrand@example.com', '50 Empire Blvd', 5, '999-000-1111', 3, 'United States'),
    ('Mount Fuji Inn', 20, 'mountfuji@example.com', '4 Mount Fuji Ave', 3, '888-999-0000', 2, 'Japan'),
    ('Niagara Falls Hotel', 70, 'niagarafalls@example.com', '60 Falls Blvd', 4, '333-444-5555', 2, 'Canada'),
    ('Statue of Liberty Suites', 75, 'statueofliberty@example.com', '70 Liberty Ave', 5, '000-111-2222', 3, 'United States'),
    ('Hakone Hot Springs Resort', 80, 'hakonehotsprings@example.com', '5 Hot Springs Rd', 4, '111-222-3333', 4, 'Japan'),
    ('Banff Mountain Lodge', 40, 'banffmountain@example.com', '80 Mountain View Dr', 4, '444-555-6666', 2, 'Canada'),
    ('Hollywood Glamour Hotel', 85, 'hollywoodglamour@example.com', '90 Sunset Blvd', 5, '777-888-9999', 3, 'United States'),
    ('Kyoto Castle Inn', 50, 'kyotocastle@example.com', '6 Castle Rd', 3, '666-777-8888', 3, 'Japan'),
    ('Whistler Ski Resort', 55, 'whistler@example.com', '100 Ski Hill Rd', 4, '222-333-4444', 2, 'Canada'),
    ('Times Square Towers', 90, 'timessquare@example.com', '10 Broadway', 5, '999-000-1111', 3, 'United States'),
    ('Osaka Gardens Hotel', 60, 'osakagardens@example.com', '7 Garden Ave', 3, '888-999-0000', 2, 'Japan'),
    ('Montreal Artisan Hotel', 65, 'montrealartisan@example.com', '110 Art St', 4, '333-444-5555', 2, 'Canada');

-- Example data for the Room table
-- Rooms for Sakura Inn
INSERT INTO Room (Room_Number, Hotel_Name, Price, Capacity, View_Type)
VALUES 
    (101, 'Sakura Inn', 100, 2, 'City View'),
    (201, 'Sakura Inn', 120, 2, 'Garden View'),
    (301, 'Sakura Inn', 110, 2, 'Mountain View'),
    (401, 'Sakura Inn', 130, 3, 'Lake View'),
    (501, 'Sakura Inn', 150, 4, 'Ocean View');

-- Rooms for Maple Leaf Hotel
INSERT INTO Room (Room_Number, Hotel_Name, Price, Capacity, View_Type)
VALUES 
    (101, 'Maple Leaf Hotel', 90, 2, 'City View'),
    (201, 'Maple Leaf Hotel', 110, 2, 'Garden View'),
    (301, 'Maple Leaf Hotel', 100, 2, 'Mountain View'),
    (401, 'Maple Leaf Hotel', 120, 3, 'Lake View'),
    (501, 'Maple Leaf Hotel', 140, 4, 'Ocean View');

-- Rooms for Golden Gate Lodge
INSERT INTO Room (Room_Number, Hotel_Name, Price, Capacity, View_Type)
VALUES 
    (101, 'Golden Gate Lodge', 150, 2, 'City View'),
    (201, 'Golden Gate Lodge', 170, 2, 'Garden View'),
    (301, 'Golden Gate Lodge', 160, 3, 'Mountain View'),
    (401, 'Golden Gate Lodge', 180, 3, 'Lake View'),
    (501, 'Golden Gate Lodge', 200, 4, 'Ocean View');

-- Rooms for Tokyo Tower Suites
INSERT INTO Room (Room_Number, Hotel_Name, Price, Capacity, View_Type)
VALUES 
    (101, 'Tokyo Tower Suites', 100, 2, 'City View'),
    (201, 'Tokyo Tower Suites', 120, 2, 'Garden View'),
    (301, 'Tokyo Tower Suites', 110, 3, 'Mountain View'),
    (401, 'Tokyo Tower Suites', 130, 3, 'Lake View'),
    (501, 'Tokyo Tower Suites', 150, 4, 'Ocean View');

-- Rooms for Snowy Peaks Resort
INSERT INTO Room (Room_Number, Hotel_Name, Price, Capacity, View_Type)
VALUES 
    (101, 'Snowy Peaks Resort', 90, 2, 'City View'),
    (201, 'Snowy Peaks Resort', 110, 2, 'Garden View'),
    (301, 'Snowy Peaks Resort', 100, 3, 'Mountain View'),
    (401, 'Snowy Peaks Resort', 120, 3, 'Lake View'),
    (501, 'Snowy Peaks Resort', 140, 4, 'Ocean View');

-- Rooms for Liberty Hotel
INSERT INTO Room (Room_Number, Hotel_Name, Price, Capacity, View_Type)
VALUES 
    (101, 'Liberty Hotel', 100, 2, 'City View'),
    (201, 'Liberty Hotel', 120, 2, 'Garden View'),
    (301, 'Liberty Hotel', 110, 3, 'Mountain View'),
    (401, 'Liberty Hotel', 130, 3, 'Lake View'),
    (501, 'Liberty Hotel', 150, 4, 'Ocean View');

-- Rooms for Cherry Blossom Plaza
INSERT INTO Room (Room_Number, Hotel_Name, Price, Capacity, View_Type)
VALUES 
    (101, 'Cherry Blossom Plaza', 100, 2, 'City View'),
    (201, 'Cherry Blossom Plaza', 120, 2, 'Garden View'),
    (301, 'Cherry Blossom Plaza', 110, 3, 'Mountain View'),
    (401, 'Cherry Blossom Plaza', 130, 3, 'Lake View'),
    (501, 'Cherry Blossom Plaza', 150, 4, 'Ocean View');

-- Rooms for Rocky Mountain Lodge
INSERT INTO Room (Room_Number, Hotel_Name, Price, Capacity, View_Type)
VALUES 
    (101, 'Rocky Mountain Lodge', 100, 2, 'City View'),
    (201, 'Rocky Mountain Lodge', 120, 2, 'Garden View'),
    (301, 'Rocky Mountain Lodge', 110, 3, 'Mountain View'),
    (401, 'Rocky Mountain Lodge', 130, 3, 'Lake View'),
    (501, 'Rocky Mountain Lodge', 150, 4, 'Ocean View');

-- Example data for the Employee table
INSERT INTO Employee (SIN, Email, Password, Role, Hotel_Name)
VALUES (123456789, 'employee1@hotalA.com', 'Epassword1', 'Manager', 'Sakura Inn'),
       (987654321, 'employee1@hotalB.com', 'Epassword2', 'Receptionist', 'Maple Leaf Hotel'),
       (456789012, 'employee1@hotalC.com', 'Epassword3', 'Housekeeping', 'Golden Gate Lodge');

-- Example data for the Office table
INSERT INTO Office (Chain_ID, Address, Email, Phone_Number)
VALUES (3, '123 Central St', 'office@example.com', '123-456-7890'),
    (2, '456 North St', 'office@anotherchain.com', '987-654-3210'),
    (4, '41 left St', 'office@chain.com', '987-342-5235');

-- Example data for the Booking table
INSERT INTO Booking (Date, Check_In, Check_Out, Customer_Booked, Room_Booked, Hotel_Name, status_id)
VALUES ('2023-03-01', '2023-03-10', '2023-03-15', 1, 101, 'Rocky Mountain Lodge', 2),
       ('2023-03-02', '2023-03-12', '2023-03-18', 2, 201, 'Rocky Mountain Lodge', 2);

-- Example data for the Renting table
INSERT INTO Renting (Date, Check_In, Check_Out, Customer_ID, Employee_SIN, Room_Booked, Hotel_Name, status_id)
VALUES ('2023-04-01', '2023-04-10', '2023-04-15', 1, '123456789', 101, 'Sakura Inn', 1),
       ('2023-04-02', '2023-04-12', '2023-04-18', 2, '987654321', 101, 'Maple Leaf Hotel', 1);

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

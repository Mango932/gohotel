-- CreateTable
CREATE TABLE "booking" (
    "booking_id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "check_in" DATE NOT NULL,
    "check_out" DATE NOT NULL,
    "customer_booked" INTEGER,
    "room_booked" INTEGER,
    "hotel_name" VARCHAR(100),
    "status_id" INTEGER,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" INTEGER NOT NULL,
    "registration_date" DATE,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee" (
    "sin" INTEGER NOT NULL,
    "role" VARCHAR(50),
    "hotel_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("sin")
);

-- CreateTable
CREATE TABLE "hotel" (
    "hotel_name" VARCHAR(100) NOT NULL,
    "number_of_rooms" INTEGER NOT NULL,
    "email" VARCHAR(100),
    "address" VARCHAR(255),
    "stars" INTEGER,
    "phone_number" VARCHAR(20),
    "hotelchain_id" INTEGER,

    CONSTRAINT "hotel_pkey" PRIMARY KEY ("hotel_name")
);

-- CreateTable
CREATE TABLE "hotel_chain" (
    "chain_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "hotel_amount" INTEGER,

    CONSTRAINT "hotel_chain_pkey" PRIMARY KEY ("chain_id")
);

-- CreateTable
CREATE TABLE "office" (
    "office_id" SERIAL NOT NULL,
    "chain_id" INTEGER,
    "address" VARCHAR(255),
    "email" VARCHAR(100),
    "phone_number" VARCHAR(20),

    CONSTRAINT "office_pkey" PRIMARY KEY ("office_id")
);

-- CreateTable
CREATE TABLE "payment" (
    "payment_id" SERIAL NOT NULL,
    "renting_id" INTEGER,
    "amount" DECIMAL(10,2),
    "date" DATE,
    "payment_type" VARCHAR(50),

    CONSTRAINT "payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "person" (
    "id" INTEGER NOT NULL,
    "first_name" VARCHAR(50),
    "middle_name" VARCHAR(50),
    "last_name" VARCHAR(50),
    "address" VARCHAR(255),

    CONSTRAINT "person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "renting" (
    "renting_id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "check_in" DATE NOT NULL,
    "check_out" DATE NOT NULL,
    "customer_id" INTEGER,
    "employee_sin" INTEGER,
    "room_booked" INTEGER,
    "hotel_name" VARCHAR(100),
    "status_id" INTEGER,

    CONSTRAINT "renting_pkey" PRIMARY KEY ("renting_id")
);

-- CreateTable
CREATE TABLE "room" (
    "room_number" INTEGER NOT NULL,
    "hotel_name" VARCHAR(100) NOT NULL,
    "price" DECIMAL(10,2),
    "capacity" INTEGER,
    "view_type" VARCHAR(50),

    CONSTRAINT "room_pkey" PRIMARY KEY ("room_number","hotel_name")
);

-- CreateTable
CREATE TABLE "statuslookup" (
    "id" SERIAL NOT NULL,
    "status" VARCHAR(255),

    CONSTRAINT "statuslookup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_booking_customer_hotel" ON "booking"("customer_booked", "hotel_name");

-- CreateIndex
CREATE INDEX "idx_customer_registration_date" ON "customer"("registration_date");

-- CreateIndex
CREATE INDEX "idx_room_hotel_name" ON "room"("hotel_name");

-- CreateIndex
CREATE UNIQUE INDEX "statuslookup_status_key" ON "statuslookup"("status");

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_customer_booked_fkey" FOREIGN KEY ("customer_booked") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_room_booked_hotel_name_fkey" FOREIGN KEY ("room_booked", "hotel_name") REFERENCES "room"("room_number", "hotel_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuslookup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_id_fkey" FOREIGN KEY ("id") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_hotel_name_fkey" FOREIGN KEY ("hotel_name") REFERENCES "hotel"("hotel_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_sin_fkey" FOREIGN KEY ("sin") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel" ADD CONSTRAINT "hotel_hotelchain_id_fkey" FOREIGN KEY ("hotelchain_id") REFERENCES "hotel_chain"("chain_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "office" ADD CONSTRAINT "office_chain_id_fkey" FOREIGN KEY ("chain_id") REFERENCES "hotel_chain"("chain_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_renting_id_fkey" FOREIGN KEY ("renting_id") REFERENCES "renting"("renting_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "renting" ADD CONSTRAINT "renting_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "renting" ADD CONSTRAINT "renting_employee_sin_fkey" FOREIGN KEY ("employee_sin") REFERENCES "employee"("sin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "renting" ADD CONSTRAINT "renting_room_booked_hotel_name_fkey" FOREIGN KEY ("room_booked", "hotel_name") REFERENCES "room"("room_number", "hotel_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "renting" ADD CONSTRAINT "renting_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuslookup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_hotel_name_fkey" FOREIGN KEY ("hotel_name") REFERENCES "hotel"("hotel_name") ON DELETE RESTRICT ON UPDATE CASCADE;


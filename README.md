# Register a car

**RF**
[x] Should be able to register a new car

**RN**
[x] Only admin users can register a new car
[x] Should not be able to register a car if the license plate already exists
[x] Should not be able to modify the license plate if the car already exists
[x] The car must be registered with availability

# List cars

**RF**
[x] Should be able to list all available cars
[x] Should be able to list all available cars filtered by category name
[x] Should be able to list all available cars filtered by brand
[x] Should be able to list all available cars filtered by cars names

**RN**
[] User do not need be logged to see all available cars

# Register a car specification

**RF**
[] Should be able to register a new car specification

**RN**
[] Only admin users can register a new specification
[] Should not be able to register a new specification if the car does not exist
[] Should not be able to register a specification if it already exists for the same car

# Register car images

**RF**

[] Should be able to register a new car image
[] Should be able to list all cars

**RNF**

[] Should use multer for file upload

**RN**

[] User should be able to register more than one image

# Car rental

**RF**
[] Should be able to rent a car

**RNF**

**RN**
[] The minimum time to rent a car must be 1 day (24h)
[] Should not be able to register a new rent if the user already have rented a car
[] Should not be able to register a new rent if the car has already been rented

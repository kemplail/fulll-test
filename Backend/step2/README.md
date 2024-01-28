# Backend - Step 2

## Install dependencies

```sh
npm i
```

## Run the tests

```sh
#Default tests
npm test

#Critical tests
npm run test-critical
```

## Build the app

```sh
npm run build
```

## Commands

```sh
# Run a command :
npm run exec -- <command>

# Commands list :

# Create a fleet
create <userId>

# Register a vehicle
register-vehicle <fleetId> <vehiclePlateNumber>

# Localize a vehicle
localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng>

# Help
help
```

## Commands examples

```sh
# Create a fleet
npm run exec -- create 1

info: The fleet has been created, it has the following ID : 1

# Register a vehicle into the fleet with ID 2
npm run exec -- register-vehicle 1 AB-126-FD

info: The vehicle with the plate number AB-126-FD has been registered in the fleet with the ID 1 !

# Localize the vehicle with plate number AB-126-FD at location { lat: 10; lng: 10 }
npm run exec -- localize-vehicle 1 AB-126-FD 10 10

info: The vehicle with the plate number AB-126-FD has been parked at the following location: { lat: 10, lng: 10 } !
```

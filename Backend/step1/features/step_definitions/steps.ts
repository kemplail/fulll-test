import { Given, Then, When } from '@cucumber/cucumber'
import assert from 'assert'
import { createVehicleHandler } from '../../src/app/handlers/createVehicleHandler'
import { CreateFleetCommand } from '../../src/app/commands/createFleetCommand'
import { createFleetHandler } from '../../src/app/handlers/createFleetHandler'
import { RegisterVehicleIntoFleetCommand } from '../../src/app/commands/registerVehicleIntoFleetCommand'
import { registerVehicleIntoFleetHandler } from '../../src/app/handlers/registerVehicleIntoFleetHandler'
import { Location } from '../../src/domain/location'
import { ParkVehicleIntoLocationCommand } from '../../src/app/commands/parkVehicleIntoLocationCommand'
import { parkVehicleIntoLocationHandler } from '../../src/app/handlers/parkVehicleIntoLocationHandler'
import { checkIfVehicleIsPartOfAFleetHandler } from '../../src/app/handlers/checkIfVehicleIsPartOfAFleetHandler'
import { CheckIfAVehicleIsPartOfAFleetQuery } from '../../src/app/queries/checkIfVehicleIsPartOfAFleetQuery'
import { GetLocationOfAVehicleQuery } from '../../src/app/queries/getLocationOfAVehicleQuery'
import { getLocationOfAVehicleHandler } from '../../src/app/handlers/getLocationOfAVehicleHandler'
import { CreateVehicleCommand } from '../../src/app/commands/createVehicleCommand'
import { Fleet } from '../../src/domain/fleet'

type FleetInformations = {
    ownerId: number
}

type RegisterInformations = {
    fleetId: number
    plateNumber: string
}

type ParkInformations = {
    plateNumber: string
    location: Location
}

export const TEST_OWNER_ID: number = 99
export const TEST_OTHER_OWNER_ID: number = 100
export const TEST_PLATE_NUMBER: string = 'A-202'
const TEST_LOCATION_LAT: number = 49
const TEST_LOCATION_LNG: number = -10

Given('my fleet', async function () {
    const fleetInformations: FleetInformations = {
        ownerId: TEST_OWNER_ID,
    }

    const createFleetCommand = new CreateFleetCommand(fleetInformations.ownerId)

    const createdFleet: Fleet =
        await createFleetHandler.handle(createFleetCommand)

    this.fleetId = createdFleet.getId()
})

Given('a vehicle', async function () {
    const plateNumber: string = TEST_PLATE_NUMBER

    const createVehicleCommand = new CreateVehicleCommand(plateNumber)

    await createVehicleHandler.handle(createVehicleCommand)
})

Given('I have registered this vehicle into my fleet', async function () {
    const registerInformations: RegisterInformations = {
        fleetId: this.fleetId,
        plateNumber: TEST_PLATE_NUMBER,
    }

    const registerVehicleIntoFleetCommand = new RegisterVehicleIntoFleetCommand(
        registerInformations.plateNumber,
        registerInformations.fleetId
    )

    await registerVehicleIntoFleetHandler.handle(
        registerVehicleIntoFleetCommand
    )
})

Given('the fleet of another user', async function () {
    const fleetInformations: FleetInformations = {
        ownerId: TEST_OTHER_OWNER_ID,
    }

    const createFleetCommand = new CreateFleetCommand(fleetInformations.ownerId)

    const createdFleet = await createFleetHandler.handle(createFleetCommand)
    this.otherFleetId = createdFleet.getId()
})

Given(
    "this vehicle has been registered into the other user's fleet",
    async function () {
        const registerInformations: RegisterInformations = {
            fleetId: this.otherFleetId,
            plateNumber: TEST_PLATE_NUMBER,
        }

        const registerVehicleIntoFleetCommand =
            new RegisterVehicleIntoFleetCommand(
                registerInformations.plateNumber,
                registerInformations.fleetId
            )

        await registerVehicleIntoFleetHandler.handle(
            registerVehicleIntoFleetCommand
        )
    }
)

Given('a location', function () {
    this.location = new Location(TEST_LOCATION_LAT, TEST_LOCATION_LNG)
})

Given('my vehicle has been parked into this location', async function () {
    const parkInformations: ParkInformations = {
        plateNumber: TEST_PLATE_NUMBER,
        location: this.location,
    }

    const parkVehicleIntoLocationCommand = new ParkVehicleIntoLocationCommand(
        parkInformations.plateNumber,
        parkInformations.location
    )

    await parkVehicleIntoLocationHandler.handle(parkVehicleIntoLocationCommand)
})

When('I park my vehicle at this location', async function () {
    const parkInformations: ParkInformations = {
        plateNumber: TEST_PLATE_NUMBER,
        location: this.location,
    }

    const parkVehicleIntoLocationCommand = new ParkVehicleIntoLocationCommand(
        parkInformations.plateNumber,
        parkInformations.location
    )

    try {
        await parkVehicleIntoLocationHandler.handle(
            parkVehicleIntoLocationCommand
        )
    } catch (error) {
        this.error = error
    }
})

When('I try to register this vehicle into my fleet', async function () {
    const registerInformations: RegisterInformations = {
        fleetId: this.fleetId,
        plateNumber: TEST_PLATE_NUMBER,
    }

    const registerVehicleIntoFleetCommand = new RegisterVehicleIntoFleetCommand(
        registerInformations.plateNumber,
        registerInformations.fleetId
    )

    try {
        await registerVehicleIntoFleetHandler.handle(
            registerVehicleIntoFleetCommand
        )
    } catch (error) {
        this.error = error
    }
})

When('I register this vehicle into my fleet', async function () {
    const registerInformations: RegisterInformations = {
        fleetId: this.fleetId,
        plateNumber: TEST_PLATE_NUMBER,
    }

    const registerVehicleIntoFleetCommand = new RegisterVehicleIntoFleetCommand(
        registerInformations.plateNumber,
        registerInformations.fleetId
    )

    await registerVehicleIntoFleetHandler.handle(
        registerVehicleIntoFleetCommand
    )
})

When('I try to park my vehicle at this location', async function () {
    const parkInformations: ParkInformations = {
        plateNumber: TEST_PLATE_NUMBER,
        location: this.location,
    }

    const parkVehicleIntoLocationCommand = new ParkVehicleIntoLocationCommand(
        parkInformations.plateNumber,
        parkInformations.location
    )

    try {
        await parkVehicleIntoLocationHandler.handle(
            parkVehicleIntoLocationCommand
        )
    } catch (error) {
        this.error = error
    }
})

Then('this vehicle should be part of my vehicle fleet', async function () {
    const vehicleInFleetInformations: { plateNumber: string; fleetId: number } =
        {
            plateNumber: TEST_PLATE_NUMBER,
            fleetId: this.fleetId,
        }

    const checkIfVehicleIsPartOfAFleetQuery =
        new CheckIfAVehicleIsPartOfAFleetQuery(
            vehicleInFleetInformations.fleetId,
            vehicleInFleetInformations.plateNumber
        )

    const fleetContainsVehicle =
        await checkIfVehicleIsPartOfAFleetHandler.handle(
            checkIfVehicleIsPartOfAFleetQuery
        )

    assert.strictEqual(fleetContainsVehicle, true)
})

Then(
    'the known location of my vehicle should verify this location',
    async function () {
        const plateNumber: string = TEST_PLATE_NUMBER

        const getLocationOfAVehicleQuery = new GetLocationOfAVehicleQuery(
            plateNumber
        )

        const locationOfTheVehicle = await getLocationOfAVehicleHandler.handle(
            getLocationOfAVehicleQuery
        )

        assert.deepStrictEqual(locationOfTheVehicle, this.location)
    }
)

Then(
    'I should be informed that my vehicle is already parked at this location',
    function () {
        assert(
            this.error instanceof Error,
            'The car is already parked in the indicated location'
        )
    }
)

Then(
    'I should be informed this this vehicle has already been registered into my fleet',
    function () {
        assert(
            this.error instanceof Error,
            'The vehicle is already in the fleet'
        )
    }
)

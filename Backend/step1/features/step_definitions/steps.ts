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

export const TEST_OWNER_ID: number = 99
export const TEST_OTHER_OWNER_ID: number = 100
export const TEST_PLATE_NUMBER: string = 'A-202'
const TEST_LOCATION_LAT: number = 49
const TEST_LOCATION_LNG: number = -10

Given('my fleet', async function () {
    const createFleetCommand: CreateFleetCommand = new CreateFleetCommand(
        TEST_OWNER_ID
    )

    const createdFleet: Fleet =
        await createFleetHandler.handle(createFleetCommand)

    this.fleetId = createdFleet.getId()
})

Given('a vehicle', async function () {
    const createVehicleCommand: CreateVehicleCommand = new CreateVehicleCommand(
        TEST_PLATE_NUMBER
    )

    await createVehicleHandler.handle(createVehicleCommand)
})

Given('I have registered this vehicle into my fleet', async function () {
    const registerVehicleIntoFleetCommand: RegisterVehicleIntoFleetCommand =
        new RegisterVehicleIntoFleetCommand(TEST_PLATE_NUMBER, this.fleetId)

    await registerVehicleIntoFleetHandler.handle(
        registerVehicleIntoFleetCommand
    )
})

Given('the fleet of another user', async function () {
    const createFleetCommand: CreateFleetCommand = new CreateFleetCommand(
        TEST_OTHER_OWNER_ID
    )

    const createdFleet: Fleet =
        await createFleetHandler.handle(createFleetCommand)

    this.otherFleetId = createdFleet.getId()
})

Given(
    "this vehicle has been registered into the other user's fleet",
    async function () {
        const registerVehicleIntoFleetCommand: RegisterVehicleIntoFleetCommand =
            new RegisterVehicleIntoFleetCommand(
                TEST_PLATE_NUMBER,
                this.otherFleetId
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
    const parkVehicleIntoLocationCommand: ParkVehicleIntoLocationCommand =
        new ParkVehicleIntoLocationCommand(TEST_PLATE_NUMBER, this.location)

    await parkVehicleIntoLocationHandler.handle(parkVehicleIntoLocationCommand)
})

When('I park my vehicle at this location', async function () {
    const parkVehicleIntoLocationCommand: ParkVehicleIntoLocationCommand =
        new ParkVehicleIntoLocationCommand(TEST_PLATE_NUMBER, this.location)

    try {
        await parkVehicleIntoLocationHandler.handle(
            parkVehicleIntoLocationCommand
        )
    } catch (error) {
        this.error = error
    }
})

When('I try to register this vehicle into my fleet', async function () {
    const registerVehicleIntoFleetCommand: RegisterVehicleIntoFleetCommand =
        new RegisterVehicleIntoFleetCommand(TEST_PLATE_NUMBER, this.fleetId)

    try {
        await registerVehicleIntoFleetHandler.handle(
            registerVehicleIntoFleetCommand
        )
    } catch (error) {
        this.error = error
    }
})

When('I register this vehicle into my fleet', async function () {
    const registerVehicleIntoFleetCommand: RegisterVehicleIntoFleetCommand =
        new RegisterVehicleIntoFleetCommand(TEST_PLATE_NUMBER, this.fleetId)

    await registerVehicleIntoFleetHandler.handle(
        registerVehicleIntoFleetCommand
    )
})

When('I try to park my vehicle at this location', async function () {
    const parkVehicleIntoLocationCommand: ParkVehicleIntoLocationCommand =
        new ParkVehicleIntoLocationCommand(TEST_PLATE_NUMBER, this.location)

    try {
        await parkVehicleIntoLocationHandler.handle(
            parkVehicleIntoLocationCommand
        )
    } catch (error) {
        this.error = error
    }
})

Then('this vehicle should be part of my vehicle fleet', async function () {
    const checkIfVehicleIsPartOfAFleetQuery: CheckIfAVehicleIsPartOfAFleetQuery =
        new CheckIfAVehicleIsPartOfAFleetQuery(this.fleetId, TEST_PLATE_NUMBER)

    const fleetContainsVehicle: boolean =
        await checkIfVehicleIsPartOfAFleetHandler.handle(
            checkIfVehicleIsPartOfAFleetQuery
        )

    assert.strictEqual(fleetContainsVehicle, true)
})

Then(
    'the known location of my vehicle should verify this location',
    async function () {
        const getLocationOfAVehicleQuery: GetLocationOfAVehicleQuery =
            new GetLocationOfAVehicleQuery(TEST_PLATE_NUMBER)

        const locationOfTheVehicle: Location | undefined =
            await getLocationOfAVehicleHandler.handle(
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

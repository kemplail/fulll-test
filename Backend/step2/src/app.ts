import { program } from '@caporal/core'
import { CreateFleetCommand } from './app/commands/createFleetCommand'
import { createFleetHandler } from './app/handlers/createFleetHandler'
import { Fleet } from './domain/fleet'
import { registerVehicleIntoFleetHandler } from './app/handlers/registerVehicleIntoFleetHandler'
import { RegisterVehicleIntoFleetCommand } from './app/commands/registerVehicleIntoFleetCommand'
import { CheckIfAVehicleIsPartOfAFleetQuery } from './app/queries/checkIfVehicleIsPartOfAFleetQuery'
import { checkIfVehicleIsPartOfAFleetHandler } from './app/handlers/checkIfVehicleIsPartOfAFleetHandler'
import { ParkVehicleIntoLocationCommand } from './app/commands/parkVehicleIntoLocationCommand'
import { Location } from './domain/location'
import { parkVehicleIntoLocationHandler } from './app/handlers/parkVehicleIntoLocationHandler'

program
    .command('create', 'Create a fleet of vehicles')
    .argument('<userId>', 'Fleet owner ID', {
        validator: program.NUMBER,
    })
    .action(async ({ logger, args }) => {
        const userId: number = Number(args.userId)

        const createFleetCommand: CreateFleetCommand = new CreateFleetCommand(
            userId
        )

        const createdFleet: Fleet =
            await createFleetHandler.handle(createFleetCommand)

        logger.info(
            `The fleet has been created, it has the following ID : ${createdFleet.getId()}`
        )
    })

program
    .command('register-vehicle', 'Create a fleet of vehicles')
    .argument('<fleetId>', 'Fleet owner ID', {
        validator: program.NUMBER,
    })
    .argument('<vehiclePlateNumber>', 'Vehicle plate number', {
        validator: program.STRING,
    })
    .action(async ({ logger, args }) => {
        const fleetId: number = Number(args.fleetId)
        const vehiclePlateNumber: string = String(args.vehiclePlateNumber)

        const registerVehicleIntoFleetCommand: RegisterVehicleIntoFleetCommand =
            new RegisterVehicleIntoFleetCommand(vehiclePlateNumber, fleetId)

        await registerVehicleIntoFleetHandler.handle(
            registerVehicleIntoFleetCommand
        )

        logger.info(
            `The vehicle with the plate number ${vehiclePlateNumber} has been registered in the fleet with the ID ${fleetId} !`
        )
    })

program
    .command('localize-vehicle', 'Park a vehicle belonging to a given fleet')
    .argument('<fleetId>', 'Fleet owner ID', { validator: program.NUMBER })
    .argument('<vehiclePlateNumber>', 'Vehicle plate number', {
        validator: program.STRING,
    })
    .argument('<lat>', 'Latitude of car location', {
        validator: program.NUMBER,
    })
    .argument('<lng>', 'Longitude of car location', {
        validator: program.NUMBER,
    })
    .action(async ({ logger, args }) => {
        const fleetId: number = Number(args.fleetId)
        const vehiclePlateNumber: string = String(args.vehiclePlateNumber)
        const lat: number = Number(args.lat)
        const lng: number = Number(args.lng)

        const checkIfVehicleIsPartOfAFleetQuery: CheckIfAVehicleIsPartOfAFleetQuery =
            new CheckIfAVehicleIsPartOfAFleetQuery(fleetId, vehiclePlateNumber)

        const fleetContainsVehicle: boolean =
            await checkIfVehicleIsPartOfAFleetHandler.handle(
                checkIfVehicleIsPartOfAFleetQuery
            )

        if (!fleetContainsVehicle) {
            logger.error("The indicated fleet doesn't own the vehicle")
            return
        }

        const parkVehicleIntoLocationCommand: ParkVehicleIntoLocationCommand =
            new ParkVehicleIntoLocationCommand(
                vehiclePlateNumber,
                new Location(lat, lng)
            )

        await parkVehicleIntoLocationHandler.handle(
            parkVehicleIntoLocationCommand
        )

        logger.info(
            `The vehicle with the plate number ${vehiclePlateNumber} has been parked at the following location: [ lat: ${lat} ; lng: ${lng} ] !`
        )
    })

program.run()

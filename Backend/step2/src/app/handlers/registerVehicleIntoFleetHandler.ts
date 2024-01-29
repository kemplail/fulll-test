import { Fleet } from '../../domain/fleet'
import { Vehicle } from '../../domain/vehicle'
import { CreateVehicleDto } from '../../infra/dtos/createVehicleDto'
import { FleetRepository, fleetRepository } from '../../infra/fleetRepository'
import {
    VehicleRepository,
    vehicleRepository,
} from '../../infra/vehicleRepository'
import { RegisterVehicleIntoFleetCommand } from '../commands/registerVehicleIntoFleetCommand'

export class RegisterVehicleIntoFleetHandler {
    private vehicleRepository: VehicleRepository
    private fleetRepository: FleetRepository

    constructor(
        vehicleRepository: VehicleRepository,
        fleetRepository: FleetRepository
    ) {
        this.vehicleRepository = vehicleRepository
        this.fleetRepository = fleetRepository
    }

    async handle(command: RegisterVehicleIntoFleetCommand) {
        const fleet: Fleet | undefined = await this.fleetRepository.findById(
            command.fleetId
        )

        if (!fleet) {
            throw new Error('Unable to retrieve the requested fleet')
        }

        let vehicle: Vehicle | undefined =
            await this.vehicleRepository.findByPlateNumber(command.plateNumber)

        if (!vehicle) {
            vehicle = await vehicleRepository.createVehicle(
                new CreateVehicleDto(command.plateNumber)
            )
        }

        fleet.addVehicle(vehicle)

        await this.fleetRepository.registerVehicle(
            command.plateNumber,
            command.fleetId
        )

        return fleet
    }
}

export const registerVehicleIntoFleetHandler: RegisterVehicleIntoFleetHandler =
    new RegisterVehicleIntoFleetHandler(vehicleRepository, fleetRepository)

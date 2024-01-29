import { Vehicle } from '../../domain/vehicle'
import {
    VehicleRepository,
    vehicleRepository,
} from '../../infra/vehicleRepository'
import { ParkVehicleIntoLocationCommand } from '../commands/parkVehicleIntoLocationCommand'

export class ParkVehicleIntoLocationHandler {
    private vehicleRepository: VehicleRepository

    constructor(vehicleRepository: VehicleRepository) {
        this.vehicleRepository = vehicleRepository
    }

    async handle(command: ParkVehicleIntoLocationCommand) {
        const vehicle: Vehicle | undefined =
            await this.vehicleRepository.findByPlateNumber(command.plateNumber)

        if (!vehicle) {
            throw new Error('Unable to retrieve the requested vehicle')
        }

        vehicle.setLocation(command.location)

        await this.vehicleRepository.localizeVehicle(
            command.plateNumber,
            command.location
        )

        return vehicle
    }
}

export const parkVehicleIntoLocationHandler: ParkVehicleIntoLocationHandler =
    new ParkVehicleIntoLocationHandler(vehicleRepository)

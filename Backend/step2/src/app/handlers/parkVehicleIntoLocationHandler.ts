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
        const vehicle = await this.vehicleRepository.findByPlateNumber(
            command.plateNumber
        )

        if (!vehicle) {
            throw new Error('Unable to retrieve the requested vehicle')
        }

        vehicle.setLocation(command.location)

        this.vehicleRepository.localizeVehicle(
            command.plateNumber,
            command.location
        )

        return vehicle
    }
}

export const parkVehicleIntoLocationHandler =
    new ParkVehicleIntoLocationHandler(vehicleRepository)

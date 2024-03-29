import { Vehicle } from '../../domain/vehicle'
import {
    VehicleRepository,
    vehicleRepository,
} from '../../infra/vehicleRepository'
import { CreateVehicleCommand } from '../commands/createVehicleCommand'

export class CreateVehicleHandler {
    private vehicleRepository: VehicleRepository

    constructor(vehicleRepository: VehicleRepository) {
        this.vehicleRepository = vehicleRepository
    }

    handle(command: CreateVehicleCommand) {
        const vehicle: Vehicle = new Vehicle(command.plateNumber)

        return this.vehicleRepository.save(vehicle)
    }
}

export const createVehicleHandler: CreateVehicleHandler =
    new CreateVehicleHandler(vehicleRepository)

import { Vehicle } from '../../domain/vehicle'
import { CreateVehicleDto } from '../../infra/dtos/createVehicleDto'
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

    async handle(command: CreateVehicleCommand) {
        const existingVehicle: Vehicle | undefined =
            await vehicleRepository.findByPlateNumber(command.plateNumber)

        if (existingVehicle) {
            throw new Error(
                'A vehicle with the same plate number already exists'
            )
        }

        const createVehicleDto: CreateVehicleDto = new CreateVehicleDto(
            command.plateNumber
        )

        return this.vehicleRepository.createVehicle(createVehicleDto)
    }
}

export const createVehicleHandler: CreateVehicleHandler =
    new CreateVehicleHandler(vehicleRepository)

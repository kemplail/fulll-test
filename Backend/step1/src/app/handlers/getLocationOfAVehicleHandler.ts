import { Vehicle } from '../../domain/vehicle'
import {
    VehicleRepository,
    vehicleRepository,
} from '../../infra/vehicleRepository'
import { GetLocationOfAVehicleQuery } from '../queries/getLocationOfAVehicleQuery'

export class GetLocationOfAVehicleHandler {
    private vehicleRepository: VehicleRepository

    constructor(vehicleRepository: VehicleRepository) {
        this.vehicleRepository = vehicleRepository
    }

    async handle(command: GetLocationOfAVehicleQuery) {
        const vehicle: Vehicle | undefined =
            await this.vehicleRepository.findByPlateNumber(command.plateNumber)

        if (!vehicle) {
            throw new Error('Unable to retrieve the requested vehicle')
        }

        return vehicle.getLocation()
    }
}

export const getLocationOfAVehicleHandler: GetLocationOfAVehicleHandler =
    new GetLocationOfAVehicleHandler(vehicleRepository)

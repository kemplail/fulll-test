import { Fleet } from '../../domain/fleet'
import { Vehicle } from '../../domain/vehicle'
import { FleetRepository, fleetRepository } from '../../infra/fleetRepository'
import {
    VehicleRepository,
    vehicleRepository,
} from '../../infra/vehicleRepository'
import { CheckIfAVehicleIsPartOfAFleetQuery } from '../queries/checkIfVehicleIsPartOfAFleetQuery'

export class CheckIfVehicleIsPartOfAFleetHandler {
    private fleetRepository: FleetRepository
    private vehicleRepository: VehicleRepository

    constructor(
        fleetRepository: FleetRepository,
        vehicleRepository: VehicleRepository
    ) {
        this.fleetRepository = fleetRepository
        this.vehicleRepository = vehicleRepository
    }

    async handle(command: CheckIfAVehicleIsPartOfAFleetQuery) {
        const fleet: Fleet | undefined = await this.fleetRepository.findById(
            command.fleetId
        )

        if (!fleet) {
            throw new Error('Unable to retrieve the requested fleet')
        }

        const vehicle: Vehicle | undefined =
            await this.vehicleRepository.findByPlateNumber(
                command.vehiclePlateNumber
            )

        if (!vehicle) {
            throw new Error('Unable to retrieve the requested vehicle')
        }

        return fleet.hasVehicle(vehicle)
    }
}

export const checkIfVehicleIsPartOfAFleetHandler: CheckIfVehicleIsPartOfAFleetHandler =
    new CheckIfVehicleIsPartOfAFleetHandler(fleetRepository, vehicleRepository)

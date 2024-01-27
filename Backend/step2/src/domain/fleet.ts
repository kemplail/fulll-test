import { Model } from './model'
import { Vehicle } from './vehicle'

export class Fleet extends Model {
    private vehicles: Vehicle[]
    private ownerId: number

    constructor(id: number, ownerId: number, vehicles: Vehicle[] = []) {
        super(id)
        this.ownerId = ownerId
        this.vehicles = vehicles
    }

    getVehicles(): Vehicle[] {
        return this.vehicles
    }

    getOwnerId(): number {
        return this.ownerId
    }

    hasVehicle(searchedVehicule: Vehicle): boolean {
        return this.vehicles.some(
            (vehicle: Vehicle) =>
                vehicle.getPlateNumber() === searchedVehicule.getPlateNumber()
        )
    }

    removeVehicle(vehicleToRemove: Vehicle) {
        const indexOfVehicleToRemove = this.vehicles.findIndex(
            (vehicle) =>
                vehicle.getPlateNumber() === vehicleToRemove.getPlateNumber()
        )

        if (indexOfVehicleToRemove !== -1) {
            this.vehicles.splice(indexOfVehicleToRemove, 1)
        }
    }

    addVehicle(vehicleToAdd: Vehicle) {
        if (this.hasVehicle(vehicleToAdd)) {
            throw new Error('The vehicle is already in the fleet')
        }

        this.vehicles.push(vehicleToAdd)
    }
}

import { Model } from './model'
import { Vehicle } from './vehicle'

export class Fleet extends Model {
    private static counter: number = 0

    private vehicles: Vehicle[]
    private ownerId: number

    constructor(ownerId: number) {
        Fleet.counter++
        super(Fleet.counter)
        this.ownerId = ownerId
        this.vehicles = []
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

    addVehicle(vehicleToAdd: Vehicle) {
        if (this.hasVehicle(vehicleToAdd)) {
            throw new Error('The vehicle is already in the fleet')
        }

        this.vehicles.push(vehicleToAdd)
    }
}

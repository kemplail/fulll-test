import { Location } from './location'
import { Model } from './model'

export class Vehicle extends Model {
    private plateNumber: string
    private location: Location | undefined

    constructor(id: number, plateNumber: string, location?: Location) {
        super(id)
        this.plateNumber = plateNumber
        this.location = location
    }

    setLocation(location: Location) {
        if (this.location && this.location.isEqual(location)) {
            throw new Error(
                'The car is already parked in the indicated location'
            )
        }

        this.location = location
    }

    getLocation(): Location | undefined {
        return this.location
    }

    getPlateNumber(): string {
        return this.plateNumber
    }
}

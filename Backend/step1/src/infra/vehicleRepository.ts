import { Vehicle } from '../domain/vehicle'
import { Repository } from './repository'

export class VehicleRepository extends Repository<Vehicle> {
    async findByPlateNumber(plateNumber: string): Promise<Vehicle | undefined> {
        return this.data.find(
            (element: Vehicle) => element.getPlateNumber() === plateNumber
        )
    }

    async save(elementToSave: Vehicle): Promise<Vehicle> {
        const searchedElementIndex: number = this.data.findIndex(
            (element: Vehicle) =>
                element.getPlateNumber() === elementToSave.getPlateNumber()
        )

        if (searchedElementIndex !== -1) {
            this.replace(elementToSave, searchedElementIndex)
        } else {
            this.insert(elementToSave)
        }

        return elementToSave
    }
}

export const vehicleRepository: VehicleRepository = new VehicleRepository()

import { Location } from '../domain/location'
import { Vehicle } from '../domain/vehicle'
import { database } from './database'
import { CreateVehicleDto } from './dtos/createVehicleDto'

export type VehicleRow = {
    ID: number
    plate_number: string
    location_latitude: number
    location_longitude: number
}

export class VehicleRepository {
    async findByPlateNumber(plateNumber: string): Promise<Vehicle | undefined> {
        return new Promise((resolve, reject) => {
            database.get(
                'SELECT * FROM vehicles WHERE plate_number = ?',
                [plateNumber],
                (err, row: VehicleRow) => {
                    if (err) {
                        reject(err)
                    } else {
                        if (!row) {
                            resolve(undefined)
                        } else {
                            resolve(
                                new Vehicle(
                                    row.ID,
                                    row.plate_number,
                                    new Location(
                                        row.location_latitude,
                                        row.location_longitude
                                    )
                                )
                            )
                        }
                    }
                }
            )
        })
    }

    async createVehicle(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
        return new Promise((resolve, reject) => {
            const stmt = database.prepare(
                'INSERT INTO vehicles (plate_number, location_latitude, location_longitude) VALUES (?, ?, ?)'
            )
            stmt.run(
                [createVehicleDto.plateNumber, null, null],
                function (err: Error) {
                    if (err) {
                        reject(err)
                    } else {
                        const lastInsertedId: number = this.lastID
                        resolve(
                            new Vehicle(
                                lastInsertedId,
                                createVehicleDto.plateNumber
                            )
                        )
                    }
                    stmt.finalize()
                }
            )
        })
    }

    async localizeVehicle(
        plateNumber: string,
        location: Location
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            const stmt = database.prepare(
                'UPDATE vehicles SET location_latitude = ?, location_longitude = ? WHERE plate_number = ?'
            )
            stmt.run(
                [location.getLatitude(), location.getLongitude(), plateNumber],
                function (err: Error) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                    stmt.finalize()
                }
            )
        })
    }

    async deleteByPlateNumber(plateNumber: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const stmt = database.prepare(
                'DELETE FROM vehicles WHERE plate_number = ?'
            )
            stmt.run(plateNumber, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
                stmt.finalize()
            })
        })
    }
}

export const vehicleRepository: VehicleRepository = new VehicleRepository()

import { Fleet } from '../domain/fleet'
import { Location } from '../domain/location'
import { Vehicle } from '../domain/vehicle'
import { database } from './database'
import { CreateFleetDto } from './dtos/createFleetDto'

export class FleetRepository {
    async findById(id: number): Promise<Fleet | undefined> {
        return new Promise((resolve, reject) => {
            database.get(
                'SELECT * FROM fleets WHERE id = ?',
                [id],
                async (err, row: { ID: number; owner_id: number }) => {
                    if (err) {
                        reject(err)
                    } else {
                        if (!row) {
                            resolve(undefined)
                        } else {
                            resolve(
                                new Fleet(
                                    row.ID,
                                    row.owner_id,
                                    await this.getAllVehiclesOfAFleet(row.ID)
                                )
                            )
                        }
                    }
                }
            )
        })
    }

    async createFleet(createFleetDto: CreateFleetDto): Promise<Fleet> {
        return new Promise((resolve, reject) => {
            const stmt = database.prepare(
                'INSERT INTO fleets (owner_id) VALUES (?)'
            )
            stmt.run([createFleetDto.ownerId], function (err: Error) {
                if (err) {
                    reject(err)
                } else {
                    const lastInsertedId: number = this.lastID
                    resolve(new Fleet(lastInsertedId, createFleetDto.ownerId))
                }
                stmt.finalize()
            })
        })
    }

    async registerVehicle(plateNumber: string, fleetId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const stmt = database.prepare(
                'INSERT INTO j_vehicule_fleet (plate_number, fleet_id) VALUES (?, ?)'
            )
            stmt.run([plateNumber, fleetId], function (err: Error) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
                stmt.finalize()
            })
        })
    }

    async getAllVehiclesOfAFleet(fleetId: number): Promise<Vehicle[]> {
        return new Promise((resolve, reject) => {
            const query =
                'SELECT vehicles.* FROM vehicles JOIN j_vehicule_fleet ON vehicles.plate_number = j_vehicule_fleet.plate_number WHERE j_vehicule_fleet.fleet_id = ?'

            database.all(
                query,
                [fleetId],
                (
                    err,
                    rows: {
                        ID: number
                        plate_number: string
                        location_latitude: number
                        location_longitude: number
                    }[]
                ) => {
                    if (err) {
                        reject(err)
                    } else {
                        const vehicles: Vehicle[] = rows.map(
                            (row) =>
                                new Vehicle(
                                    row.ID,
                                    row.plate_number,
                                    new Location(
                                        row.location_latitude,
                                        row.location_longitude
                                    )
                                )
                        )
                        resolve(vehicles)
                    }
                }
            )
        })
    }

    async deleteByOwnerId(ownerId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const stmt = database.prepare(
                'DELETE FROM fleets WHERE owner_id = ?'
            )
            stmt.run(ownerId, function (err) {
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

export const fleetRepository = new FleetRepository()

import { Fleet } from '../domain/fleet'
import { Repository } from './repository'

export class FleetRepository extends Repository<Fleet> {}

export const fleetRepository: FleetRepository = new FleetRepository()

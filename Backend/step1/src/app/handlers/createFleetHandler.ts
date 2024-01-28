import { Fleet } from '../../domain/fleet'
import { FleetRepository, fleetRepository } from '../../infra/fleetRepository'
import { CreateFleetCommand } from '../commands/createFleetCommand'

export class CreateFleetHandler {
    private fleetRepository: FleetRepository

    constructor(fleetRepository: FleetRepository) {
        this.fleetRepository = fleetRepository
    }

    handle(command: CreateFleetCommand) {
        const fleet: Fleet = new Fleet(command.ownerId)

        return this.fleetRepository.save(fleet)
    }
}

export const createFleetHandler: CreateFleetHandler = new CreateFleetHandler(
    fleetRepository
)

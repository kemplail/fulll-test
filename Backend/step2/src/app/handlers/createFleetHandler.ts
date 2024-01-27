import { CreateFleetDto } from '../../infra/dtos/createFleetDto'
import { FleetRepository, fleetRepository } from '../../infra/fleetRepository'
import { CreateFleetCommand } from '../commands/createFleetCommand'

export class CreateFleetHandler {
    private fleetRepository: FleetRepository

    constructor(fleetRepository: FleetRepository) {
        this.fleetRepository = fleetRepository
    }

    handle(command: CreateFleetCommand) {
        const createFleetDto = new CreateFleetDto(command.ownerId)

        return this.fleetRepository.createFleet(createFleetDto)
    }
}

export const createFleetHandler = new CreateFleetHandler(fleetRepository)

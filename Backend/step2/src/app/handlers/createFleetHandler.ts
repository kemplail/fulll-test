import { CreateFleetDto } from '../../infra/dtos/createFleetDto'
import { FleetRepository, fleetRepository } from '../../infra/fleetRepository'
import { CreateFleetCommand } from '../commands/createFleetCommand'

export class CreateFleetHandler {
    private fleetRepository: FleetRepository

    constructor(fleetRepository: FleetRepository) {
        this.fleetRepository = fleetRepository
    }

    async handle(command: CreateFleetCommand) {
        const createFleetDto: CreateFleetDto = new CreateFleetDto(
            command.ownerId
        )

        return await this.fleetRepository.createFleet(createFleetDto)
    }
}

export const createFleetHandler: CreateFleetHandler = new CreateFleetHandler(
    fleetRepository
)

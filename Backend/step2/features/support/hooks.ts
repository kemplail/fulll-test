import { After } from '@cucumber/cucumber'
import { vehicleRepository } from '../../src/infra/vehicleRepository'
import { fleetRepository } from '../../src/infra/fleetRepository'
import {
    TEST_OTHER_OWNER_ID,
    TEST_OWNER_ID,
    TEST_PLATE_NUMBER,
} from '../step_definitions/steps'

After(async () => {
    await cleanUpDatabase()
})

async function cleanUpDatabase() {
    await vehicleRepository.deleteByPlateNumber(TEST_PLATE_NUMBER)
    await fleetRepository.deleteByOwnerId(TEST_OWNER_ID)
    await fleetRepository.deleteByOwnerId(TEST_OTHER_OWNER_ID)
}

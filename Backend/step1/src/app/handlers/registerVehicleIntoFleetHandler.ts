import { Vehicle } from "../../domain/vehicle";
import { FleetRepository, fleetRepository } from "../../infra/fleetRepository";
import {
  VehicleRepository,
  vehicleRepository,
} from "../../infra/vehicleRepository";
import { RegisterVehicleIntoFleetCommand } from "../commands/registerVehicleIntoFleetCommand";

export class RegisterVehicleIntoFleetHandler {
  private vehicleRepository: VehicleRepository;
  private fleetRepository: FleetRepository;

  constructor(
    vehicleRepository: VehicleRepository,
    fleetRepository: FleetRepository
  ) {
    this.vehicleRepository = vehicleRepository;
    this.fleetRepository = fleetRepository;
  }

  async handle(command: RegisterVehicleIntoFleetCommand) {
    let vehicle = await this.vehicleRepository.findByPlateNumber(
      command.plateNumber
    );
    const fleet = await this.fleetRepository.findById(command.fleetId);

    if (!vehicle) {
      vehicle = new Vehicle(command.plateNumber);
      await vehicleRepository.save(vehicle);
    }

    if (!fleet) {
      throw new Error("Unable to retrieve the requested fleet");
    }

    fleet.addVehicle(vehicle);

    return this.fleetRepository.save(fleet);
  }
}

export const registerVehicleIntoFleetHandler =
  new RegisterVehicleIntoFleetHandler(vehicleRepository, fleetRepository);

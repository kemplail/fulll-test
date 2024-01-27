import { Location } from "../../domain/location";

export class ParkVehicleIntoLocationCommand {
  constructor(public plateNumber: string, public location: Location) {}
}

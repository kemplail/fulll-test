import { Location } from "./location";
import { Model } from "./model";

export class Vehicle extends Model {
  private static counter = 0;

  private plateNumber: string;
  private location: Location | undefined;

  constructor(plateNumber: string) {
    Vehicle.counter++;
    super(Vehicle.counter);
    this.plateNumber = plateNumber;
    this.location = undefined;
  }

  setLocation(location: Location) {
    if (this.location && this.location.isEqual(location)) {
      throw new Error("The car is already parked in the indicated location");
    }

    this.location = location;
  }

  getLocation(): Location | undefined {
    return this.location;
  }

  getPlateNumber(): string {
    return this.plateNumber;
  }
}

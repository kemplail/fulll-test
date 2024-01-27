export class RegisterVehicleIntoFleetCommand {
    constructor(
        public plateNumber: string,
        public fleetId: number
    ) {}
}

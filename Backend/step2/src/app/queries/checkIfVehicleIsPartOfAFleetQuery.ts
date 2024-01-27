export class CheckIfAVehicleIsPartOfAFleetQuery {
    constructor(
        public fleetId: number,
        public vehiclePlateNumber: string
    ) {}
}

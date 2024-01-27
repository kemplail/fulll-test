export class Location {
  private latitude: number;
  private longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  isEqual(otherLocation: Location): boolean {
    return (
      this.latitude === otherLocation.latitude &&
      this.longitude === otherLocation.longitude
    );
  }

  getLatitude() {
    return this.latitude;
  }

  getLongitude() {
    return this.longitude;
  }
}

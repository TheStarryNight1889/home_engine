export class CreateAirDto {
  readonly temperature: number;
  readonly humidity: number;
  readonly co2: number;
  readonly device_id: string;
  readonly location_id: string;
}

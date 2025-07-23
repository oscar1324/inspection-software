export class WindFarm {

    name: string;
    location: string;
    province: string;
    country: string;
    client: string;
    total_aagg: number;
    type_blade: string;

    constructor(data:any) {
        this.name = data.name;
        this.location = data.location;
        this.province = data.province;
        this.country = data.country;
        this.client = data.client;
        this.total_aagg = data.total_aagg;
        this.type_blade = data.type_blade;

    }
}
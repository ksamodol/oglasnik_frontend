export interface Listing {
    id: number;
    title: string;
    description: string;
    condition: string;
    price: number;
    timestampCreated: Date;
    category: string;
    countyName: string;
    placeName: string;
    userUsername: string;
    userPhoneNumber: string;
    images: string[];

    make: string;
    model: string;
    year: number;
    mileage: number;
    horsepower: number;

    insideArea: number;
    outsideArea: number;
    floors: number;
    yearBuilt: number;
    numberOfRooms: number;
}

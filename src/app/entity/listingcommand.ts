export interface ListingCommand{
    title: string;
    description: string;
    condition: string;
    price: number;
    category: string;
    placeId: number;
    
    make: string;
    model: string;
    year: number;
    mileage: number;
    horsepower: number;

    insideArea: number;
    outsideArea: number;
    yearBuilt: number;
    floors: number;
    numberOfRooms: number;
}
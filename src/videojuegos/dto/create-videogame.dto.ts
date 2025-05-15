import { IsDateString, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

import { IsString } from "class-validator";

export class CreateVideogameDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsDateString()
    releaseDate: Date;

    @IsString()
    @IsNotEmpty()
    category: string;
}


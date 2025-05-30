import { Injectable } from "@nestjs/common";
import { HttpAdapter } from "../interfaces/http-adaptater.interface";
import axios, { AxiosInstance } from "axios";

@Injectable()
export class AxiosAdapter implements HttpAdapter {
    private readonly axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.axios.get<T>(url);
            return data;
        } catch (error) {
            throw new Error('Error getting data');
        }
    }
}
import { DeviceService } from "../services/device"
import { ControllerInterface } from "./controllerInterface"
import { Request, Response } from "express"
import express from "express"

export class DeviceController implements ControllerInterface{
    private deviceService: DeviceService;

    constructor(deviceService: DeviceService) {
        this.deviceService = deviceService;
    }

    public routes(app: express.Application): void {
        app.get('/devices', this.getDevices.bind(this));
    }

    public async getDevices(req: Request, res: Response): Promise<void> {
        try {
            const devices = await this.deviceService.getDevices()
            res.send(devices)
        } catch (err) {
            console.error(err)
            res.sendStatus(500)
        }
    }
}

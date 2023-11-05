import { DeviceService } from "../services/device"
import { Device } from "../models/device"
import { ControllerInterface } from "./controllerInterface"
import { Request, Response } from "express"
import express from "express"

export class DeviceController implements ControllerInterface{
    private deviceService: DeviceService;

    constructor(deviceService: DeviceService) {
        this.deviceService = deviceService;
    }

    public routes(app: express.Application): void {
        app.get('/api/devices', this.getDevices.bind(this));
        app.post('/api/devices', this.postDevice.bind(this));
        
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
    public async postDevice(req: Request, res: Response): Promise<void> {
        try{
            console.log(req.body);
            const device = req.body as Device
            const r = await this.deviceService.createDevice(device)
            if (!r) {
                res.sendStatus(400)
                return
            }
            res.sendStatus(200)

        } catch (err) {
            console.error(err)
            res.sendStatus(500)
        }
    }
}

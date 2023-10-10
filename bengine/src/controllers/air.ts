import { AirService } from "../services/air";
import { ControllerInterface } from "./controllerInterface";
import { Request, Response } from "express";
import express from "express";

export class AirController implements ControllerInterface{
    private airService: AirService;

    constructor(airService: AirService) {
        this.airService = airService;
    }

    public routes(app: express.Application): void {
        app.get('/airs', this.getAirs.bind(this));
    }

    public async getAirs(req: Request, res: Response): Promise<void> {
        try {
            const deviceId = req.query.deviceId as string
            if (!deviceId) {
                res.sendStatus(400)
                return
            }
            const airs = await this.airService.getAirs(deviceId)
            res.send(airs)
        } catch (err) {
            console.error(err)
            res.sendStatus(500)
        }
    }
}

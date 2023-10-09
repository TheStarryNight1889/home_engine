import express from 'express';

export interface ControllerInterface {
    routes(app: express.Application): void;
}
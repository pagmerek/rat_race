import HomeController from "../../src/controllers/HomeController";
import { Request, Response } from 'express';

describe('getHomesite', () => {
    const response = { render: jest.fn() } as unknown as Response;

    test('renders home template', () => {
        const request = { params: {} } as unknown as Request;
        HomeController.get(request, response);
        expect(response.render).toHaveBeenCalledWith('home', expect.any(Object));
    });
});
import getHomesite from "../../src/controllers/getHomesite";
import { Request, Response } from 'express';

describe('getHomesite', () => {
    const response = { render: jest.fn() } as unknown as Response;

    test('renders home template', () => {
        const request = { params: {} } as unknown as Request;
        getHomesite(request, response);
        expect(response.render).toHaveBeenCalledWith('home', expect.any(Object));
    });
});
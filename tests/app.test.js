const request = require('supertest');
const app = require('../app');
const { calculateValue } = require('../lib/logic');

describe('Suite de Pruebas de Calidad de Software', () => {
    describe('Pruebas Unitarias - Lógica de Inventario', () => {
        test('Debe calcular correctamente el valor total (10 * 5 = 50)', () => {
            const result = calculateValue(10, 5);
            expect(result).toBe(50);
        });

        test('Debe retornar 0 si se ingresan valores negativos', () => {
            const result = calculateValue(-10, 5);
            expect(result).toBe(0);
        });
        // NUEVO Unitaria 1: Precios decimales (10.99 * 3)
        test('Debe calcular correctamente con precios decimales (10.99 * 3 = 32.97)', () => {
            const result = calculateValue(10.99, 3);
            expect(result).toBe(32.97);
        });

        // NUEVO Unitaria 2: Stock cero (100 * 0)
        test('Debe retornar 0 si el stock es cero (100 * 0 = 0)', () => {
            const result = calculateValue(100, 0);
            expect(result).toBe(0);
        });
    });

    describe('Pruebas de Integración - API Endpoints', () => {
        test('GET /health - Debe responder con status 200 y JSON correcto', async () => {
            const response = await request(app).get('/health');
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('status', 'OK');
        });

        test('GET /items - Debe validar la estructura del inventario', async () => {
            const response = await request(app).get('/items');
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            
            // Validamos que el primer objeto tenga las propiedades requeridas
            if (response.body.length > 0) {
                expect(response.body[0]).toHaveProperty('id');
                expect(response.body[0]).toHaveProperty('stock');
            }
        });
         // NUEVO Integración 1: Obtener item específico por ID
        test('GET /items/1 - Debe devolver el item con ID 1', async () => {
            const response = await request(app).get('/items/1');
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('id', 1);
            expect(response.body).toHaveProperty('name');
            expect(response.body).toHaveProperty('stock');
        });

        test('GET /items - Todos los items deben tener precio positivo', async () => {
            const response = await request(app).get('/items');
            expect(response.statusCode).toBe(200);
            
            response.body.forEach(item => {
                expect(item.price).toBeGreaterThan(0);
            });
        });
    });
});
import { test } from '@playwright/test';
import { AmazonPage } from '../pages/AmazonPage';

test('Reto Técnico: Automatización Amazon', async ({ page }) => {
    const amazon = new AmazonPage(page);

    await page.goto('https://www.amazon.com');
    await amazon.manejarPopups(); 
    await amazon.buscarProducto('zapatos');
    await amazon.manejarPopups();
    await amazon.filtrarPorSkechers();
    await amazon.manejarPopups();
    await amazon.filtrarPorPrecio('100', '200');
    await amazon.obtenerTotalResultados();
    await amazon.ordenarPor('Price: High to Low');
    await amazon.imprimirPrimerosResultados(5);
    await amazon.ordenarPor('Newest Arrivals');
    await amazon.imprimirPrimerosResultados(5);
    await amazon.ordenarPor('Avg. Customer Review');
    await amazon.imprimirPrimerosResultados(5);
});
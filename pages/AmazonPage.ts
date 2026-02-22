import { Page, Locator } from '@playwright/test';

export class AmazonPage {
    readonly page: Page;
    readonly searchBar: Locator;
    // Cambiamos brandSkechers para que sea dinámico dentro de una sección
    readonly brandHeader: Locator;
    readonly minPriceSlider: Locator;
    readonly maxPriceSlider: Locator;
    readonly priceSectionHeader: Locator;
    readonly dismissButton: Locator;
    readonly sortDropdownButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBar = page.getByPlaceholder('Search Amazon');

        // 1. Localizamos la sección que tiene el título "Brands"
        // Usamos .filter() para asegurarnos de que el contenedor tenga ese texto específico
        this.brandHeader = page.locator('span.a-size-base.puis-bold-weight-text', { hasText: /^Brands$/ });

        this.minPriceSlider = page.locator('#p_36\\/range-slider_slider-item_lower-bound-slider');
        this.maxPriceSlider = page.locator('#p_36\\/range-slider_slider-item_upper-bound-slider');
        this.priceSectionHeader = page.locator('#priceRefinements');
        this.dismissButton = page.locator('.glow-toaster-button-dismiss').first();
        this.sortDropdownButton = page.locator('span.a-button-text.a-declarative', { hasText: 'Sort by:' });
    }

    async manejarPopups() {
        if (await this.dismissButton.isVisible({ timeout: 2000 })) {
            await this.dismissButton.click({ force: true });
        }
    }

    async buscarProducto(producto: string) {
        await this.searchBar.fill(producto);
        await this.searchBar.press('Enter');
    }

    async filtrarPorSkechers() {
    // 1. Localizamos el encabezado exacto "Brands"
    const brandsHeader = this.page.getByText('Brands', { exact: true });

    // 2. Esperamos a que sea visible (evita el error de "Brands no encontrado")
    await brandsHeader.waitFor({ state: 'visible', timeout: 5000 }).catch(() => null);

    if (await brandsHeader.isVisible()) {
        console.log("Sección Brands confirmada.");

        // 3. Seleccionamos Skechers por el ID exacto que viste en el inspector
        // Apuntamos al enlace <a> dentro de ese <li>
        const skechersLink = this.page.locator('li[id="p_123/234502"] a').first();

        // 4. Click forzado para ignorar capas invisibles de Amazon
        await skechersLink.click({ force: true });
    } else {
        console.error("No se pudo localizar el título exacto de 'Brands'.");
    }
}

    async filtrarPorPrecio(min: string, max: string) {
    // 1. Validamos la visibilidad del contenedor principal que pasaste
    await this.priceSectionHeader.waitFor({ state: 'visible', timeout: 5000 }).catch(() => null);

    if (await this.priceSectionHeader.isVisible()) {
        console.log("Sección de Precios detectada.");

        // 2. Verificamos si los SLIDERS están presentes (Amazon es dinámico)
        if (await this.minPriceSlider.isVisible()) {
            console.log(`Ajustando sliders de rango: ${min} a ${max}`);

            // Cambiamos los valores vía Javascript
            await this.minPriceSlider.evaluate((el: HTMLInputElement, val) => {
                el.value = val;
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('change', { bubbles: true }));
            }, min);

            await this.maxPriceSlider.evaluate((el: HTMLInputElement, val) => {
                el.value = val;
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('change', { bubbles: true }));
            }, max);

            // Presionamos Enter para aplicar el filtro del formulario
            await this.page.keyboard.press('Enter');
            
            // Espera técnica mínima para que el slider procese el cambio
            await this.page.waitForTimeout(2000); 
        } else {
            console.warn("La sección de precios es visible pero no usa sliders (posible lista de enlaces).");
            // Aquí podrías agregar lógica para hacer clic en "Up to $25", etc., si lo deseas.
        }
    } else {
        console.error("El elemento #priceRefinements no apareció.");
    }
}

    async obtenerTotalResultados() {
        const spanResultados = this.page.locator('h2.a-size-base.a-spacing-small.a-spacing-top-small.a-text-normal').first();
        const texto = await spanResultados.innerText();
        console.log(`Info: ${texto}`);
    }

    async ordenarPor(opcion: string) {
    console.log(`Cambiando orden a: ${opcion}`);

    // 1. Hacemos clic en el botón visual del dropdown para abrirlo
    // Según tu imagen, es el span que dice "Sort by: Featured" o similar
    await this.sortDropdownButton.click();

    // 2. Esperamos a que la lista de opciones sea visible en el DOM
    // Amazon usa una capa (popover) para mostrar estas opciones
    const optionLocator = this.page.getByRole('option', { name: opcion, exact: true });
    
    // 3. Hacemos clic en la opción deseada (ej: "Price: High to Low")
    await optionLocator.waitFor({ state: 'visible', timeout: 3000 });
    await optionLocator.click();

    // 4. Pequeña pausa para que la página recargue los resultados
    await this.page.waitForTimeout(2000);
}

    async imprimirPrimerosResultados(cantidad: number) {
        console.log(`--- Top ${cantidad} Resultados ---`);
        for (let i = 0; i < cantidad; i++) {
            const item = this.page.locator('[data-component-type="s-search-result"]').nth(i);
            const nombre = await item.locator('h2').innerText();
            console.log(`${i + 1}: ${nombre}`);
        }
    }
}
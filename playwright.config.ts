import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Mantenemos html para ver los videos y list para ver el progreso en consola
  reporter: [['html'], ['list']],

  use: {
    baseURL: 'https://www.amazon.com',
    
    /* CAPTURA DE MEDIOS */
    screenshot: 'on', // Cambiado a 'on' para tener evidencia visual completa
    video: 'on',      // CAMBIO CLAVE: 'on' genera video siempre, no solo al fallar
    trace: 'on',      // 'on' permite inspeccionar cada acción después de la ejecución
    
    /* OTROS AJUSTES */
    ignoreHTTPSErrors: true, // Útil para evitar bloqueos por certificados en Amazon
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
🛒 Amazon Automation Test with Playwright, Cucumber & Jenkins
Este proyecto implementa una arquitectura de pruebas automatizadas E2E para Amazon, utilizando un enfoque orientado al negocio mediante Gherkin y Cucumber. La ejecución está orquestada por Jenkins, garantizando reportes visuales y evidencia en video para cada ciclo de prueba.

🏗️ Arquitectura y Frameworks
Playwright: Motor de automatización de alta velocidad para navegadores modernos.

Cucumber / Gherkin: Definición de pruebas en lenguaje natural para mejorar la colaboración entre técnicos y stakeholders.

Framework Colmena: Estructura modular para la gestión de Page Objects y utilitarios, facilitando el mantenimiento.

Jenkins (CI/CD): Pipeline automatizado para ejecución en entornos Windows.

🧪 Ejemplo de Escenario (Gherkin)
Gherkin
Feature: Compra de productos en Amazon
  As a customer
  I want to search for an item and add it to the cart
  So that I can purchase it later

  Scenario: Buscar una Laptop y agregar al carrito
    Given the user is on the Amazon homepage
    When the user searches for "Laptop"
    And selects the first result
    Then the product should be added to the shopping cart
🛠️ Requisitos e Instalación
Node.js: v25.6.1 instalado.

Plugins Jenkins: NodeJS, HTML Publisher y Email Extension.

Instalación Local:

Bash
npm install
npx playwright install --with-deps
⚙️ Jenkins Pipeline (CI/CD)
El proyecto utiliza un script de Pipeline optimizado para Windows, ejecutando comandos mediante bat para asegurar compatibilidad total con el entorno del servidor.

Flujo de Ejecución:
Checkout: Sincronización con la rama main de GitHub.

Setup: Instalación automática de dependencias y navegadores.

Tests: Ejecución de Cucumber con Playwright y captura de video .webm.

Reporte: Generación de informe HTML y envío por correo vía SMTP seguro (SSL).

🚀 Posibles Mejoras a Futuro
Para escalar esta solución, se proponen las siguientes actualizaciones:

Ejecución en Paralelo: Configurar playwright.config para correr múltiples shards, reduciendo el tiempo total del Pipeline.

Dockerización: Migrar la ejecución a contenedores Docker para eliminar dependencias del Sistema Operativo host (evitando errores de bat vs sh).

Integración con Jira/Xray: Subir automáticamente los resultados de Cucumber a herramientas de gestión de pruebas.

Cross-Browser Testing: Expandir las pruebas para cubrir Safari (WebKit) y Firefox de forma simultánea.

Cloud Testing: Integrar con servicios como BrowserStack o LambdaTest para probar en dispositivos móviles reales.

📧 Notificaciones
Los resultados se envían automáticamente a rodrigosepulveda99k@gmail.com incluyendo la evidencia en video de los fallos y éxitos.
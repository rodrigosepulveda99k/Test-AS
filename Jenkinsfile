pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Descarga el código desde tu repo de GitHub
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install --with-deps'
            }
        }
        
        stage('Run Tests') {
            steps {
                // Ejecuta los tests (esto generará los videos gracias a tu config)
                sh 'npx playwright test'
            }
        }
    }
    
    post {
        always {
            // Publica el reporte HTML y los videos en Jenkins
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
            
            // Envío de Email con el estado y link al reporte
            emailext (
                subject: "Status: ${currentBuild.currentResult} - Project: ${env.JOB_NAME}",
                body: """El test de Amazon ha finalizado.
                         Resultado: ${currentBuild.currentResult}
                         Puedes ver el reporte y los videos de la ejecución aquí: ${env.BUILD_URL}Playwright_20Report/""",
                to: 'tu-email@ejemplo.com',
                attachmentsPattern: 'test-results/**/*.webm' // Adjunta los videos grabados
            )
        }
    }
}
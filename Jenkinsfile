pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
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
                sh 'npx playwright test'
            }
        }
    }
    
    post {
        always {
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
            
            emailext (
                subject: "Status: ${currentBuild.currentResult} - Project: ${env.JOB_NAME}",
                body: """El test de Amazon ha finalizado.
                         Resultado: ${currentBuild.currentResult}
                         Puedes ver el reporte y los videos de la ejecución aquí: ${env.BUILD_URL}Playwright_20Report/""",
                to: 'tu-email@ejemplo.com',
                attachmentsPattern: 'test-results/**/*.webm' 
            )
        }
    }
}
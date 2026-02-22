pipeline {
    agent any
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
                sh 'npx playwright install --with-deps'
            }
        }
        stage('Test') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
    post {
        always {
            publishHTML(target: [reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Playwright Report'])
            // Aquí configurarías el envío de mail [cite: 24, 30]
        }
    }
}
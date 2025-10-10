pipeline {
    agent any

    environment {
        TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                // เราจะ checkout โค้ดแค่ใน stage นี้ที่เดียว
                git branch: 'prod', url: 'https://github.com/Takku1N/hometail.git'
                echo "Checked out code successfully."
            }
        }

        // stage('Test Backend') {
        //     agent {
        //         docker { 
        //             image 'node:22-alpine'
        //             args '-u root -v jenkins-npm-cache:/root/.npm' 
        //         }
        //     }
        //     steps {
        //         dir('backend') {
        //             echo "--- Testing Backend ---"
        //             sh 'npm install'
        //             sh 'npm test'
        //         }
        //     }
        // }
        
        // stage('Test Frontend') {
        //     agent {
        //         docker { 
        //             image 'node:18-alpine'
        //             args '-u root -v jenkins-npm-cache:/root/.npm'
        //         }
        //     }
        //     steps {
        //         dir('frontend') {
        //             echo "--- Testing Frontend ---"
        //             sh 'npm install'
        //             sh 'npm test'
        //         }
        //     }
        // }

        stage('Build Docker Images') {
            steps {
                
                echo "--- Building docker image by docker compose build"
                sh "TAG=${TAG} docker compose build"
            }
        }

        stage('Deploy to Production') {
            steps {
                
                sh "TAG=${TAG} docker compose down -v frontend backend1 backend2"
                sh "TAG=${TAG} docker compose down grafana prometheus db nginx node-exporter"
                echo "--- Deploying by docker compose up"
                sh "TAG=${TAG} docker compose up -d"
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Pipeline completed successfully! ✅'
        }
        failure {
            echo 'Pipeline failed! ❌'
        }
    }
}


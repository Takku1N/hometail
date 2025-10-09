pipeline {
    agent any

    environment {
        TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                // เราจะ checkout โค้ดแค่ใน stage นี้ที่เดียว
                git branch: 'plub_test', url: 'https://github.com/Takku1N/hometail.git'
                echo "Checked out code successfully."
            }
        }

        stage('Test Backend') {
            agent {
                docker { 
                    image 'node:22-alpine'
                    args '-u root -v jenkins-npm-cache:/root/.npm' 
                }
            }
            steps {
                dir('backend') {
                    echo "--- Testing Backend ---"
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }
        
        stage('Test Frontend') {
            agent {
                docker { 
                    image 'node:18-alpine'
                    args '-u root -v jenkins-npm-cache:/root/.npm'
                }
            }
            steps {
                dir('frontend') {
                    echo "--- Testing Frontend ---"
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                
                echo "--- Building docker image by docker compose build"
                sh "TAG=${TAG} docker compose build"
            }
        }

        stage('Deploy to Production') {
            steps {
                
                echo "--- Deploying by docker compose up ---"
                sh "TAG=${TAG} docker compose up -d --force-recreate"
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


pipeline {
    // กำหนดให้ Agent ของ Pipeline ทั้งหมดเป็น Docker container
    agent {
        docker {
            image 'docker:latest'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    environment {
        TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'plub_test', url: 'https://github.com/Takku1N/hometail.git'
                echo "Checked out code successfully."
                
                // --- เพิ่มเข้ามา ---
                // เก็บไฟล์ทั้งหมดใน workspace ปัจจุบันไว้ใน stash ชื่อ 'source'
                stash name: 'source', includes: '**/*'
            }
        }

        stage('Test Backend') {
            agent {
                docker { image 'node:18-alpine' }
            }
            steps {
                // --- เพิ่มเข้ามา ---
                // นำไฟล์จาก stash 'source' มาวางใน workspace ใหม่นี้
                unstash 'source'
                
                dir('backend') {
                    echo "--- Testing Backend ---"
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }
        
        stage('Test Frontend') {
            agent {
                docker { image 'node:18-alpine' }
            }
            steps {
                // --- เพิ่มเข้ามา ---
                unstash 'source'
                
                dir('frontend') {
                    echo "--- Testing Frontend ---"
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                // --- เพิ่มเข้ามา ---
                unstash 'source' // ต้อง unstash ที่นี่ด้วยเพื่อให้มี docker-compose.yml
                
                echo "--- Building docker image by docker compose build"
                sh "TAG=${TAG} docker compose build"
            }
        }

        stage('Deploy to Production') {
            steps {
                // --- เพิ่มเข้ามา ---
                unstash 'source'
                
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

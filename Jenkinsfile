pipeline {
    // กำหนดให้ Agent ของ Pipeline ทั้งหมดเป็น Docker container
    agent {
        docker {
            image 'docker:latest'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    // ปิดการ checkout อัตโนมัติสำหรับทุก agent
    // เพื่อให้เราควบคุมการ checkout และ stash/unstash ได้เอง
    options {
        skipDefaultCheckout true
    }

    environment {
        TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                // เราจะ checkout โค้ดแค่ใน stage นี้ที่เดียว
                git branch: 'plub_test', url: 'https://github.com/Takku1N/hometail.git'
                echo "Checked out code successfully."
                
                // เก็บไฟล์ทั้งหมดใน workspace ปัจจุบันไว้ใน stash ชื่อ 'source'
                stash name: 'source', includes: '**/*'
            }
        }

        stage('Test Backend') {
            agent {
                docker { image 'node:18-alpine' }
            }
            steps {
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
                // นำไฟล์จาก stash 'source' มาวางใน workspace ใหม่นี้
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
                // ต้อง unstash ที่นี่ด้วยเพื่อให้มี docker-compose.yml
                unstash 'source' 
                
                echo "--- Building docker image by docker compose build"
                sh "TAG=${TAG} docker compose build"
            }
        }

        stage('Deploy to Production') {
            steps {
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


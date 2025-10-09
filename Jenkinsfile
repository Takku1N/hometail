pipeline {
    // กำหนดให้ Agent ของ Pipeline ทั้งหมดเป็น Docker container
    agent {
        docker {
            image 'docker:latest' // ใช้ image docker official ซึ่งมี docker compose (V2) มาในตัว
            args '-v /var/run/docker.sock:/var/run/docker.sock' // สำคัญมาก! สำหรับให้ agent คุยกับ Docker ของเครื่อง host ได้
        }
    }

    environment {
        // (Optional) กำหนด URL ของ Docker Registry ที่คุณใช้
        // REGISTRY_URL = 'your-docker-registry.com/your-repo'
        // (Optional) กำหนด Credential ID ที่ใช้สำหรับ login เข้า Registry
        // REGISTRY_CREDENTIAL_ID = 'your-registry-credentials-id'

        // ใช้หมายเลข build ของ Jenkins เป็น Tag เพื่อให้แต่ละเวอร์ชันไม่ซ้ำกัน
        TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                // ดึงโค้ดจาก Git Repository (กรุณาเปลี่ยน URL เป็นของคุณ)
                git branch: 'plub_test', url: 'https://github.com/Takku1N/hometail.git'
                echo "Checked out code successfully."
            }
        }

        stage('Checkout') {
            steps {
                // ดึงโค้ดจาก Git Repository (กรุณาเปลี่ยน URL เป็นของคุณ)
                git branch: 'plub_test', url: 'https://github.com/Takku1N/hometail.git'
                echo "Checked out code successfully."
            }
        }

        stage('Test Backend') {
            agent {
                // ใช้ Docker Agent เพื่อสร้างสภาพแวดล้อมที่สะอาดสำหรับ Test
                docker { image 'node:18-alpine' }
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
                docker { image 'node:18-alpine' }
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
        // ส่วนที่จะทำงานหลัง Pipeline ทั้งหมดทำงานเสร็จ
        always {
            echo 'Pipeline finished.'
            // (Optional) สามารถเพิ่มคำสั่ง clean up workspace ได้ที่นี่
        }
        success {
            echo 'Pipeline completed successfully! ✅'
        }
        failure {
            echo 'Pipeline failed! ❌'
        }
    }
}

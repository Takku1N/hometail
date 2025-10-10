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

        stage('Prepare Build Context') {
            steps {
                echo "--- Setting execute permissions for entrypoint scripts ---"
                // ตรวจสอบ permission ปัจจุบัน (สำหรับ Debug)
                sh "ls -l backend/entrypoint.sh"

                // **สำคัญ: บังคับให้ไฟล์ entrypoint.sh มีสิทธิ์ในการรัน**
                sh "chmod +x backend/entrypoint.sh"

                // ตรวจสอบ permission อีกครั้งหลังแก้ไข
                sh "ls -l backend/entrypoint.sh"
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
                echo "--- Stopping and removing stateless services ---"
                // ลบ container ที่ไม่เก็บข้อมูล พร้อมลบ anonymous volumes (-v)
                sh "TAG=${TAG} docker compose down -v frontend backend1 backend2 nginx node-exporter"

                echo "--- Stopping stateful services (keeping data) ---"
                // ลบ container ที่เก็บข้อมูล โดย **ไม่ลบ** named volumes (ไม่มี -v)
                sh "TAG=${TAG} docker compose down grafana prometheus db"

                echo "--- Deploying all services by docker compose up ---"
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

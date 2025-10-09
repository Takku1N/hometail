pipeline {
    // กำหนดให้ Agent ของ Pipeline ทั้งหมดเป็น Docker container
    agent any

    // ปิดการ checkout อัตโนมัติสำหรับทุก agent
    // เพื่อให้เราควบคุมการ checkout และ stash/unstash ได้เอง
    // options {
    //     skipDefaultCheckout true
    // }

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
                // stash name: 'source', includes: '**/*'
            }
        }

        // stage('Test Backend') {
        //     agent {
        //         docker { 
        //             image 'node:18-alpine'
        //             // --- แก้ไข/เพิ่มเข้ามา ---
        //             // Run commands inside the container as the 'root' user to avoid permission issues.
        //             // Also, mount a named volume to cache npm packages between builds.
        //             args '-u root -v jenkins-npm-cache:/root/.npm' 
        //         }
        //     }
        //     steps {
        //         // นำไฟล์จาก stash 'source' มาวางใน workspace ใหม่นี้
        //         unstash 'source'
                
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
        //             // --- แก้ไข/เพิ่มเข้ามา ---
        //             // Use the same user and named volume to share the cache.
        //             args '-u root -v jenkins-npm-cache:/root/.npm'
        //         }
        //     }
        //     steps {
        //         // นำไฟล์จาก stash 'source' มาวางใน workspace ใหม่นี้
        //         unstash 'source'
                
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


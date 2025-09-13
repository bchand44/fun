pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/bchand44/fun.git'
      }
    }
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Run Tests') {
      steps {
        sh 'npm run test'
      }
    }
    stage('Build Frontend') {
      steps {
        sh 'npm run build'
      }
    }
    stage('Build Backend') {
      steps {
        sh 'cd server && npm install'
      }
    }
    stage('Docker Compose Up') {
      steps {
        sh 'docker compose up -d'
      }
    }
  }
  post {
    always {
      archiveArtifacts artifacts: '**/dist/**', allowEmptyArchive: true
    }
    failure {
      mail to: 'your-team@example.com', subject: 'Jenkins Build Failed', body: 'Check Jenkins for details.'
    }
  }
}

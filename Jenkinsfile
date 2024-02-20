pipeline {
    agent {
        label 'jenkins-server-node1'
    }
    triggers {
        githubPush()
    }
    options {
        timestamps()
        disableConcurrentBuilds()
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout([
                        $class: 'GitSCM',
                        branches: [
                            [name: '*/master'],
                            [name: '+refs/pull-requests/*:refs/remotes/origin/pull-requests/*']
                        ],
                        extensions: [],
                        userRemoteConfigs: [
                            url: 'https://github.com/vivektrivedi-123/react-node-mysql.git'
                        ]
                    ])
                }
            }
        }
        stage('Build') {
            steps {
                sh "echo build"
            }
        }
        stage('Deploy') {
            steps {
                sh "echo deploy"
            }
        }
    }
}

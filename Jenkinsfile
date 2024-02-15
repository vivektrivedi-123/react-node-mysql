pipeline{
    agent{
        label 'jenkins-server-node1'
    }
    triggers {
        GenericTrigger causeString: 'Generic Cause', regexpFilterExpression: '', regexpFilterText: '', token: '91ffddc33d7', tokenCredentialId: ''
    }
    options{
        timestamps()
        disableConcurrentBuilds()
    }
    stages{
        stage('Checkout'){
            steps{
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/vivektrivedi-123/react-node-mysql.git']])
            }
        }
        stage('Build'){
            steps{
                sh "echo build"
            }
        }
        stage('Deploy'){
            steps{
                sh "echo deploy"
            }
        }
    }
}

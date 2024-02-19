pipeline{
    agent{
        label 'jenkins-server-node1'
    }
    triggers {
        githubPush()
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
    post {
        always {
            // Cleanup steps can go here
            
            // GitHub Checks
            script {
                def gitHubStatus = currentBuild.result == 'SUCCESS' ? 'success' : 'failure'
                def gitHubDescription = currentBuild.result == 'SUCCESS' ? 'Tests passed. Ready for deployment!' : 'Tests failed. Please check the build logs.'
                
                // Set up GitHub Checks parameters
                def params = [
                    context: 'Jenkins CI',
                    state: gitHubStatus,
                    description: gitHubDescription,
                    targetUrl: env.BUILD_URL
                ]
                
                // Send GitHub Checks request
                httpRequest(
                    acceptType: 'APPLICATION_JSON',
                    contentType: 'APPLICATION_JSON',
                    httpMode: 'POST',
                    requestBody: params,
                    url: 'https://github.com/vivektrivedi-123/react-node-mysql.git'
                )
            }
        }
    }
}

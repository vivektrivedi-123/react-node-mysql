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
                    // Determine if it's a pull request
                    def isPr = env.CHANGE_ID != null
                    
                    // github-specific refspec
                    def refspec = "+refs/pull/${env.CHANGE_ID}/head:refs/remotes/origin/PR-${env.CHANGE_ID} +refs/heads/master:refs/remotes/origin/master"
                    def url = 'https://github.com/vivektrivedi-123/react-node-mysql.git'
                    
                    def extensions = []
                    if (isPr) {
                        extensions = [[$class: 'PreBuildMerge', options: [mergeRemote: "refs/remotes/origin", mergeTarget: "PR-${env.CHANGE_ID}"]]]
                    }
                    
                    checkout([
                        $class: 'GitSCM',
                        doGenerateSubmoduleConfigurations: false,
                        extensions: extensions,
                        submoduleCfg: [],
                        userRemoteConfigs: [[
                            refspec: refspec,
                            credentialsId: '<your credentials>',
                            url: url
                        ]]
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

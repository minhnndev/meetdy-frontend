pipeline {

  agent any
  environment {
    DOCKER_IMAGE = "meetdyappchat/meetdy-frontend"
    DOCKER_TAG="${GIT_BRANCH.tokenize('/').pop()}-${GIT_COMMIT.substring(0,7)}"
    APP_URL="https://meetdy.com"
    APP_API_URL="https://meetdy.com/api"
    APP_SOCKET_URL="https://chat-backend-p70d.onrender.com"
  }

  stages {
      
    stage("build") {
            
        steps {
        
        withDockerRegistry(credentialsId: 'meetdyappchat-dockerhub', url: 'https://index.docker.io/v1/') {
            
            sh "docker build --build-arg APP_URL=https://meetdy.com --build-arg APP_API_URL=https://meetdy.com/api --build-arg APP_SOCKET_URL=https://chat-backend-p70d.onrender.com -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
            sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
            sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
            sh "docker push ${DOCKER_IMAGE}:latest"

        }    

            //clean to save disk
            sh "docker image rm -f ${DOCKER_IMAGE}:${DOCKER_TAG}"
            sh "docker image rm -f ${DOCKER_IMAGE}:latest"
            sh "docker image prune -f" 

        }

    }
	  
    stage("ssh"){
            
        steps {
                
        sshPublisher(publishers: [sshPublisherDesc(configName: 'meetdy-chat-server', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: """cd /home/minhnndev
            docker-compose stop meetdy-frontend
            docker-compose rm -f
            docker-compose pull meetdy-frontend
            docker-compose up -d
            docker image prune -f""", execTimeout: 120000000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
        }
    } 

  }

}

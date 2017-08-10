podTemplate(label: 'mypod', containers: [
    containerTemplate(name: 'docker', image: 'docker', ttyEnabled: true, command: 'cat'),
    containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.7.3', command: 'cat', ttyEnabled: true)
  ],
  volumes: [
    hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
  ]) {

    node('mypod') {

        checkout scm

        stage('build the bot image') {
            container('docker') {

            withCredentials([[$class : 'UsernamePasswordMultiBinding', 
                              credentialsId: 'dockerhub',
                              usernameVariable: 'DOCKER_HUB_USER', 
                              passwordVariable: 'DOCKER_HUB_PASSWORD']]) {
          
                sh 'docker build -t ${DOCKER_HUB_USER}/bot-service:${BUILD_NUMBER} -f bot/Dockerfile .'
                sh 'docker login -u ${env.DOCKER_HUB_USER} -p ${env.DOCKER_HUB_PASSWORD}'
                ssh 'docker push {DOCKER_HUB_USER}/bot-service:${BUILD_NUMBER '
                }
            }
        }

        stage('kubectl') {
            container('kubectl') {
                sh 'kubectl get nodes'
            }
        }

    }
}

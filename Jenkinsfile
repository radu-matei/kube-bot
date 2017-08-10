podTemplate(label: 'mypod', containers: [
    containerTemplate(name: 'docker', image: 'docker', ttyEnabled: true, command: 'cat'),
    containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.7.3', command: 'cat', ttyEnabled: true)
  ],
  volumes: [
    hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
  ]) {

    node('mypod') {

        checkout scm

        stage('the bot image') {
            container('docker') {
                sh 'pwd'
                sh 'ls'
            }
        }

        stage('kubectl') {
            container('kubectl') {
                sh 'kubectl get nodes'
            }
        }

    }
}

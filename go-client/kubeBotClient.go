package main

import (
	"fmt"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
)

var (
	clientSet *kubernetes.Clientset
)

func initializeClients() {
	config, err := rest.InClusterConfig()
	if err != nil {
		panic(err.Error())
	}

	clientSet, err = kubernetes.NewForConfig(config)
	if err != nil {
		panic(err.Error())
	}

	fmt.Println("Initialized clients!")
}

// GetPods returns the pods from the cluster
func GetPods() string {

	pods, err := clientSet.CoreV1().Pods("").List(metav1.ListOptions{})
	if err != nil {
		panic(err.Error())
	}
	fmt.Printf("There are %d pods in the cluster\n", len(pods.Items))
	return fmt.Sprintf("There are %d pods in the cluster\n", len(pods.Items))
}

// GetDeployments returns the deployments from the cluster
func GetDeployments() string {
	return "Trying to get Kubernetes deployments!"
}

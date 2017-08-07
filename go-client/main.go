package main

import (
	"io"
	"net/http"
)

func main() {
	http.HandleFunc("/get/pods", getPods)
	http.HandleFunc("/get/deployments", getDeployments)

	http.ListenAndServe(":8080", nil)
}

func getPods(writer http.ResponseWriter, request *http.Request) {
	io.WriteString(writer, "Trying to get Kubernetes pods")
}

func getDeployments(writer http.ResponseWriter, request *http.Request) {
	io.WriteString(writer, "Trying to get Kubernetes deployments")
}

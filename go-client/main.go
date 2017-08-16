package main

import (
	"io"
	"net/http"
)

func main() {
	initializeClients()

	http.HandleFunc("/get/pods", getPods)
	http.HandleFunc("/get/deployments", getDeployments)

	http.ListenAndServe(":80", nil)
}

func getPods(writer http.ResponseWriter, request *http.Request) {
	io.WriteString(writer, GetPods())
}

func getDeployments(writer http.ResponseWriter, request *http.Request) {
	io.WriteString(writer, GetDeployments())
}

const axios = require('axios');
const PODMAN_UNIX_SOCKET = "/run/podman/podman.sock";

module.exports = {
    
    createContainer: async function (data) {
        const requiredFields = [
            "name",
            "image"
        ];
        for(const field of requiredFields) {
            if(!data[field]) {
                throw "Missing the required field '" + field + "'";
            }
        }
        await axios({
            socketPath: PODMAN_UNIX_SOCKET,
            url: "/v3.0.0/libpod/containers/create",
            method: "POST",
            data: {
                image: data['image'],
                name: data['name']
            }
        }).then(function (response) {
            return Promise.resolve({
                id: response['Id'],
                warnings: response['Warnings']
            });
        }).catch(function (error) {
            throw "An error has occured while creating the container";
        });
    }
    
};
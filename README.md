

## HAProxy

Open a terminal, access this folder and then run the following commands:

```sh
# run all containers
docker-compose up

# if any changes on the images has been made, build it
docker-compose up --build --force-recreate

# restart haproxy after any changes in config file
docker-compose restart haproxy

# enters haproxy container
docker exec -it haproxy_test_haproxy_1 /bin/bash

# running socat commands
echo "help" | socat stdio tcp4-connect:127.0.0.1:9999
```

Examples of cart_id

- 7f8038f3-d1f8-439f-a21c-fdfc8be3a7c4 (http://localhost:9000/?cart_id=7f8038f3-d1f8-439f-a21c-fdfc8be3a7c4)
- 5d4c92ef-be91-4c6d-9e4d-62e11dc061b3 (http://localhost:9000/?cart_id=5d4c92ef-be91-4c6d-9e4d-62e11dc061b3)
- 0aafb303-b3be-46f4-8d44-1c991f4a9596 (http://localhost:9000/?cart_id=0aafb303-b3be-46f4-8d44-1c991f4a9596)
- 73f23092-1432-4741-8a5a-2d1d1367481c (http://localhost:9000/?cart_id=73f23092-1432-4741-8a5a-2d1d1367481c)
- e9f39f4a-e734-4216-a60c-226395a726fb (http://localhost:9000/?cart_id=e9f39f4a-e734-4216-a60c-226395a726fb)
- 3f891bf1-e29f-4426-9f35-162c603ca307 (http://localhost:9000/?cart_id=3f891bf1-e29f-4426-9f35-162c603ca307)
- c09bc7d9-f9ff-4f5d-860c-fd693cdeaf7d (http://localhost:9000/?cart_id=c09bc7d9-f9ff-4f5d-860c-fd693cdeaf7d)

### Access pages

With the HAProxy container running, open the desired page, as specified below.

- Default frontend: http://localhost:9000
- Stats page: http://localhost:8404/stats
- Data Plane API
    - Docs: http://localhost:5555/v2/docs
    - Specs (OpenAPI doc): http://localhost:5555/v2/specification
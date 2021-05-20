## Test with Locust

> Before testing, make sure the python file has the correct IP addresses to call and replace with the one of the host.

- Using the locust program type this in the terminal:
    - `locust -f .\locustfile.py`
    - Connect to http://localhost:8089

- Using docker type the following commands in the terminal:
    - Change the host with the correct port (if any)
    - `docker-compose up -d` for a single worker
    - `docker-compose up --scale worker=4 -d` for 4 workers
    - Connect to http://localhost:8089
# This locust test script example will simulate a user 
# browsing the Locust documentation on https://docs.locust.io

import random
from locust import HttpUser, SequentialTaskSet, TaskSet, between, task
import logging, sys, json
from pyquery import PyQuery
import csv

USER_CREDENTIALS = []

class UserSignUpInAndRequest(SequentialTaskSet):
    name = "defaultname"
    surname = "defaultsurname"
    email = "test@test.it"
    certid = "defaultcertid"
    password = "vivaisoldi"
    token = ""

    def on_start(self):
        if len(USER_CREDENTIALS) > 0:
            self.name, self.surname, self.email, self.certid = USER_CREDENTIALS.pop()
            self.email = self.email + "@email.it"
        #else:
        #    TestInit.yoimstatic()

    
    # @task
    # def signup(self):
    #     r = self.client.get("https://rcd.debug.ovh")
    #     pq = PyQuery(r.content)
    #     response = self.client.post("https://api.rcd.debug.ovh/register", data = json.dumps({
    #         'name': self.name,
    #         'surname': self.surname,
    #         'certid': self.certid,
    #         'email': self.email,
    #         'password': self.password,
    #         'confirmPassword': self.password
    #     }), headers = {'Content-Type': 'application/json'})
    #     logging.info('Sign up with %s email', self.email)

    @task
    def login(self):
        response = self.client.post("https://api.rcd.debug.ovh/signin", data = json.dumps({
            'email': self.email, 'password': self.password
        }), headers = {'Content-Type': 'application/json'})
        logging.info('RES=')
        logging.info(response)
        self.token = response.json()['token']
        logging.info('Login with token: %s ', self.token)

    @task
    def submit(self):
        self.client.post("https://api.rcd.debug.ovh/profile/" + self.certid, headers = {
            'authorization': self.token, 
            'Content-Type': 'application/json'
            })
        logging.info('%s just submitted the form', self.email)

    @task
    def on_stop(self):
        self.interrupt()
        # self.environment.runner.quit()


def yoimstatic():
    global USER_CREDENTIALS
    if (USER_CREDENTIALS == []):
        with open('/mnt/locust/dataset/data_user_500.csv', 'rt') as f:
            reader = csv.reader(f)
            USER_CREDENTIALS = list(reader)
        print("USER LIST LOADED!!")
    return 1

class TestInit(HttpUser):
    tasks = [UserSignUpInAndRequest]
    host = "https://api.rcd.debug.ovh"
    sock = None
    dummy = yoimstatic()
    
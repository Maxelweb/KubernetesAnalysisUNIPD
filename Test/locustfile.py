import random
from locust import HttpUser, SequentialTaskSet, TaskSet, between, task
import logging, sys, json
from pyquery import PyQuery
import string
import time
import random


MAX_USERS = 10000
USER_CREDENTIALS = []


def strgen(size=6, chars=string.ascii_uppercase + string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


def ListGenerator():
    global USER_CREDENTIALS
    if (USER_CREDENTIALS == []):
        for _ in range(0, MAX_USERS):
            USER_CREDENTIALS.append({strgen(12, string.ascii_uppercase + string.ascii_lowercase), strgen(12, string.ascii_uppercase + string.ascii_lowercase), strgen(12), strgen(12)})
        print("User list generated!")
    return 1

    
class UserSignUpInAndRequest(SequentialTaskSet):
    name = "defaultname"
    surname = "defaultsurname"
    email = "test@test.it"
    certid = "defaultcertid"
    password = "fakepassword"
    token = ""

    def on_start(self):
        if len(USER_CREDENTIALS) > 0:
            self.name, self.surname, self.email, self.certid = USER_CREDENTIALS.pop()
            self.email = self.email + "@email.it"
    
    @task
    def signup(self):
        r = self.client.get("http://127.0.0.1:30080")
        pq = PyQuery(r.content)
        time.sleep(0.5)
        response = self.client.post("http://127.0.0.1:30081/register", data = json.dumps({
            'name': self.name,
            'surname': self.surname,
            'certid': self.certid,
            'email': self.email,
            'password': self.password,
            'confirmPassword': self.password
        }), headers = {'Content-Type': 'application/json'})
        if response.status_code == 200:
            logging.info('Sign up with %s email', self.email)
        else:
            logging.info('Error on Sign up %s', response.status_code)
            self.interrupt()

    @task
    def login(self):
        time.sleep(2.5)
        response = self.client.post("http://127.0.0.1:30081/signin", data = json.dumps({
            'email': self.email, 'password': self.password
        }), headers = {'Content-Type': 'application/json'})
        logging.info('RES=')
        logging.info(response)
        if response.status_code == 200:
            logging.info('Sign in with %s email', self.email)
            self.token = response.json()['token']
            logging.info('Login with token: %s ', self.token)
        else:
            logging.info('Error on Sign in %s', response.status_code)
            self.interrupt()

    @task
    def submit(self):
        time.sleep(0.5)
        self.client.post("http://127.0.0.1:30081/profile-submission", json.dumps({
            'certid': self.certid
        }), headers = {
            'authorization': self.token, 
            'Content-Type': 'application/json'
            })
        logging.info('%s just submitted the form', self.email)

    @task
    def rank(self):
        time.sleep(0.5)
        self.client.get("http://127.0.0.1:30081/rank", headers = {
            'authorization': self.token, 'Content-Type': 'application/json'
            })
        logging.info('%s just visited the ranking page', self.email)
        self.interrupt()

    @task
    def on_stop(self):
        self.interrupt()

class TestInit(HttpUser):
    tasks = [UserSignUpInAndRequest]
    host = "http://127.0.0.1:30081"
    sock = None
    dummy = ListGenerator()

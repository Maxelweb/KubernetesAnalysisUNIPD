import random
from locust import HttpUser, SequentialTaskSet, TaskSet, between, task
import logging, sys, json
from pyquery import PyQuery
import string
import time
import random


MAX_USERS = 1000
USER_CREDENTIALS = []


def strgen(size=6, chars=string.ascii_uppercase + string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


def ListGenerator():
    global USER_CREDENTIALS
    if (USER_CREDENTIALS == []):
        for _ in range(0, MAX_USERS):
            USER_CREDENTIALS.append({strgen(12, string.ascii_uppercase + string.ascii_lowercase), strgen(12, string.ascii_uppercase + string.ascii_lowercase), strgen(12), strgen(12)})
        print("User list generated!")

        # with open('/mnt/locust/dataset/data_user_500.csv', 'rt') as f:
        #     reader = csv.reader(f)
        #     USER_CREDENTIALS = list(reader)
        # print("USER LIST LOADED!!")
    return 1

    
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
    
    @task
    def signup(self):
        # r = self.client.get("http://127.0.0.1:30080")
        # pq = PyQuery(r.content)
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
            logging.info('Error %s', response.status_code)

        time.sleep(random.randint(0.1, 2))

    @task
    def login(self):
        response = self.client.post("http://127.0.0.1:30081/signin", data = json.dumps({
            'email': self.email, 'password': self.password
        }), headers = {'Content-Type': 'application/json'})
        logging.info('RES=')
        logging.info(response)
        self.token = response.json()['token']
        logging.info('Login with token: %s ', self.token)

    @task
    def submit(self):
        self.client.post("http://127.0.0.1:30081/profile/" + self.certid, headers = {
            'authorization': self.token, 
            'Content-Type': 'application/json'
            })
        logging.info('%s just submitted the form', self.email)

    # @task
    # def profile(self):
    #     self.client.post("http://127.0.0.1:30081/profile", headers = {
    #         'authorization': self.token, 'Content-Type': 'application/json'
    #         })
    #     logging.info('%s just visited its profile page', self.email)

    # @task
    # def rank(self):
    #     self.client.get("http://127.0.0.1:30081/rank", headers = {
    #         'authorization': self.token, 'Content-Type': 'application/json'
    #         })
    #     logging.info('%s just visited the ranking page', self.email)

    @task
    def on_stop(self):
        self.interrupt()
        # self.environment.runner.quit()

class TestInit(HttpUser):
    tasks = [UserSignUpInAndRequest]
    host = "http://127.0.0.1:30081"
    sock = None
    dummy = ListGenerator()

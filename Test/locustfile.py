# This locust test script example will simulate a user 
# browsing the Locust documentation on https://docs.locust.io

import random
from locust import HttpUser, between, task
from pyquery import PyQuery


class DummyUser

class AwesomeUser(HttpUser):
    host = "https://rcd.debug.ovh"
    
    # we assume someone who is browsing the Locust docs, 
    # generally has a quite long waiting time (between 
    # 10 and 600 seconds), since there's a bunch of text 
    # on each page
    # wait_time = between(10, 600)



    # pq = PyQuery(r.content)
    # link_elements = pq(".toctree-wrapper a.internal")    
    
    def on_start(self):
        # start by waiting so that the simulated users 
        # won't all arrive at the same time
        self.wait()
        # assume all users arrive at the index page
        self.index_page()
        self.urls_on_current_page = self.toc_urls
    
    @task(10)
    def index_page(self):
        r = self.client.get("/")

    
    @task(50)
    def login(self):
        url = random.choice(self.toc_urls)
        r = self.client.get(url)
        pq = PyQuery(r.content)
        link_elements = pq("a.internal")
        self.urls_on_current_page = [
            l.attrib["href"] for l in link_elements
        ]
    
    @task(30)
    def load_sub_page(self):
        url = random.choice(self.urls_on_current_page)
        r = self.client.get(url)
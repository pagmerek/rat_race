from common import get_page, run_test
from selenium import webdriver
from selenium.webdriver.common.by import By


class CreateRoom:
    def __init__(self):
        self.driver = None

    def before_each(self):
        self.driver = webdriver.Chrome()
        self.driver.get(get_page('/'))

    def after_each(self):
        self.driver.close()

    def creates_room_successfully(self):
        room_name_form = self.driver.find_element(By.ID, "Room name")
        room_name_form.send_keys("ExampleRoom")
        self.driver.find_element_by_xpath("//input[@value='Stwórz pokój!']").click()
        self.driver.find_element_by_xpath("//div[contains(text(), 'localhost:5000/room/')]")

    def link_gives_access_to_room(self):
        room_name_form = self.driver.find_element(By.ID, "Room name")
        room_name_form.send_keys("ExampleRoom")
        self.driver.find_element_by_xpath("//input[@value='Stwórz pokój!']").click()

        element = self.driver.find_element_by_xpath("//div[contains(text(), 'localhost:5000/room/')]")
        url = element.get_attribute('innerHTML')
        self.driver.get('http://' + url)
        self.driver.find_element_by_xpath("//h6[contains(text(), 'ExampleRoom')]")

    def allows_to_specify_room_name(self):
        room_name_form = self.driver.find_element(By.ID, "Room name")

        room_name_form.send_keys("ExampleRoom")
        self.driver.find_element_by_xpath("//input[@value='Stwórz pokój!']").click()

        self.driver.find_element_by_xpath("//h3[contains(text(), 'Room ExampleRoom created!')]")

    def test(self):
        print('Testing: RRACE-RQ-1')

        self.before_each()
        run_test('TC01 - Creates room successfully', self.creates_room_successfully)
        self.after_each()

        self.before_each()
        run_test('TC02 - Link gives access to the room', self.link_gives_access_to_room)
        self.after_each()

        self.before_each()
        run_test('TC03 - Allows to specify room name', self.allows_to_specify_room_name)
        self.after_each()




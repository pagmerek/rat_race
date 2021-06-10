from selenium import webdriver
from selenium.webdriver.common.by import By
from common import get_page, run_test
import time


class CreateSpreadsheet:
    def __init__(self):
        self.driver = None

    def before_each(self):
        self.driver = webdriver.Chrome()
        self.driver.get(get_page('/'))
        room_name_form = self.driver.find_element(By.ID, "Room name")
        room_name_form.send_keys("ExampleRoom")
        self.driver.find_element_by_xpath("//input[@value='Stwórz pokój!']").click()

        element = self.driver.find_element_by_xpath("//div[contains(text(), 'localhost:5000/room/')]")
        url = element.get_attribute('innerHTML')
        self.driver.get('http://' + url)
        self.driver.find_element_by_xpath("//h6[contains(text(), 'ExampleRoom')]")

    def after_each(self):
        self.driver.close()

    def creates_spreadsheet_successfully(self):
        room_name_form = self.driver.find_element(By.ID, "Spreadsheet name")
        room_name_form.send_keys("ExampleSpreadsheet")
        self.driver.find_element(By.CLASS_NAME, "bi-plus").click()

    def spreadsheet_can_be_opened(self):
        room_name_form = self.driver.find_element(By.ID, "Spreadsheet name")
        room_name_form.send_keys("ExampleSpreadsheet1")
        self.driver.find_element(By.CLASS_NAME, "bi-plus").click()
        room_name_form = self.driver.find_element(By.ID, "Spreadsheet name")
        room_name_form.send_keys("ExampleSpreadsheet2")
        self.driver.find_element(By.CLASS_NAME, "bi-plus").click()
        self.driver.find_element_by_xpath("//a[contains(text(), 'ExampleSpreadsheet1')]").click()
        self.driver.find_element_by_xpath("//h1[contains(text(), 'ExampleSpreadsheet1')]")
        self.driver.find_element_by_xpath("//a[contains(text(), 'ExampleSpreadsheet2')]").click()
        self.driver.find_element_by_xpath("//h1[contains(text(), 'ExampleSpreadsheet2')]")

    def allows_to_specify_spreadsheet_name(self):
        room_name_form = self.driver.find_element(By.ID, "Spreadsheet name")
        room_name_form.send_keys("ExampleSpreadsheet other name")
        self.driver.find_element(By.CLASS_NAME, "bi-plus").click()
        self.driver.find_element_by_xpath("//h1[contains(text(), 'ExampleSpreadsheet other name')]")

    def test(self):
        print('Testing: RRACE-RQ-2')

        self.before_each()
        run_test('TC04 - Creates spreadsheet successfully', self.creates_spreadsheet_successfully)
        self.after_each()

        self.before_each()
        run_test('TC05 - Spreadsheet can be opened', self.spreadsheet_can_be_opened)
        self.after_each()

        self.before_each()
        run_test('TC06 - Allows to specify spreadsheet name', self.allows_to_specify_spreadsheet_name)
        self.after_each()

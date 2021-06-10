from selenium import webdriver
from selenium.webdriver.common.by import By
from common import get_page, run_test

import time


class CreateExercise:
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

        spreadsheet_name_form = self.driver.find_element(By.ID, "Spreadsheet name")
        spreadsheet_name_form.send_keys("ExampleSpreadsheet1")
        self.driver.find_element(By.CLASS_NAME, "bi-plus").click()
        self.driver.find_element_by_xpath("//a[contains(text(), 'ExampleSpreadsheet1')]").click()

    def after_each(self):
        self.driver.close()

    def creates_exercise_successfully(self):
        exercise_name_form = self.driver.find_element(By.ID, "Exercise label")
        exercise_name_form.send_keys("Example1")
        self.driver.find_element_by_xpath("//input[@value='Dodaj zadanie']").click()

    def lists_created_exercise_successfully(self):
        exercise_name_form = self.driver.find_element(By.ID, "Exercise label")
        exercise_name_form.send_keys("Example1")
        self.driver.find_element_by_xpath("//input[@value='Dodaj zadanie']").click()
        self.driver.find_element_by_xpath("//div[contains(text(), 'Example1')]")

    def exercise_blocked_before_timer(self):
        exercise_name_form = self.driver.find_element(By.ID, "Exercise label")
        exercise_name_form.send_keys("Example1")
        self.driver.find_element_by_xpath("//input[@value='Dodaj zadanie']").click()

        if self.driver.find_element_by_id("surname").is_enabled():
            raise Exception()

    def test(self):
        print('Testing: RRACE-RQ-3')

        self.before_each()
        run_test('TC07 - Creates exercise successfully', self.creates_exercise_successfully)
        self.after_each()

        self.before_each()
        run_test('TC08 - Lists exercise successfully', self.lists_created_exercise_successfully)
        self.after_each()

        self.before_each()
        run_test('TC09 - Exercise is blocked for 24h', self.exercise_blocked_before_timer)
        self.after_each()


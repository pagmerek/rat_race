from selenium import webdriver
from selenium.webdriver.common.by import By
from common import get_page, run_test

import time


class AssignExercise:
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

        exercise_name_form = self.driver.find_element(By.ID, "Exercise label")
        exercise_name_form.send_keys("Example1")
        self.driver.find_element_by_xpath("//input[@value='Dodaj zadanie']").click()
        exercise_name_form = self.driver.find_element(By.ID, "Exercise label")
        exercise_name_form.send_keys("Example2")
        self.driver.find_element_by_xpath("//input[@value='Dodaj zadanie']").click()
        time.sleep(5)


    def after_each(self):
        self.driver.close()

    def assign_exercise_successfully(self):
       assign_form_name = self.driver.find_elements_by_id("name")[0]
       assign_form_surname = self.driver.find_elements_by_id("surname")[0]
       assign_form_name.send_keys('test')
       assign_form_surname.send_keys('testowy')
       self.driver.find_element_by_id("assign_button").click()

    def show_correct_assignee_data(self):
       assign_form_name = self.driver.find_elements_by_id("name")[0]
       assign_form_surname = self.driver.find_elements_by_id("surname")[0]
       assign_form_name.send_keys('test')
       assign_form_surname.send_keys('testowy')
       self.driver.find_element_by_id("assign_button").click()
       self.driver.find_element_by_xpath("//p[contains(text(), 'test  testowy')]")

    def show_success_message(self):
       assign_form_name = self.driver.find_elements_by_id("name")[0]
       assign_form_surname = self.driver.find_elements_by_id("surname")[0]
       assign_form_name.send_keys('test')
       assign_form_surname.send_keys('testowy')
       self.driver.find_element_by_id("assign_button").click()
       self.driver.find_element_by_class_name('alert-success')


    def test(self):
        print('Testing: RRACE-RQ-4')

        self.before_each()
        run_test('TC10 - Assigns exercise successfully', self.assign_exercise_successfully)
        self.after_each()

        self.before_each()
        run_test('TC11 - Shows correct assignee data', self.show_correct_assignee_data)
        self.after_each()
        
        self.before_each()
        run_test('TC12 - Shows success message', self.show_success_message)
        self.after_each()
        
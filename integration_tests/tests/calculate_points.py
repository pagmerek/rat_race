from selenium import webdriver
from selenium.webdriver.common.by import By
from common import get_page, run_test

import time


class PointsCalc:
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

        spreadsheet_name_form = self.driver.find_element(By.ID, "Spreadsheet name")
        spreadsheet_name_form.send_keys("ExampleSpreadsheet2")
        self.driver.find_element(By.CLASS_NAME, "bi-plus").click()
        self.driver.find_element_by_xpath("//a[contains(text(), 'ExampleSpreadsheet2')]").click()

        exercise_name_form = self.driver.find_element(By.ID, "Exercise label")
        exercise_name_form.send_keys("Example1")
        self.driver.find_element_by_xpath("//input[@value='Dodaj zadanie']").click()
        exercise_name_form = self.driver.find_element(By.ID, "Exercise label")
        exercise_name_form.send_keys("Example2")
        self.driver.find_element_by_xpath("//input[@value='Dodaj zadanie']").click()

        self.driver.find_element_by_xpath("//a[contains(text(), 'ExampleSpreadsheet1')]").click()
        exercise_name_form = self.driver.find_element(By.ID, "Exercise label")
        exercise_name_form.send_keys("Example1")
        self.driver.find_element_by_xpath("//input[@value='Dodaj zadanie']").click()
        exercise_name_form = self.driver.find_element(By.ID, "Exercise label")
        exercise_name_form.send_keys("Example2")
        self.driver.find_element_by_xpath("//input[@value='Dodaj zadanie']").click()

        time.sleep(3)

        assign_form_name = self.driver.find_elements_by_id("name")[0]
        assign_form_surname = self.driver.find_elements_by_id("surname")[0]
        assign_form_name.send_keys('test')
        assign_form_surname.send_keys('test')
        self.driver.find_elements_by_id("assign_button")[0].click()
        time.sleep(2)
        assign_form_name = self.driver.find_elements_by_id("name")[0]
        assign_form_surname = self.driver.find_elements_by_id("surname")[0]
        assign_form_name.send_keys('test')
        assign_form_surname.send_keys('test')
        self.driver.find_elements_by_id("assign_button")[0].click()


    def after_each(self):
        self.driver.close()

    def accept_reassign_between_spreadsheets(self):
        self.driver.find_element_by_xpath("//a[contains(text(), 'ExampleSpreadsheet2')]").click()
        assign_form_name = self.driver.find_elements_by_id("name")[0]
        assign_form_surname = self.driver.find_elements_by_id("surname")[0]
        assign_form_name.send_keys('test')
        assign_form_surname.send_keys('test')
        self.driver.find_elements_by_id("assign_button")[0].click()

        time.sleep(0.5)
        assign_form_name = self.driver.find_elements_by_id("name")[1]
        assign_form_surname = self.driver.find_elements_by_id("surname")[1]
        assign_form_name.send_keys('thief')
        assign_form_surname.send_keys('test')
        self.driver.find_elements_by_id("assign_button")[0].click()
        self.driver.find_element_by_class_name('alert-success')


    def decline_reassign_between_spreadsheets(self):
        self.driver.find_element_by_xpath("//a[contains(text(), 'ExampleSpreadsheet2')]").click()
        assign_form_name = self.driver.find_elements_by_id("name")[0]
        assign_form_surname = self.driver.find_elements_by_id("surname")[0]
        assign_form_name.send_keys('thief')
        assign_form_surname.send_keys('test')
        self.driver.find_elements_by_id("assign_button")[0].click()

        time.sleep(0.5)
        assign_form_name = self.driver.find_elements_by_id("name")[1]
        assign_form_surname = self.driver.find_elements_by_id("surname")[1]
        assign_form_name.send_keys('test')
        assign_form_surname.send_keys('test')
        self.driver.find_elements_by_id("assign_button")[1].click()
        self.driver.find_element_by_class_name('alert-danger')

    def calculate_points_from_many_spreadsheets(self):
        for i in range(4):
            spreadsheet_name_form = self.driver.find_element(By.ID, "Spreadsheet name")
            spreadsheet_name_form.send_keys(f"ExampleSpreadsheet{i+3}")
            self.driver.find_element(By.CLASS_NAME, "bi-plus").click()
            self.driver.find_element_by_xpath(f"//a[contains(text(), 'ExampleSpreadsheet{i+3}')]").click()
            
            exercise_name_form = self.driver.find_element(By.ID, "Exercise label")
            exercise_name_form.send_keys("Example1")
            self.driver.find_element_by_xpath("//input[@value='Dodaj zadanie']").click()
        time.sleep(2)

        for i in range(4):
            self.driver.find_element_by_xpath(f"//a[contains(text(), 'ExampleSpreadsheet{i+3}')]").click()
            assign_form_name = self.driver.find_elements_by_id("name")[0]
            assign_form_surname = self.driver.find_elements_by_id("surname")[0]
            assign_form_name.send_keys('test')
            assign_form_surname.send_keys('test')
            self.driver.find_elements_by_id("assign_button")[0].click()
        
        for i in range(3):
            self.driver.find_element_by_xpath(f"//a[contains(text(), 'ExampleSpreadsheet{i+3}')]").click()
            assign_form_name = self.driver.find_elements_by_id("name")[0]
            assign_form_surname = self.driver.find_elements_by_id("surname")[0]
            assign_form_name.send_keys('thief')
            assign_form_surname.send_keys('test')
            self.driver.find_elements_by_id("assign_button")[0].click()
            self.driver.find_element_by_class_name('alert-success')

        self.driver.find_element_by_xpath(f"//a[contains(text(), 'ExampleSpreadsheet6')]").click()
        assign_form_name = self.driver.find_elements_by_id("name")[0]
        assign_form_surname = self.driver.find_elements_by_id("surname")[0]
        assign_form_name.send_keys('thief')
        assign_form_surname.send_keys('test')
        self.driver.find_elements_by_id("assign_button")[0].click()
        self.driver.find_element_by_class_name('alert-danger')

    def test(self):
        print('Testing: RRACE-RQ-6')

        self.before_each()
        run_test('TC17 - Accept reassign between spreadsheets', self.accept_reassign_between_spreadsheets)
        self.after_each()

        self.before_each()
        run_test('TC19 - Decline reassign between spreadsheets', self.decline_reassign_between_spreadsheets)
        self.after_each()
        
        self.before_each()
        run_test('TC18 - Reassigns for many spreadsheets', self.calculate_points_from_many_spreadsheets)
        self.after_each()
        

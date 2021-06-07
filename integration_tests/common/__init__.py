def get_page(path):
    return f'http://localhost:5000{path}'


def run_test(test_name, test_func):
    try:
        test_func()
        print(f'- {test_name}: passed')
    except Exception as ins:
        print(f'- {test_name}: failed')
        raise ins
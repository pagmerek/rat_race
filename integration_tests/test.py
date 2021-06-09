from tests import CreateRoom, CreateSpreadsheet, CreateExercise, AssignExercise, ReassignExercise, PointsCalc


def main():
    CreateRoom().test()
    CreateSpreadsheet().test()
    CreateExercise().test()
    AssignExercise().test()
    ReassignExercise().test()
    PointsCalc().test()
if __name__ == "__main__":
    main()


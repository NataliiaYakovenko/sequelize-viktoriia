const { sequelize, Student } = require("./models");

(async function () {
  try {
    // Синхронізуємо базу даних
    await sequelize.sync({ force: true });
    console.log("Базу даних синхронізовано");

    // Створення нового студента
    const newStudent = {
      firstName: "Jon",
      lastName: "Down",
      email: "down1@gmail.com",
      birthday: "1998-12-23",
      isMale: true, // виправлено з isNale
    };

    const createdStudent = await Student.create(newStudent);
    console.log(createdStudent.get());
  } catch (err) {
    console.error("Помилка:", err);
  }
})();

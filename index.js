const { where } = require('sequelize');
const { sequelize, Student } = require('./models');
const { Op } = require('sequelize');

(async function () {
  try {
    // Синхронізуємо базу даних
    await sequelize.sync({ force: true });
    console.log('Базу даних синхронізовано');

    // Створення нового студента
    const newStudent = {
      firstName: 'Jon',
      lastName: 'Down',
      email: 'down1@gmail.com',
      birthday: '1998-12-23',
      isMale: true, // виправлено з isNale
    };

    const createdStudent = await Student.create(newStudent);
    console.log(createdStudent.get());
  } catch (err) {
    console.error('Помилка:', err);
  }

  const foundStudent = await Student.findAll({ raw: true });
  console.log(foundStudent);

  const foundOneStudent = await Student.findByPk(1, { raw: true });
  console.log(foundOneStudent);

  const foundStudents1 = await Student.findAll({
    raw: true,
    // attributes: ['firstName', 'email'],
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  console.log(foundStudents1);

  const foundStudents2 = await Student.findAll({
    raw: true,
    order: [['id', 'DESC']],
    limit: 2,
    offset: 2,
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  console.log(foundStudents2);

  const foundStudentsByPk = await Student.findByPk({
    raw: true,
    where: { id: 3 },
  });
  console.log(foundStudentsByPk);

  const foundStudents3 = await Student.findAll({
    raw: true,
    where: {
      isMale: true,
      email: '@gmail',
    },
  });
  console.log(foundStudents3);

  const foundStudents4 = await Student.findAll({
    raw: true,
    where: {
      [Op.or]: [{ id: 1 }, { email: '@gmail' }],
    },
  });
  console.log(foundStudents4);

  const foundStudents5 = await Student.findAll({
    raw: true,
    where: {
      [Op.or]: [{ isMale: trye }, { activitiesCount: 0 }],
    },
  });
  console.log(foundStudents5);

  const foundCount = await Student.findAll({
    raw: true,
    attributes: [sequelize.fn('COUNT', sequelize.col[id])],
  });
  console.log(foundCount);

  const foundStudent6 = await Student.findAll({
    raw: true,
    attributes: {
      include: [[sequelize.fn('age', sequelize.col('birthday')), 'stud_age']],
    },
  });
  console.log(foundStudent6);

  const foundStudents = await Student.findAll({
    raw: true,
    attributes: [
      'isMale',
      [
        sequelize.fn('sum', sequelize.col('activitiesCount')),
        'stud_activitiesCount',
      ],
    ],
    group: 'isMale',
    having: sequelize.literal('sum("activitiesCount") >= 0'),
  });
  console.log(foundStudents);

  const updateStudent = await Student.update(
    { firstName: 'Ivo' },
    {
      where: { id: 1 },
      raw: true,
      returning: true,
    }
  );
  console.log(updateStudent[1][0]);

  const deletedStudCount = await Student.destroy({
    where: {
      id: 1,
    },
  });
  console.log('deletedStudCount :>> ', deletedStudCount);
})();

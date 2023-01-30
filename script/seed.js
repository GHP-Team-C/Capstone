"use strict";

const {
  db,
  models: { User, Lesson,Note },
} = require("../server/db");

const noteData = require('./data/note');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Notes
  const note = await Promise.all(
    noteData.map((data) => {
      return Note.create(data);
    })
  );

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      email: "cody@cody.edu",
      firstName: "Cody",
      lastName: "Pug",
      password: "123",
    }),
    User.create({
      username: "murphy",
      email: "murphy@murphy.gov",
      firstName: "Murphy",
      lastName: "Octopus",
      password: "123",
    }),
  ]);

  // Creating Lessons
  const lessons = await Promise.all([
    Lesson.create({
      name: "CMaj",
      level: "beginner",
    }),
    Lesson.create({
      name: "CMin",
      level: "intermediate",
    }),
  ]);

  await Promise.all(
    [users[0].addLesson(1)],
    [users[0].addLesson(2)],
    [users[1].addLesson(2)]
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${lessons.length} lessons`);
  console.log(`seeded ${note.length} lessons`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;

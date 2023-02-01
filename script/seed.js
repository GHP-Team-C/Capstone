"use strict";

const {
  db,
  models: { User, Lesson, Note, Staff, Slide },
} = require("../server/db");

const noteData = require('./data/note');
const staffData = require('./data/staff');
const lessonData = require('./data/lesson');
const slideData = require('./data/slide');
const note = require("./data/note");


/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Notes
  const notes = await Promise.all(
    noteData.map((data) => {
      return Note.create(data);
    })
  );

  // Creating Staff
  const staffs = await Promise.all(
    staffData.map((data) => {
      return Staff.create(data);
    })
  );

  // Creating Lessons
  const lessons = await Promise.all(
    lessonData.map((data) => {
      return Lesson.create(data);
    })
  );
   // Creating Slides
   const slides = await Promise.all(
    slideData.map((data) => {
      return Slide.create(data);
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

await Promise.all(
  [lessons[0].setUser(1)],
  [lessons[1].setUser(2)],
  [lessons[2].setUser(1)],
)


  //NEED TO ADD NOTES TO ALL STAFFS
await Promise.all(
  notes.map((note, idx)=>staffs.forEach((staff, idx)=>note.addStaff(idx+1))
))

  await Promise.all(
    [lessons[0].addSlides([1,2,3])],
    [lessons[1].addSlides([4,5,6])],
    [lessons[2].addSlides([7,8])]
  )

  await Promise.all(
    staffs.map((staff,idx)=>staff.setSlide(idx+1))
  )



  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${lessons.length} lessons`);
  console.log(`seeded ${notes.length} lessons`);
  console.log(`seeded ${staffs.length} lessons`);
  console.log(`seeded ${slides.length} slides`);
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

"use strict";

const {
  db,
  models: { User, Lesson, Note, Staff, Slide, Piano, UserComment, Comment },
} = require("../server/db");

const noteData = require("./data/note");
const lessonData = require("./data/lesson");
const slideData = require("./data/slide");
//const commentData = require("./data/comment");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Notes
  const notes = await Note.bulkCreate(noteData);
  // Creating Lessons
  const lessons = await Lesson.bulkCreate(lessonData);
  // Creating Slides
  const slides = await Slide.bulkCreate(slideData);

  // Creating Staffs
  const trebleClef = {
    timeSig: "4/4",
    clef: "treble",
  };
  //make a staff for every slide:
  let staffData = [];

  for (let i = 0; i < slides.length; ++i) staffData.push(trebleClef);

  const staffs = await Promise.all(
    staffData.map((data) => {
      return Staff.create(data);
    })
  );

  // Creating Users

  const avatars = ["wholey.png", "eighthy.png", "twoEighthy.png"];

  const users = await Promise.all([
    User.create({
      username: "codie",
      email: "codie@augmentEd.com",
      firstName: "Codie",
      lastName: "Ellington",
      password: "123",
      avatarUrl: `/avatars/${avatars[Math.floor(Math.random() * 3)]}`,
    }),
    User.create({
      username: "toni",
      email: "toni@augmentEd.com",
      firstName: "Toni",
      lastName: "Holiday",
      password: "123",
      avatarUrl: `/avatars/${avatars[Math.floor(Math.random() * 3)]}`,
    }),
  ]);

  //Creating UserComments
  /*  const comments = await Promise.all(
    commentData.map((data) => {
      return Comment.create(data);
    })
  ); */

  //Assigning UserComment to Lessons
  /*  await Promise.all(
    [lessons[0].addComments([1,2,3])],
    [lessons[1].addComments([4,5])]
  ); */

  /*   await Promise.all(
    [users[0].addComments([3,5,2])],
    [users[1].addComments([1,4])]
  ); */

  //Creating Pianos
  // const pianos = await Promise.all([
  //   Piano.create({
  //     keys: "a4, b4, c4, g#4",
  //   }),
  // ]);

  //Assign Piano to slide
  const piano = { keys: "c4, e4, g4, b4" };

  await Promise.all([
    slides.map((slide, idx) =>
      idx % 2
        ? slide.createPiano({ keys: "a4, b4, c4, g#4" })
        : slide.createPiano(piano)
    ),
  ]);

  // Creating Lessons

  await Promise.all(
    [lessons[0].setUser(1)],
    [lessons[1].setUser(1)],
    [lessons[2].setUser(1)],
    [lessons[3].setUser(1)],
    [lessons[4].setUser(1)],
    [lessons[5].setUser(1)],
    [lessons[6].setUser(1)],
    [lessons[7].setUser(1)],
    [lessons[8].setUser(1)]
  );

  //ADD NOTES TO ALL STAFFS
  await Promise.all(
    staffs.map((staff, idx) => {
      staff.addNotes([1 + 4 * idx, 2 + 4 * idx, 3 + 4 * idx, 4 + 4 * idx]);
    })
  );

  await Promise.all(
    [lessons[0].addSlides([1, 2, 3, 4, 5])],
    [lessons[1].addSlides([6, 7, 8, 9, 10, 11])],
    [lessons[2].addSlides([12, 13, 14, 15, 16])],
    [lessons[3].addSlides([17, 18])],
    [lessons[4].addSlides([19, 20])],
    [lessons[5].addSlides([21, 22])],
    [lessons[6].addSlides([23, 24])],
    [lessons[7].addSlides([25, 26])],
    [lessons[8].addSlides([27, 28])]
  );

  await Promise.all(staffs.map((staff, idx) => staff.setSlide(idx + 1)));

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${lessons.length} lessons`);
  console.log(`seeded ${notes.length} notes`);
  console.log(`seeded ${staffs.length} staffs`);
  console.log(`seeded ${slides.length} slides`);
  //console.log(`seeded ${comments.length} slides`);
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

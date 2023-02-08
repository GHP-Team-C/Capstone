"use strict";

const {
  db,
  models: { User, Lesson, Note, Staff, Slide, Piano, UserComment, Comment },
} = require("../server/db");

const noteData = require("./data/note");
const staffData = require("./data/staff");
const lessonData = require("./data/lesson");
const slideData = require("./data/slide");
const commentData = require("./data/comment");


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

  const avatars = ['Wholey.jpg', 'Eighthy.jpg', 'TwoEighthy.jpg']

  const users = await Promise.all([
    User.create({
      username: "cody",
      email: "cody@cody.edu",
      firstName: "Cody",
      lastName: "Pug",
      password: "123",
      avatarUrl: `/avatars/${avatars[Math.floor(Math.random() * 3)]}`
    }),
    User.create({
      username: "murphy",
      email: "murphy@murphy.gov",
      firstName: "Murphy",
      lastName: "Octopus",
      password: "123",
      avatarUrl: `/avatars/${avatars[Math.floor(Math.random() * 3)]}`
    }),
  ]);

  //Creating UserComments
  const comments = await Promise.all(
    commentData.map((data) => {
      return Comment.create(data);
    })
  );

  console.log(Object.keys(Lesson.prototype))

  //Assigning UserComment to Lessons
  await Promise.all(
    [lessons[0].addComments([1,2,3])],
    [lessons[1].addComments([4,5])]
  );

  await Promise.all(
    [users[0].addComments([3,5,2])],
    [users[1].addComments([1,4])]
  );

  //Creating Pianos
  // const pianos = await Promise.all([
  //   Piano.create({
  //     keys: "a4, b4, c4, g#4",
  //   }),
  // ]);

  //Assign Piano to slide
  const piano = {keys: "c4, e4, g4, b4"}

  await Promise.all([
    slides.map((slide, idx) => idx%2 ? slide.createPiano({ keys: "a4, b4, c4, g#4" }) : slide.createPiano(piano)),
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


  //NEED TO ADD NOTES TO ALL STAFFS
  await Promise.all(
    staffs.map((staff, idx) => {
      idx % 2 ? staff.addNotes([5, 6, 7, 8]) : staff.addNotes([1, 2, 3, 4]);
    })
  );

  await Promise.all(
    [lessons[0].addSlides([1, 2, 3])],
    [lessons[1].addSlides([4, 5, 6])],
    [lessons[2].addSlides([7, 8, 9])],
    [lessons[3].addSlides([10, 11, 12])],
    [lessons[4].addSlides([13, 14, 15])],
    [lessons[5].addSlides([16, 17, 18])],
    [lessons[6].addSlides([19, 20, 21])],
    [lessons[7].addSlides([22, 23, 24])],
    [lessons[8].addSlides([25, 26, 27])]
  );

  await Promise.all(staffs.map((staff, idx) => staff.setSlide(idx + 1)));

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${lessons.length} lessons`);
  console.log(`seeded ${notes.length} notes`);
  console.log(`seeded ${staffs.length} staffs`);
  console.log(`seeded ${slides.length} slides`);
  console.log(`seeded ${comments.length} slides`);
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

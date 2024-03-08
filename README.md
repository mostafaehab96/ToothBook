# ToothBook

**ToothBook** is the portfolio project for the 12-month ALX SE program.<br/>
It is a website service for manageing communication between dentists and patients during the diagnostic process and curing journey.

## Contents

- [Story](#story)
- [Functionalities](#functionalities)
- [Technology](#technology)
- [Third Party Services](#third-party-services)
- [Installation](#installation)
- [Usage](#usage)
- [Authors](#authors)

## Story

### preface

As a dental student, our college have a system for connecting us to the patients because we need to work on real patients in the last three years.

This system is a telegram group where the diagnosis team take the information needed from the patient and diagnose them and take some photos then upload these information in the group where every student can comment on the post.

The first student make the comment has the right to treat the patient and no one else should call the patient.

### problems

- The first problem when we open the group we search from the bottom to up so it’s like a stack the last in first out! So, many patients have the right to be treated first and no one contacts them.

- The second problem if some one commented on the post no one else should call the patient but some students do that!

- The third problem when we see a commented post we don’t open it but the student may forget about the patient or the patient is not indicated or refuses the treatment so there are many cases that should be handled to organize these issues.

### solution

- We thought about making a web app for handling the connection between patients and students where it can be a lot easier than the telegram group.

## Functionalities

- The app allows the diagnosis team (or any dental student) to add the information about the patient in a specific form and post it to the website.

- The students then can login to the website and contact the patient where every student have a limited number of patients to contact.

- Each student has a limited time of 5 days to contact the patient before the patient return to the active state where students can contact him again

- If the student contacted the patient and treated him the patient will be removed from the home page and if he found that the patient is not indicated for him the patient will return to the home page

- If he found that the patient is not cooperative or refuses the treatment the patient will be rejected and removed from the database

- Each student will have a list of the patients he treated and he can add a photos of the patient before and after

## Technology

<b>MERN stack</b> is going to be used to insure flexibility and coherence

![MERN stack](https://www.datocms-assets.com/48294/1671537942-mern-stack-1-mern-stack.png?auto=format)

## Third Party Services

- <b>Telegram APIs</b> can be used to allow posting to the original telegram app

- <b>Workbox</b> can be used to convert our website to a <b>PWA</b>

## Installation

## Usage

## Authors

- Mostafa Ehab [GitHub]() - [LinkedIn]()
- Mohamed Ghaly [GitHub](https://github.com/MohammedGhaly) - [LinkedIn](https://linkedin.com/in/mohammed-ghaly-16a401150)
- Ammar Khaled [GitHub](https://github.com/Ammar-Khaled) - [LinkedIn](https://www.linkedin.com/in/ammar-khaled-895aa823b)

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/HRDVt6Rd)
# Wordle

In this assignment, you will create a Wordle game with HTML, CSS, and JavaScript. To get a feeling of how it works, watch a recording of the game on D2L attached to the assignment. Also, make sure you read the [Notes](#page_with_curl-notes) at the end of this page.

:warning: You can work in groups of up to 3.

:warning: 50% of your assignment is demoing your work to the instructor! All members must be present for the demo.

---

## :foot: Steps
- Add your HTML code to the [index.html](./index.html) file
- Add your CSS code to the [style.css](./style.css) file
- Add your JavaScript code to the [wordle.js](./wordle.js) file
- Push your changes to the remote `main` branch

---

## :page_with_curl: Notes
- You need to have Docker installed to complete this assignment. You may already have it on your system. Open up a terminal and run `docker info`. If you get `command not found`, you need to install it first (download and install Docker Desktop). Once installed, open the application and let it run (don't close it!). `docker info` should now work on your system.
- Open up a terminal and run `docker run --rm -p 3338:3338 --name YOURNAMEANDSTUDENTID masoudkf/wordle:v1`. Remember to replace `YOURNAMEANDSTUDENTID` with your name and student id. e.g. `docker run --rm -p 3338:3338 --name alice30020089 masoudkf/wordle:v1`. Do not close the terminal! :warning: If you're on Windows, you may be asked about Docker using a port on your system. Give it permission to use it. Don't worry! It's just listening on a specific port.
- The page reads a dictionary of words from this endpoint: `http://localhost:3338/wordle`. Note that the Docker container you started in the previous step must be still running!
- Here's a sample response of what the endpoint returns. It returns a `JSON` object. You don't need to be concerned about the `statusCode` property; what you want is `dictionary`:

    ```json
    [
        {
          "word": "Arya",
          "hint": "A character on Game of Thrones"
        },
        {
          "word": "Ross",
          "hint": "Pivot! Pivot!"
        }
    ]
    ```
- Unlike the original Wordle game, you don't need to check if the word exists in the dictionary.
- You only read from the endpoint **once** per page refresh. Hitting the `Start Over` button shouldn't send another request if the user hasn't refreshed the page. It only picks a random new word from the already-loaded dictionary. You can generate a random number between 0 and N using the following code:
    ```javascript
    Number.parseInt(Math.random() * N)
    ```
- The `Start Over` button should become `disabled` while the code is getting the dictionary from the endpoint for the first time, and say `Loading...`.
- You need to capture key events from the user and populate the boxes. The key event used in the demo is `keyup`, and the boxes are marked up using the `table` element. But feel free to change that.
- Users can use the `Backspace` key to remove characters from the word.
- Users must use the `Enter` key to submit an answer. On Mac OS, the key is called `Return`, but the key code is the same.
- If a user hits the `Enter` key while the word is not complete, the page should alert the user to finish the word first. You can use `window.alert("first complete the word")` for this.
- After a word submission:
    - Letters in the right spot should get a green background
    - Letters in the word but in the wrong spot should get a yellowish background
    - Letters not in the word should get a gray background 
- At any time in the game, users can use the `?` icon on the menu to see a hint about the word. This hint is part of the dictionary returned from the endpoint.
- When a user wins, the page should show a congratulation image. You can find the one used in the demo [here](https://res.cloudinary.com/mkf/image/upload/v1675467141/ENSF-381/labs/congrats_fkscna.gif).
- When a user loses, they should get a message with a red background saying they couldn't guess the word and lost.
- The `i` icon in the menu shows the game instructions.
- The Moon icon in the menu can toggle the page from Light to Dark theme.
- I didn't use any CSS framework for the layout, but feel free to use one if you want.
- The icons on the menu are HTML characters (`&#9681;` for the Dark Mode icon; `&#63;` for the Hint icon; and `&#9432;` for the Game Instructions icon).
- You're only allowed to use vanilla JavaScript (JavaScript without any external libraries, such as React) for this assignment.

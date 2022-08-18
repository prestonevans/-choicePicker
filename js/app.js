const textArea = document.querySelector('textarea');
const displayChoices = document.querySelector('.display-choices');

let intervalId;

textArea.addEventListener('keyup', (e) => {
  if (e.code !== 'Enter') return;
  if (e.target.value.trim().length === 0) {
    e.target.value = '';
    return;
  }

  const arrayOfStrings = e.target.value
    .split(',')
    .map((choice) => choice.trim());

  display(arrayOfStrings);
  randomActiveClass(arrayOfStrings);
  finalChoice(Math.floor(Math.random() * arrayOfStrings.length));
});

function display(arrayOfStrings) {
  displayChoices.innerHTML = '';
  arrayOfStrings.forEach((choiceString) => {
    const choiceBlock = document.createElement('div');
    choiceBlock.classList.add('choice-block');
    choiceBlock.innerText = choiceString;

    displayChoices.append(choiceBlock);
  });
}

function randomActiveClass(arrayOfStrings) {
  intervalId = setInterval(() => {
    const choices = document.querySelectorAll('.choice-block');
    choices.forEach((choice) => choice.classList.remove('active'));

    choices[Math.floor(Math.random() * arrayOfStrings.length)].classList.add(
      'active'
    );
  }, 200);
}

function finalChoice(randomChoice) {
  setTimeout(
    () => {
      const choices = document.querySelectorAll('.choice-block');

      clearInterval(intervalId);
      choices.forEach((choice) => choice.classList.remove('active'));
      choices[randomChoice].classList.add('active');
    },
    200 * 10,
    randomChoice
  );
}

const textArea = document.querySelector('textarea');
const displayChoices = document.querySelector('.display-choices');
const intervalLenght = 200;
const numberOfAnimationRepeats = 20;

let intervalId;

textArea.addEventListener('keyup', (e) => {
  if (e.code !== 'Enter') return;
  if (e.target.value.trim().length === 0) {
    e.target.value = '';
    return;
  }

  const arrayOfStrings = e.target.value
    .split(',')
    .map((choice) => choice.trim())
    .filter((choice) => choice.length !== 0);

  renderChoices(arrayOfStrings);
  randomChoiceAnimation(arrayOfStrings.length);
  finalChoice(Math.floor(Math.random() * arrayOfStrings.length));
});

function renderChoices(arrayOfStrings) {
  displayChoices.innerHTML = '';
  arrayOfStrings.forEach((choiceString) => {
    const choiceBlock = document.createElement('div');
    choiceBlock.classList.add('choice-block');
    choiceBlock.innerText = choiceString;

    displayChoices.append(choiceBlock);
  });
}

function randomChoiceAnimation() {
  intervalId = setInterval(() => {
    const choices = document.querySelectorAll('.choice-block');
    let previousValue;
    choices.forEach((choice, index) => {
      if (choice.classList.contains('active')) previousValue = index;
      choice.classList.remove('active');
    });

    choices[roundRobinRandomizer(previousValue, choices.length)].classList.add(
      'active'
    );
  }, intervalLenght);
}

function roundRobinRandomizer(previousValue, numberOfChoices) {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * numberOfChoices);
  } while (randomIndex === previousValue);
  return randomIndex;
}

function finalChoice(randomChoiceIndex) {
  setTimeout(
    () => {
      const choices = document.querySelectorAll('.choice-block');

      clearInterval(intervalId);
      choices.forEach((choice) => choice.classList.remove('active'));
      choices[randomChoiceIndex].classList.add('active');
    },
    intervalLenght * numberOfAnimationRepeats,
    randomChoiceIndex
  );
}

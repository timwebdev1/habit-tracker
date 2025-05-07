const habitList = [];

function loadHabits() {
  const storedHabits = localStorage.getItem("habits");
  if (storedHabits) {
    const parsedHabits = JSON.parse(storedHabits);
    habitList.push(...parsedHabits);
  }
  renderHabits();
}

function addHabit() {
  const input = document.getElementById("habit");
  const value = input.value.trim();

  if (!value) return;

  const habit = {
    id: Date.now(),
    name: value,
    completed: false,
  };

  habitList.push(habit);
  saveHabits();
  renderHabits();
  input.value = "";
}

function saveHabits() {
  return localStorage.setItem("habits", JSON.stringify(habitList));
}

document.getElementById("habit-form").addEventListener("submit", function (e) {
  e.preventDefault();
  addHabit();
});


function renderHabits() {
  habitList.sort((a, b) => a.completed - b.completed);
  const habitContainer = document.getElementById('habit-list');
  habitContainer.innerHTML = '';

  for(const habit of habitList) {
    const card = document.createElement('div');
    card.classList.add('p-4', 'rounded-lg', 'shadow', 'bg-white');
    card.setAttribute('data-id', habit.id);

    const title = document.createElement('h3');
    title.textContent = habit.name;
    if (habit.completed) {
      title.classList.add('line-through', 'text-gray-400');
    } else {
      title.classList.add('font-semibold', 'text-gray-800');
    }
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = habit.completed;

    checkbox.addEventListener('change', function() {
      const id = card.getAttribute('data-id');
      const habitToUpdate = habitList.find(h => h.id === Number(id));

      habitToUpdate.completed = !habitToUpdate.completed;
      saveHabits();
      renderHabits();
    })

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', function() {
      const id = card.getAttribute('data-id');
      const index = habitList.findIndex(h => h.id === Number(id));

      if (index !== -1) {
        habitList.splice(index, 1);
        saveHabits();
        renderHabits();
      }
    })

    card.appendChild(title);
    card.appendChild(checkbox);
    card.appendChild(deleteBtn);

    habitContainer.appendChild(card);
  }
}

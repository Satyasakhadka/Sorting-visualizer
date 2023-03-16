let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let select_algo = document.getElementById("algo");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = slider.value;
let numOfBars = slider.value;
let heightFactor = 4;
let speedFactor = 100;
let unsorted_array = new Array(numOfBars);
//whenever the slider is moved this function is triggered
slider.addEventListener("input", function () {
  //the numberofbars and maxrange is changed
  numOfBars = slider.value;
  maxRange = slider.value;
  //the bar container element is cleared and unsorted array is assigned with new random array
  bars_container.innerHTML = "";
  unsorted_array = createRandomArray();
  //the new random array is rendered
  renderBars(unsorted_array);
});

speed.addEventListener("change", (e) => {
  //changes the string value of speed input to integer
  speedFactor = parseInt(e.target.value);
});


//if we have multiple sorting option in dropdown menu then we use this
let algotouse = "";

select_algo.addEventListener("change", function () {
  algotouse = select_algo.value;
});
//it generates the random integer function between the given range of max and min value
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//creates a random array
function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  }

  return array;
}
//usnsorted array  is given the value of random array
document.addEventListener("DOMContentLoaded", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});
//create a new div element for each element of array
function renderBars(array) {
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    //height is set by multiplying the the value of element of arry by heightfactor
    bar.style.height = array[i] * heightFactor + "px";
    //new bar element is added as child element of bars_container
    bars_container.appendChild(bar);
  }
}
//generate a new random array
randomize_array.addEventListener("click", function () {
  unsorted_array = createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
});
//to pause the execution of the code for a few milliseconds after each step , allowing the user to see the bars moving and changing positions on the screen.
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}



async function insertionSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
      bars[j + 1].style.backgroundColor = "red";
      //bars[j + 1].innerText = array[j + 1];
      await sleep(speedFactor);

      for (let k = 0; k < bars.length; k++) {
        if (k != j + 1) {
          bars[k].style.backgroundColor = "aqua";
        }
      }
      j = j - 1;
    }
    array[j + 1] = key;
    bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
    bars[j + 1].style.backgroundColor = "lightgreen";
    //bars[j + 1].innerText = array[j + 1];
    await sleep(speedFactor);
  }

  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "aqua";
  }
  return array;
}





async function mergeSort(arr, start = 0, end = arr.length - 1) {
  //all the elements that fall under class bar are stored in bars variable
  let bars = document.getElementsByClassName("bar");
  //base case
  if (start >= end) {
    return;
  }
  //dividing array into two halves
  const middle = Math.floor((start + end) / 2);
  //recursively call the function until base case is achieved
  await mergeSort(arr, start, middle);
  await mergeSort(arr, middle + 1, end);

  let i = start;
  let j = middle + 1;
  let k = start;
  //new array to store the sorted array
  let temp = new Array(end - start + 1);
  //compare the elements of two arrays and insert in the new array
  while (i <= middle && j <= end) {
    if (arr[i] < arr[j]) {
      temp[k - start] = arr[i];
      i++;
    } else {
      temp[k - start] = arr[j];
      j++;
    }
    k++;
  }
//copy the remaining element of right sub array and left sub array
  while (i <= middle) {
    temp[k - start] = arr[i];
    i++;
    k++;
  }

  while (j <= end) {
    temp[k - start] = arr[j];
    j++;
    k++;
  }
  //copy temp array back to original array
  for (let i = start; i <= end; i++) {
    arr[i] = temp[i - start];
    //update the height of the bars to reflect the sorted order
    bars[i].style.height = arr[i] * heightFactor + "px";
    bars[i].style.backgroundColor = "red";
    bars[i].classList.add("sorted");
    await sleep(speedFactor);
  }
  for (let k = start; k <=end; k++) {
    bars[k].style.backgroundColor = "lightgreen";
  }

}




// ----------------

async function quickSort(items, left, right) {
  var index;
  let bars = document.getElementsByClassName("bar");
  if (items.length > 1) {
    index = await partition(items, left, right); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      await quickSort(items, left, index - 1);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      await quickSort(items, index, right);
    }
  }

  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "aqua";
  }
  return items;
}



async function partition(items, left, right) {
  let bars = document.getElementsByClassName("bar");
  let pivotIndex = Math.floor((right + left) / 2);
  var pivot = items[pivotIndex]; //middle element
  bars[pivotIndex].style.backgroundColor = "red";

  for (let i = 0; i < bars.length; i++) {
    if (i != pivotIndex) {
      bars[i].style.backgroundColor = "aqua";
    }
  }

  (i = left), //left pointer
    (j = right); //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      await swap(items, i, j, bars); //sawpping two elements
      i++;
      j--;
    }
  }
  return i;
}

// -----------





async function SelectionSort(arr) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < arr.length - 1; i++) {
    let k = i;
    bars[k].style.backgroundColor = "red";
    for (let j = k + 1; j < arr.length; j++) {
      bars[j].style.backgroundColor = "yellow";
      await sleep(speedFactor);
      if (arr[j] < arr[k]) {
        if (k != i) {
          bars[k].style.backgroundColor = "aqua";
        }
        k = j;
        bars[k].style.backgroundColor = "red";
      } else {
        bars[j].style.backgroundColor = "aqua";
      }
    }
    await sleep(speedFactor);
    swap(arr, i, k, bars);
    bars[k].style.backgroundColor = "aqua";
    bars[i].style.backgroundColor = "green";
    bars[i].style.height = arr[i] * heightFactor + "px";
  }
  bars[arr.length - 1].style.backgroundColor = "green";
}

async function swap(array, i, j, bars) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  bars[i].style.height = array[i] * heightFactor + "px";
  bars[j].style.height = array[j] * heightFactor + "px";
  bars[i].style.backgroundColor = "red";
  bars[j].style.backgroundColor = "red";
  await sleep(speedFactor);
  bars[i].style.backgroundColor = "aqua";
  bars[j].style.backgroundColor = "aqua";
  // bars[i].innerText = array[i];
  // bars[j].innerText = array[j];
  return array;
}

sort_btn.addEventListener("click", function () {
  

  switch (algotouse) {
    case "merge":
      mergeSort(unsorted_array);
      break;

      case "insertion":
      insertionSort(unsorted_array);
      break;

      case "selection":
      SelectionSort(unsorted_array);
      break;

      case "quick":
      console.log(unsorted_array.length);
      quickSort(unsorted_array, 0, unsorted_array.length - 1);
      break;

      default:
      insertionSort(unsorted_array);
      break;
}
});





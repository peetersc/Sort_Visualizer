
/*
  sketch.js: Main sorting animation view
  Alex: Responsible for animation
  Last Updated: 7/9/20 @ 4:00pm by Alex
*/
import {sortType,beginSort,arraySize, sliderVal} from '../Home'

export default function sortingSketch (p){
    const height = 300
    const width = window.innerWidth / 1.307
    let barWidth = width / (arraySize);
    let sortArray =[];
    let arrayColor=[];
    let iterator;
    let paused;
    let piv;
    p.setup =function (){
        p.createCanvas(width,height);
        resetArray();
    };
    function resetArray() {
        sortArray=new Array(arraySize);
        arrayColor=new Array(arraySize);
        for (let i = 0; i < sortArray.length; i++) {
            sortArray[i]=p.random(height);
            //arrayColor[i]=-1;
            arrayColor[i]='floralwhite';
        }
        paused=false;            
        iterator = tempGenerator();

    }
    function *tempGenerator(){
        while(true)
        yield;
    }
    p.draw =function (){
        // Scale and translate are done so that the origin is in the bottom left
        // instead of the top left, and so that rectangles are drawn from the
        // bottom up instead of top down.
        p.scale(1,-1);
        p.translate(0, -height);
        p.background(38, 38, 38);
        p.stroke(0);    
        if(beginSort.isPressed)
        {
            resetArray();
            beginSort.isPressed=false;        
        }
        if (beginSort.active){
            if(sortType.find(elem=>elem.active ===true).id===0)//bubble sort
            {
                iterator = bubbleSort(sortArray);
            }
            else if(sortType.find(elem=>elem.active ===true).id===1)
            {
                iterator=quicksort(sortArray,0,arraySize);      

            }
            else if(sortType.find(elem=>elem.active ===true).id===2)
            {
                iterator=mergeSort(sortArray,0,arraySize);
            } 
            else if(sortType.find(elem=>elem.active ===true).id===3)
            {
                iterator=insertionSort(sortArray);
            } 
            else if(sortType.find(elem=>elem.active ===true).id===4)
            {
                iterator=selectionSort(sortArray);
            }                
               
            beginSort.active=false;

        } 
        if(!paused){
             if(iterator.next().done)
             {
                for (let i = 0; i < arraySize; i++) {
                    arrayColor[i]='DarkSeaGreen';
                }
             }
        }
        
       
        for (let i = 0; i < arraySize; i++) {
            p.fill(arrayColor[i]);
            p.rect(i*barWidth, 0, barWidth, sortArray[i]);//rectangle(starting x coordinate from the bottom of canvas,starting y coord, width of rect, height )
        }   
    }

    //sleep function to use with the slider speed on the sorting functions. can only use with async functions
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    async function* bubbleSort() {
      //can go 0 to 1250. 100-speed because speed works with sleeps so its inverted
      let speed=sliderVal;
      speed=100-speed;
      speed*=12.5;

        for (let i = sortArray.length-1; i > 0; i--) {
          //pause before each outer loop iteration
          await sleep(speed*.5)
            for (let j = 0; j < i; j++) {
              //sets the elements being compared to different colors
              arrayColor[j+1] = 'Maroon ';
              arrayColor[j] = 'blue ';
              //quick pause at the start of every inner loop iteration to show the elements being compared
              await sleep(speed*.25)
              yield;
              //swap them back to their original colors
              arrayColor[j+1]='floralwhite ';
              arrayColor[j]='floralwhite ';
              if (sortArray[j] > sortArray[j + 1]) {
                //if a swap is needed, switch them back to the comparison colors and do a quick pause
                arrayColor[j+1] = 'Maroon ';
                arrayColor[j] = 'blue ';
                await sleep(speed*.25)
                //swap them and swap their colors
                swap(sortArray, j, j + 1);
                arrayColor[j+1] = 'blue ';
                arrayColor[j] = 'Maroon ';
                //do a quick pause to show they swapped, then set the swapped element to a specific color 
                //and the other element to its original color
                await sleep(speed*.25)
                arrayColor[j] = 'indigo ';
                arrayColor[j+1] = 'floralwhite ';
              }
            }
            //set all elements swapped along the way of the inner loop back to their original colors
            for (let k = 0; k < i; k++) {
              arrayColor[k]='floralwhite ';
            }
            //set the ith iteration to green to mark its sorted and wont be touched again
            arrayColor[i]='DarkSeaGreen';
          }
        arrayColor[0]='DarkSeaGreen';
    }


    async function* partition(arr, low, high, speed) {
      var pivot = arr[high - 1];
      piv = low;
      for (let j = low; j < high; j++) {

        //initialize the starying and ending points with the same color
        arrayColor[low] = 'green';
        arrayColor[high - 1] = 'green';

        //sleep before begin the iteration
        await sleep(speed*.25)

        //every bar between the pivot and j gets marked as the same color
        if(j-1>low && arrayColor[j]=='floralwhite '){
          arrayColor[j-1] = 'indigo ';
        }

        //mark j as its own color
        arrayColor[j] = 'maroon ';

        //mark the pivot with its own color
          arrayColor[piv] = 'blue ';

          //if high-1 gets overriden by j on the last iteration, reset it
        arrayColor[high - 1] = 'green';
        yield;

        if (arr[j] < pivot) {
          //quick pause before the swap
          await sleep(speed*.25)
          swap(arr, piv, j);

          //swap the colors to show the swap, then do a quick pause
          arrayColor[j] = 'blue ';
          arrayColor[piv] = 'maroon ';
          await sleep(speed*.25)

          //swap j back, set the pivot to neutral, and set a new pivot
          arrayColor[j] = 'maroon ';
          arrayColor[piv]='floralwhite ';
          piv++
          arrayColor[piv] = 'blue ';
        }
      }
      swap(arr, piv, high - 1)
    }
    async function* quicksort(arr, low, high) {
    //can go 0 to 1250. 100-speed because speed works with sleeps so its inverted
    let speed=sliderVal;
    speed=100-speed;
    speed*=12.5;

    //reset everything back to neutral at the top of a recursive call
    for (let i = 0; i < sortArray.length; i++) {
      arrayColor[i]='floralwhite '
    }
    //then set all the sorted items to a color
    for (let i = 0; i < low; i++) {
      arrayColor[i]='DarkSeaGreen '
    }
      if (low < high) {
        yield* partition(arr, low, high, speed)
        yield* quicksort(arr, low, piv)
        yield* quicksort(arr, piv + 1, high)
      }
    }


    async function * insertionSort() {
      //can go 0 to 1250. 100-speed because speed works with sleeps so its inverted
      let speed=sliderVal;
      speed=100-speed;
      speed*=12.5;

      //set the first element to the sorted color
      arrayColor[0] = 'DarkSeaGreen ';

      for (let i = 1; i < sortArray.length; ++i) {
          let j = i - 1;

          while (j >= 0 && sortArray[j] > sortArray[i]) {
            //set i and j to their own colors, then do a quick pause
            arrayColor[i] = 'blue ';
            arrayColor[j] = 'maroon ';
            yield;
            await sleep(speed*.5)
            swap(sortArray, i, j);

            //show the color swap with a quick pause
            arrayColor[i] = 'blue ';
            arrayColor[j] = 'maroon ';
            await sleep(speed*.5)

            //set the sorted items to their own color
            arrayColor[j] = 'DarkSeaGreen ';
            swap(arrayColor, i--, j--);
          }
          
          //reset anything i overrode back to the sorted color
          arrayColor[i]='DarkSeaGreen '
        }
    }

    async function swap(arr, a, b) {
        let temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }


    async function* selectionSort(){                              // min selection sort
      //can go 0 to 1250. 100-speed because speed works with sleeps so its inverted
      let speed=sliderVal;
      speed=100-speed;
      speed*=12.5;
      for (let i = 0; i < sortArray.length; ++i) {        //traversing unsorted array
        //sleep at start of new iteration
        await sleep(speed*.25)
          let min_index = i;                              //find minimum element in unsorted array
          for (let j = i; j < sortArray.length; ++j) { 
            //reset the unsorted colors to neutral
            arrayColor[j] = 'floralwhite ';
          }
          //set the element to be swapped to its own color
          arrayColor[i] = 'green ';

          for (let j = i; j < sortArray.length; ++j) { 
            //set colors for comparisons
            arrayColor[j] = 'Maroon ';                        //current traversing index
            arrayColor[min_index] = 'blue';               //current min index

            //reset first element to its own color since first iter will override it
            arrayColor[i] = 'green ';
            //quick pause to show colors
            await sleep(speed*.25)
            yield;
            //trailing colors between min and i set to their own color
            arrayColor[j] = 'indigo ';                    
            arrayColor[min_index] = 'floralwhite ';             

            if (sortArray[j] < sortArray[min_index]) {    //comparison for smaller value
              min_index = j;
              //reset trailing colors once min changes
              for (let k = i; k < j; ++k) { 
                arrayColor[k] = 'floralwhite ';
              }
            }
          }

          // Swap with current element
          if (min_index !== i) {
            //swap and show changes with color swap
            arrayColor[min_index] = 'blue ';
            await sleep(speed*.5)
            swap(sortArray, i, min_index);
            arrayColor[i] = 'blue ';
            arrayColor[min_index] = 'green ';
            await sleep(speed*.25)
          }
          // Current element is correctly sorted
          arrayColor[i] = 'DarkSeaGreen';
          yield ;
        }
    }


    async function* merge(arr,low,middle,high){

        /*let i = low;
        let j = middle + 1;
        while (i <= middle && j <= high) {
          arrayColor[i] = 'IndianRed ';
          arrayColor[j] = 'IndianRed ';
          yield;
          arrayColor[i] = 'floralwhite ';
          arrayColor[j] = 'floralwhite ';
          if (arr[i] > arr[j]) {
            for (let k = i; k <= j; ++k) {
              swap(arr, k, j);
              swap(arr, k, j);
            }
            ++j;
            ++middle;
          }
          ++i;
        }*/ 
        //shit doesnt work lol
    }
    async function* mergeSort(arr,low,high){      
      //can go 0 to 1250. 100-speed because speed works with sleeps so its inverted
    let speed=sliderVal;
    speed=100-speed;
    speed*=12.5;
        if(low<high){
           let middle = ((low+high)/2);
            yield mergeSort(arr,low,middle)
            yield mergeSort(arr,middle+1,high);
            yield merge(arr,low,middle,high);
        }
    }

}
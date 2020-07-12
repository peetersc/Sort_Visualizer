
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
          await sleep(speed*.75)
            for (let j = 0; j < i; j++) {
              //sets the elements being compared to different colors
              arrayColor[j+1] = 'Maroon ';
              arrayColor[j] = 'blue ';
              //quick pause at the start of every inner loop iteration to show the elements being compared
              await sleep(speed*.05)
              yield;
              //swap them back to their original colors
              arrayColor[j+1]='floralwhite ';
              arrayColor[j]='floralwhite ';
              if (sortArray[j] > sortArray[j + 1]) {
                //if a swap is needed, switch them back to the comparison colors and do a quick pause
                arrayColor[j+1] = 'Maroon ';
                arrayColor[j] = 'blue ';
                await sleep(speed*.5)
                //swap them and swap their colors
                swap(sortArray, j, j + 1);
                arrayColor[j+1] = 'blue ';
                arrayColor[j] = 'Maroon ';
                //do a quick pause to show they swapped, then set the swapped element to a specific color 
                //and the other element to its original color
                await sleep(speed*.5)
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


    async function* partition(arr, low, high) {
      var pivot = arr[high - 1];
      piv = low;
      for (let j = low; j < high; j++) {
          arrayColor[low] = 'RoyalBlue';
          arrayColor[high - 1] = 'RoyalBlue';
          arrayColor[piv] = 'Maroon ';
          arrayColor[j] = 'Maroon ';
        yield;
          arrayColor[piv]='floralwhite '
          arrayColor[j]='floralwhite '
        if (arr[j] < pivot) {
          swap(arr, piv, j);
          piv++
        }
      }
      swap(arr, piv, high - 1)
      arrayColor[piv] = 'DarkSeaGreen';
    }
    async function* quicksort(arr, low, high) {
    //can go 0 to 1250. 100-speed because speed works with sleeps so its inverted
    let speed=sliderVal;
    speed=100-speed;
    speed*=12.5;
      if (low < high) {
        yield* partition(arr, low, high)
        yield* quicksort(arr, low, piv)
        yield* quicksort(arr, piv + 1, high)
      }
    }


    function * insertionSort() {
      //can go 0 to 1250. 100-speed because speed works with sleeps so its inverted
      let speed=sliderVal;
      speed=100-speed;
      speed*=12.5;
      for (let i = 1; i < sortArray.length; ++i) {
          let j = i - 1;
  
          while (j >= 0 && sortArray[j] > sortArray[i]) {
            arrayColor[i] = 'Maroon ';
            yield;
            arrayColor[i] = 'floralwhite ';
            swap(sortArray, i, j);
            swap(arrayColor, i--, j--);
          }
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
          let min_index = i;                              //find minimum element in unsorted array
          for (let j = i; j < sortArray.length; ++j) { 
            arrayColor[j] = 'Maroon ';                        //current traversing index
            arrayColor[min_index] = 'blue';               //current min index
            yield;
            arrayColor[j] = 'floralwhite ';                       //reset color
            arrayColor[min_index] = 'floralwhite ';               //reset color
            if (sortArray[j] < sortArray[min_index]) {    //comparison for smaller value
              min_index = j;
            }
          }
          // Swap with current element
          if (min_index !== i) {
            swap(sortArray, i, min_index);
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
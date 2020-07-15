
/*
  sketch.js: Main sorting animation view
  Alex: Responsible for animation
  Last Updated: 7/9/20 @ 4:00pm by Alex
*/
import {sortType,arraySize, sliderVal} from '../Home'
let iterator;
let paused;
const height = 300
const width = window.innerWidth / 1.307
let barWidth = width / (50);
let sortArray =[];
let colorArray=[];
let arrayViewColor=[];
let unsortedArray = [];
let viewArray = [];
let piv;
let speed;
let par;
export function beginSortClick(){
  if(sortType.find(elem=>elem.active ===true).id===0)//bubble sort
  {
      iterator = bubbleSort(sortArray,colorArray);
  }
  else if(sortType.find(elem=>elem.active ===true).id===1)
  {
      iterator=quicksort(sortArray,0,arraySize,colorArray);  
  }
  else if(sortType.find(elem=>elem.active ===true).id===2)
  {
      iterator=mergeSort(sortArray,0,arraySize,colorArray);
  } 
  else if(sortType.find(elem=>elem.active ===true).id===3)
  {
      iterator=insertionSort(sortArray,colorArray);
  } 
  else if(sortType.find(elem=>elem.active ===true).id===4)
  {
    iterator=selectionSort(sortArray,colorArray);
  }
  initArray();                
  paused=false;
  par.redraw();
}
export function typeClicked(){
  initArray();
}
export function pauseClicked(){
  if(paused)
    paused=false;
  else
    paused=true;
  par.redraw();
}
export function nextClicked(){
  paused=false;
  par.redraw();
  paused=true;
}
function initArray() {
        sortArray=new Array(arraySize);
        colorArray=new Array(arraySize);
        unsortedArray=new Array(arraySize);
        let heightMin = 10;
        for (let i = 0; i < sortArray.length; i++) {
            let rectHight = Math.floor(Math.random()*(height-heightMin)+heightMin);
            sortArray[i]= rectHight;
            unsortedArray[i] = rectHight;
            colorArray[i]='floralwhite';
        }
        paused=true;            
        iterator=bubbleSort(sortArray,colorArray);
}
export default function sortingSketch (p){
    par=p;
    speed=100-speed;
    speed*=12.5;
    p.setup =function (){
        p.createCanvas(width,height);
        initArray();
    };
    p.draw =function (){
        // Scale and translate are done so that the origin is in the bottom left
        // instead of the top left, and so that rectangles are drawn from the
        // bottom up instead of top down.
        p.scale(1,-1);
        p.translate(0, -height);
        p.background(38, 38, 38);
        p.noStroke(); 
        speed=sliderVal;
        speed=100-speed;
        speed*=12.5;
        barWidth=width/arraySize;     
        for (let i = 0; i < arraySize; i++) {
            p.fill(colorArray[i]);
            p.rect(i*barWidth, 0, barWidth, sortArray[i]);//rectangle(starting x coordinate from the bottom of canvas,starting y coord, width of rect, height )
        }
        if(paused)  {      
          p.noLoop();
        }
        if(!paused){
          p.loop();        
          iterator.next();              
        }            
    }
}    
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    async function* bubbleSort(arr,cArray) {
      //can go 0 to 1250. 100-speed because speed works with sleeps so its inverted
      await sleep(speed)
        for (let i = arr.length-1; i > 0; i--) {
          //pause before each outer loop iteration
            for (let j = 0; j < i; j++) {
              //sets the elements being compared to different colors
              cArray[j+1] = 'Maroon';
              cArray[j] = 'blue';
              //quick pause at the start of every inner loop iteration to show the elements being compared
              await sleep(speed*.25)              
              yield;
              //swap them back to their original colors
              cArray[j+1]= 'floralwhite';
              cArray[j]= 'floralwhite';
              if (arr[j] > arr[j + 1]) {
                //if a swap is needed, switch them back to the comparison colors and do a quick pause
                cArray[j+1] = 'Maroon';
                cArray[j] = 'blue';
                await sleep(speed*.25)
                //swap them and swap their colors
                swap(arr, j, j + 1);
                cArray[j+1] = 'blue';
                cArray[j] = 'Maroon';
                //do a quick pause to show they swapped, then set the swapped element to a specific color 
                //and the other element to its original color
                //await sleep(speed*.25)
                cArray[j]= 'floralwhite';
              }
            }
            //set all elements swapped along the way of the inner loop back to their original colors
            for (let k = 0; k < i; k++) {
              cArray[k]= 'floralwhite';
            }
            //set the ith iteration to green to mark its sorted and wont be touched again
            cArray[i]='DarkSeaGreen';
          }
        cArray[0]='DarkSeaGreen';
    }


    async function* partition(arr, low, high,cArray) {
      var pivot = arr[high - 1];
      piv = low;
      for (let j = low; j < high; j++) {

        //initialize the starying and ending points with the same color
        for (let i = 0; i < sortArray.length; i++) {
          if(cArray[i]==='red')
            cArray[i]= 'floralwhite'
        }        
        cArray[low] = 'blue';
        cArray[high - 1] = 'blue';
        cArray[piv]='red';
        cArray[j]='red';
        
        //sleep before begin the iteration
        await sleep(speed*.25)
        yield;
        if (arr[j] < pivot) {
          //quick pause before the swap
          await sleep(speed*.25)
          swap(arr, piv, j);
          //swap the colors to show the swap, then do a quick pause
          await sleep(speed*.25)
          //swap j back, set the pivot to neutral, and set a new pivot
          piv++
        }
      }
      swap(arr, piv, high - 1)
      cArray[piv]='green';
    }
    async function* quicksort(arr, low, high,cArray) {
      if (low < high) {
        yield* partition(arr, low, high,cArray)
        yield* quicksort(arr, low, piv,cArray)
        yield* quicksort(arr, piv + 1, high,cArray)
      }
    }


    async function * insertionSort(arr,cArray) {
      //set the first element to the sorted color
      cArray[0] = 'DarkSeaGreen';

      for (let i = 1; i < arr.length; ++i) {
          let j = i - 1;

          while (j >= 0 && arr[j] > arr[i]) {
            //set i and j to their own colors, then do a quick pause
            cArray[i] = 'blue';
            cArray[j] = 'maroon';
            yield;
            await sleep(speed*.5)
            swap(arr, i, j);

            //show the color swap with a quick pause
            cArray[i] = 'blue';
            cArray[j] = 'maroon';
            await sleep(speed*.5)

            //set the sorted items to their own color
            cArray[j] = 'DarkSeaGreen';
            swap(cArray, i--, j--);
          }
          
          //reset anything i overrode back to the sorted color
          cArray[i]='DarkSeaGreen'
        }
    }

    async function swap(arr, a, b) {
        let temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }


    async function* selectionSort(arr,cArray){                              // min selection sort
      for (let i = 0; i < arr.length; ++i) {        //traversing unsorted array
        //sleep at start of new iteration
        await sleep(speed*.25)
          let min_index = i;                              //find minimum element in unsorted array
          for (let j = i; j < arr.length; ++j) { 
            //reset the unsorted colors to neutral
            cArray[j] =  'floralwhite';
          }
          //set the element to be swapped to its own color
          cArray[i] = 'green';

          for (let j = i; j < arr.length; ++j) { 
            //set colors for comparisons
            cArray[j] = 'Maroon';                        //current traversing index
            cArray[min_index] = 'blue';               //current min index

            //quick pause to show colors
            await sleep(speed*.25)
            yield;
            cArray[j]='floralwhite'
            //trailing colors between min and i set to their own color
            cArray[min_index] =  'floralwhite';             

            if (arr[j] < arr[min_index]) {    //comparison for smaller value
              min_index = j;
              //reset trailing colors once min changes
              for (let k = i; k < j; ++k) { 
                cArray[k] =  'floralwhite';
              }
            }
          }
          // Swap with current element
          if (min_index !== i) {
            //swap and show changes with color swap
            cArray[min_index] = 'blue';
            await sleep(speed*.5)
            swap(sortArray, i, min_index);
            cArray[i] = 'blue';
            await sleep(speed*.25)
          }
          // Current element is correctly sorted
          cArray[i] = 'green';
        }
    }


    async function* merge(arr,low,middle,high,cArray){

        let i = low;
        let j = middle + 1;
        while (i <= middle && j <= high) {
          cArray[i] = 'red';
          cArray[j] = 'red';
          await sleep(speed*0.5);
          yield;
          cArray[i] =  'floralwhite';
          cArray[j] =  'floralwhite';
          if (arr[i] > arr[j]) {
            for (let k = i; k <= j; ++k) {
              swap(arr, k, j);
            }
          await sleep(speed*0.5);
            ++j;
            ++middle;
          }
          ++i;
        }
    }
    async function* mergeSort(arr,low,high,cArray){      
        if(low<high){
           let middle = Math.floor((low+high)/2);
            yield* mergeSort(arr,low,middle,cArray)
            yield* mergeSort(arr,middle+1,high,cArray);
            yield* merge(arr,low,middle,high,cArray);
        }

    }

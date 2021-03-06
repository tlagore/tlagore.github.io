/*
  SENG513 Assignment 2
  Author: Tyrone Lagore
  SID: 10151950
  email: tyrone.lagore@ucalgary.ca
  url: tlagore.github.io/513_asg2/
 */

function getStats(txt) {
    /*
      utils handles some small utils functions
     */
    var Utils = {
	/*
	  checks if a frequency list contains an element
	 */
	freqContains: function(arr, element){
	    for(let i = 0; i < arr.length; i++){
		if(arr[i][0] === element){
		    return i;
		}
	    }
	    return -1;
	},
	/* a sort function that sorts by frequency then alphabetically */
	sortLengthAlpha: function(a, b){
	    let i = 0;
	    if (a.length > b.length)
		i = - 1
	    else if (a.length === b.length)
	    {
		if(a < b)
		    i = -1;
		else
		    i = 1;
	    }else
		i = 1;
	    
	    return i;
	}
    }
    
    var TextParse = {
	//returns number of characters in a string
	numChars: function(text){
	    return text.length;
	},

	//returns number of words in a string
	numWords: function(text){
	    let strs = text.split(/[^A-Za-z0-9]/);
	    let numWords = 0;
	    for(let value of strs){
		if(value !== ""){
		    numWords++;
		}
	    }
	    return numWords;
	},

	//returns the number of lines in a string
	numLines: function(text){
	    return text.split('\n').length;
	},

	//returns the number of non-empty lines in a string
	numNonEmptyLines: function(text){
	    let strs = text.split('\n');
	    let numEmpty = 0;
	    
	    for(let value of strs){
		if(value.replace(/\s/g,"") !== ""){
		    numEmpty++;
		}
	    }

	    return numEmpty;
	},

	//returns the average word length of a string.
	averageWordLength: function(text){
	    let strs = text.split(/[^A-Za-z0-9]/);
	    let avgLength = 0;
	    let numWords = 0;

	    for(let value of strs){
		if(value !== ""){
		    numWords++;
		    avgLength += value.length;
		}
	    }

	    return avgLength / numWords;
	},

	//returns the max line length of a string
	maxLineLength: function(text){
	    let strs = text.split("\n");
	    let maxLength = 0;

	    for(let value of strs){
		maxLength = value.length > maxLength ? value.length : maxLength;
	    }

	    return maxLength;
	},

	/*
	  returns all of the unique paldindromes found in a string
	  in the order that they are found
	 */
	palindromes: function(text){
	    let strs = text.split(/[^A-Za-z0-9]/);
	    let palindromes = [];
	    let stackified = [];
	    let unstackified = [];

	    for(let value of strs){
		value = value.toLowerCase();
		if(value.length >= 1){

		    for(let i = 0; i < value.length; i++){
			stackified.push(value[i]);
		    }

		    let length = stackified.length;
		    for(let j = 0; j < length; j++){
			unstackified[j] = stackified.pop();
		    }


		    if (value === unstackified.join('') && !palindromes.includes(value)){
			palindromes.push(value);
		    }
		}

		stackified.length = 0;
		unstackified.length = 0;
	    }
	    return palindromes;
	},
	/* 
	   tenLongestWords takes in some text and outputs (up to) ten of the largest words.
	   if there are multiple words of the same length, they are sorted alphabetically.
	*/
	tenLongestWords: function(text){
	    let strs = text.split(/[^A-Za-z0-9]/);
	    
	    //note that below abuses that "abcd" < "bbcd" in javascript,
	    //ie if a < b, a is lexiographically prior to b.
	    strs.sort(function(a,b){ return Utils.sortLengthAlpha(a,b)});

	    //ensure all same case for unique comparisons
	    strs.forEach(function(element, index, self){
		self[index] = element.toLowerCase();
	    });

	    //only take unique words - remove empty words if any
	    let unique = strs.filter(function(element, index, self){
		return index == self.indexOf(element) && element !== '';
	    });

	    return unique.slice(0,10);
	},

	/*
	  returns the 10 most frequent words first sorting by frequency then alphabetically in the event of a tie
	 */
	tenMostFrequentWords: function(text){
	    let strs = text.split(/[^A-Za-z0-9]/);
	    let visited = [];
	    let mostFrequent = [];

	    strs.forEach(function(val, index, array){
		let temp = val.toLowerCase();
		if(temp !== ''){
		    //have we already visited the string?
		    let index = Utils.freqContains(visited,temp);
		    //increment frequency
		    if(index > -1){
			visited[index][1]++;
		    }else{
			//else add to visited with frequency of 1
			visited.push([temp,1]);
		    }
		}
	    });

	    //sort array by frequency then alphabetically
	    visited.sort(function(a,b){
		return a[1] > b[1] ? -1 : a[1] === b[1] ? a < b ? -1 : 1 : 1;
	    });

	    for(let value of visited){
		mostFrequent.push(value[0] + '(' + value[1] + ')');
	    }

	    return mostFrequent.slice(0,10);
	},
    };
    
    return {
        nChars: TextParse.numChars(txt),
        nWords: TextParse.numWords(txt),
        nLines: TextParse.numLines(txt),
        nNonEmptyLines: TextParse.numNonEmptyLines(txt),
        averageWordLength: TextParse.averageWordLength(txt),
        maxLineLength: TextParse.maxLineLength(txt),
        allPalindromes: TextParse.palindromes(txt),
        tenLongestWords: TextParse.tenLongestWords(txt),
        tenMostFrequentWords: TextParse.tenMostFrequentWords(txt)
    };
}

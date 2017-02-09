function getStats(txt) {
    // you need to write your own code here

    /*

     */
    var Utils = {
	freqContains: function(arr, element){
	    for(let i = 0; i < arr.length; i++){
		if(arr[i][0] === element){
		    return i;
		}
	    }
	    return -1;
	},
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
	utils:{
	    numChars: function(text){
		return text.length;
	    },
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
	    numLines: function(text){
		return text.split('\n').length;
	    },
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
	    maxLineLength: function(text){
		let strs = text.split("\n");
		let maxLength = 0;

		for(let value of strs){
		    maxLength = value.length > maxLength ? value.length : maxLength;
		}

		return maxLength;
	    },

	    /*
	      
	     */
	    palindromes: function(text){
		let strs = text.split(/[^A-Za-z0-9]/);
		let palindromes = [];
		let stackified = [];
		let unstackified = [];

		for(let value of strs){
		    value = value.toLowerCase();
		    if(value.length > 1){

			for(let i = 0; i < value.length; i++){
			    stackified.push(value[i]);
			}

			let length = stackified.length;
			for(let j = 0; j < length; j++){
			    unstackified[j] = stackified.pop();
			}

			if (value === unstackified.join('')){
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
	}
    };
    
    return {
        nChars: TextParse.utils.numChars(txt),
        nWords: TextParse.utils.numWords(txt),
        nLines: TextParse.utils.numLines(txt),
        nNonEmptyLines: TextParse.utils.numNonEmptyLines(txt),
        averageWordLength: TextParse.utils.averageWordLength(txt),
        maxLineLength: TextParse.utils.maxLineLength(txt),
        allPalindromes: TextParse.utils.palindromes(txt),
        tenLongestWords: TextParse.utils.tenLongestWords(txt),
        tenMostFrequentWords: TextParse.utils.tenMostFrequentWords(txt)
    };
}

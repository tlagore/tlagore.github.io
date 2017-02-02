function getStats(txt) {
    // you need to write your own code here
    
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
		    if(value !== ""){
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
	    palindromes: function(text){
		let strs = text.split(/[^A-Za-z0-9]/);
		let palindromes = [];
		let stackified = [];
		let unstackified = [];

		//let string = ['H','e','l','l','o'];
		//stackified.push(string[0]);
		//alert(stackified);
		
		for(let value of strs){
		    if(value.length > 0){

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
	    tenLongestWords: function(text){
		let strs = text.split(/[^A-Za-z0-9]/);
		//(((is a length greater than b length ? place a before b) [else] Is a.length = b.length ? is a before b in the alphabet ? place a before b [else] place b before a) [else] place b before a
		//note that below abuses that "abcd" < "bbcd" in javascript, ie if a < b, a is lexiographically prior to b.
		strs.sort(function(a,b){ return a.length > b.length ? -1 : a.length == b.length ? a < b ? -1 : 1 : 1 });	
		return strs.slice(1,11);
	    },
		tenMostFrequentWords: function(text){
			let strs = text.split(/[^A-Za-z0-9]/);
			let visited = [];
			let count = [];

			for(let value of strs){
				let index = visited.indexOf(value);
				if(index > -1){
					count[index]++;
				}else{
					visited.push(value);
					count.push(1);
				}
			}

			alert(visited + count);
		}
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

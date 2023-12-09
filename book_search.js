/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    // init empty results list
    let results = [];
    
    let trimmedSearchTerm = searchTerm.trim(' ');

    if (trimmedSearchTerm) { // adds to indentation, may extract to flatten later
        // for each book in scannedTextObj
        scannedTextObj.forEach(book => { // forEach ok b/c we don't need to break early. can't use filter here tho
            // if book has content
            if (book.Content) {
                // for each content obj (could use filter here but not necessary & would req concatenation to results)
                // book.Content.forEach(contentObj => { // unable to access next content obj for hyphenation check
                for (let idx = 0; idx < book.Content.length; idx++) {
                    // if text ends w/ - & there's another content obj after this, // checks for hyphenated term
                    if (book.Content[idx].Text.endsWith('-') && book.Content[idx+1]) {
                        // check for match w/ last word of line (w/o -) + first word of next line
                        let lineEndWordFragment = book.Content[idx].Text.split(' ').pop()
                        lineEndWordFragment = lineEndWordFragment.slice(0, -1); // w/o '-'
                        let lineStartWordFragment = book.Content[idx+1].Text.split(' ').shift();
                        // if match found from combined piece
                        if ((lineEndWordFragment + lineStartWordFragment) === searchTerm) {
                            // append obj to results list (isbn, page, line)
                            results.push({
                                "ISBN": book.ISBN,
                                "Page": book.Content[idx].Page,
                                "Line": book.Content[idx].Line,
                            });
                        }
                    }

                    // else if search term is in text for this obj (probably regex). don't need index, just boolean
                    else if (book.Content[idx].Text.includes(trimmedSearchTerm)) {
                        // append obj to results list (isbn, page, line)
                        results.push({
                            "ISBN": book.ISBN,
                            "Page": book.Content[idx].Page,
                            "Line": book.Content[idx].Line,
                        });
                    }
                };
            }
        });
    }

    return {
        "SearchTerm": searchTerm,
        "Results": results
    }; 
}

/**
 * EXAMPLE INPUT & OUTPUT OBJECTS
 */
/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/** Example output object with multiple results given twentyLeaguesIn */
const twentyLeaguesMultipleResultsOut = {
    "SearchTerm": "and",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        }
    ]
}

/** Example input object with multiple books */
const multipleBooksIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    },
    {
        "Title": "Recoding America",
        "ISBN": "9781250266774",
        "Content": [
            {
                "Page": 23,
                "Line": 1,
                "Text": "Over the past decade, I have seen technology fail at all"
            },
            {
                "Page": 23,
                "Line": 2,
                "Text": "levels of government. Sometimes it happens loudly and spectac-"
            },
            {
                "Page": 23,
                "Line": 3,
                "Text": "ularly, as when healthcare.gov crashed on launch; sometimes it's"
            } 
        ] 
    }
];

/** Example input object with multiple results from multiple books input */
const multipleBooksMultipleResultsOut = {
    "SearchTerm": "I",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        },
        {
            "ISBN": "9781250266774",
            "Page": 23,
            "Line": 1
        },
    ]
};

/** Example input object with empty book list for my unit tests */
const emptyBookListIn = [{}];

/** Example input object with book with empty content for my unit tests */
const emptyContentIn = [
    {
        "Title": "The Empty Book",
        "ISBN": "123456789",
        "Content": [] 
    }
];

/** Example output object with blank (but unaltered) search term (& thus no results) */
const blankSearchTermOut = {
    "SearchTerm": "  ",
    "Results": []
};

/** Example output object for use with example input objects with corresponding hyphenated words */
const hyphenatedSearchTermOut = {
    "SearchTerm": "darkness",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
};

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** Test that search can find multiple results given a single-book input */
const test3result = findSearchTermInBooks("and", twentyLeaguesIn); 
if (JSON.stringify(twentyLeaguesMultipleResultsOut) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", twentyLeaguesMultipleResultsOut);
    console.log("Received:", test3result);
}

/** Test that search can find multiple results given a multiple-book input */
const test4result = findSearchTermInBooks("I", multipleBooksIn); 
if (JSON.stringify(multipleBooksMultipleResultsOut) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", multipleBooksMultipleResultsOut);
    console.log("Received:", test4result);
}

/**
 * EDGE CASE TESTS
 */
/** Test that the search can handle a list with no books (and not find any matches, of course) */
const test5result = findSearchTermInBooks("the", emptyBookListIn);
if (test5result.Results.length == 0) { // search term not important to check in this case
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", 0);
    console.log("Received:", test5result.Results.length);
}

/** Test that the search can handle a book with no scanned content (and not find any matches, of course) */
const test6result = findSearchTermInBooks("the", emptyContentIn);
if (test6result.Results.length == 0) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", 0);
    console.log("Received:", test6result.Results.length);
}

/** Test that search can handle a search term that's whitespace or otherwise blank */
const test7result = findSearchTermInBooks("  ", twentyLeaguesIn);
if (JSON.stringify(blankSearchTermOut) === JSON.stringify(test7result)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", blankSearchTermOut);
    console.log("Received:", test7result);
}

/** Test that search can handle a search term that includes a result from a hyphenated version of the term. This is an edge case, and if I don't get to implementing a solution for this case, I'll comment it out. */
const test8result = findSearchTermInBooks("darkness", twentyLeaguesIn);
if (JSON.stringify(hyphenatedSearchTermOut) === JSON.stringify(test8result)) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", hyphenatedSearchTermOut);
    console.log("Received:", test8result);
}

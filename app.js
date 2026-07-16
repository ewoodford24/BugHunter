let currentMission = 0;
let xp = player.xp;

let pyodideReady = false;
let pyodide;


// ===============================
// Load Python
// ===============================

async function loadPython() {

    document.getElementById("buddyText").innerHTML =
        "🐞 Bug Buddy is waking up Python...";


    pyodide = await loadPyodide();


    pyodideReady = true;


    document.getElementById("buddyText").innerHTML =
        "🐞 Python is ready! Find those bugs!";

}



// Start Python when page loads
loadPython();





// ===============================
// Load Mission
// ===============================

function loadMission() {


    let mission = missions[currentMission];


    document.getElementById("missionTitle").innerHTML =
        mission.title;


    document.getElementById("missionNumber").innerHTML =
        "Mission " + (currentMission + 1)
        + " of "
        + missions.length;


    document.getElementById("code").value =
        mission.code;


    document.getElementById("output").innerHTML =
        "Waiting for code...";


    document.getElementById("buddyText").innerHTML =
        "🐞 A new bug has appeared! Can you fix it?";

}





// ===============================
// Run Python Code
// ===============================

async function runCode() {


    if (!pyodideReady) {

        document.getElementById("output").innerHTML =
            "🐞 Python is still loading...";

        return;

    }



    let code =
        document.getElementById("code").value;



    let output =
        document.getElementById("output");



    try {


        // Create output capture
        pyodide.runPython(`
import sys
from io import StringIO

sys.stdout = StringIO()
        `);



        await pyodide.runPythonAsync(code);



        let result =
            pyodide.runPython(
                "sys.stdout.getvalue()"
            );



        output.innerHTML =
            result || "Program finished with no output.";



        document.getElementById("buddyText").innerHTML =
            "🐞 Nice! Now explain what the code is doing.";

    }



    catch(error) {


        output.innerHTML =
            "🐞 ERROR:\n\n" + error;



        document.getElementById("buddyText").innerHTML =
            "🐞 I found a clue! Read the error message carefully.";

    }


}






// ===============================
// Hint System
// ===============================

function giveHint() {


    let mission =
        missions[currentMission];


    document.getElementById("buddyText").innerHTML =
        "🐞 " + mission.hint1;


}







// ===============================
// Submit Mission
// ===============================

function submitCode() {


    let mission =
        missions[currentMission];


    let studentCode =
        document.getElementById("code").value.trim();


    let solution =
        mission.solution.trim();



    if (studentCode === solution) {


        xp += 100;

	player.xp = xp;

	savePlayer();

	if(player.completed.length === 0){

    		awardBadge("🐛 First Bug Squashed");

	}

        document.getElementById("xp").innerHTML =
            xp;



        document.getElementById("xpFill").style.width =
            (xp / 5) + "%";



        document.getElementById("buddyText").innerHTML =
            "🎉 Bug Squashed! +100 XP";



        player.completed.push(currentMission);

	savePlayer();


	if(currentMission === 1){

    		awardBadge("🐍 Python Rookie");

}


setTimeout(nextMission,1500);


    }


    else {


        document.getElementById("buddyText").innerHTML =
            "🐞 Your code may run, but the bug is still hiding. Compare your solution carefully.";

    }


}






// ===============================
// Next Mission
// ===============================

function nextMission() {


    currentMission++;



    if (currentMission < missions.length) {


        loadMission();


    }


    else {


        document.getElementById("missionTitle").innerHTML =
            "🏆 Variables Village Complete!";


        document.getElementById("missionNumber").innerHTML =
            "";


        document.getElementById("buddyText").innerHTML =
            "🐞 Amazing work Debug Detective! You completed your first world!";


    }


}


function startMission(number){

    currentMission = number;

    loadMission();

}


// Start first mission

loadMission();
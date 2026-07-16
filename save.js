let player = {

    name:"",
    xp:0,
    completed:[],
    badges:[]

};




// Load saved player

function loadPlayer(){

    let saved =
    localStorage.getItem("bugHunterPlayer");


    if(saved){

        player =
        JSON.parse(saved);

    }

}




// Save player

function savePlayer(){

    localStorage.setItem(
        "bugHunterPlayer",
        JSON.stringify(player)
    );

}





// Start game

function startGame(){


    let name =
    document.getElementById("nameInput").value;



    if(name.trim() === ""){

        alert("Please enter your name!");

        return;

    }



    player.name = name;


    savePlayer();



    document.getElementById("welcome").style.display="none";


    document.getElementById("gameArea").style.display="block";



    updateProfile();

}





// Update profile display

function updateProfile(){


    document.getElementById("playerName").innerHTML =
    player.name;


    document.getElementById("xp").innerHTML =
    player.xp;


    document.getElementById("badgeList").innerHTML =
    player.badges.length === 0

    ? "No badges yet..."

    : player.badges.join("<br>");

}





// Award badge

function awardBadge(badge){


    if(!player.badges.includes(badge)){


        player.badges.push(badge);


        savePlayer();



        alert(
        "🏆 Badge Earned!\n\n" + badge
        );

    }

}





loadPlayer();
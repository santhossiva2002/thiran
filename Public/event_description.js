// onLoad function to set the event title
function onLoad(event_name) {
    // alert(events[event_name]["title"])
    // alert(event_name)
    const title = events[event_name] ? events[event_name]["title"] : "Event Not Found";
    document.getElementById("event_title").innerHTML = title;

    const event_description = events[event_name] ? events[event_name]["description"] : "Description Not Found";
    document.getElementById("event_description").innerHTML = event_description;

    const no_participants = events[event_name] ? events[event_name]["general_info"]["no_participants"] : "Not Found";
    document.getElementById("no_participants").innerHTML = no_participants;

    const no_rounds = events[event_name] ? events[event_name]["general_info"]["no_rounds"] : "Not Found";
    document.getElementById("no_rounds").innerHTML = no_rounds;

    const venue = events[event_name] ? events[event_name]["general_info"]["venue"] : "Not Found";
    document.getElementById("venue").innerHTML = venue;

    const duration_1 = events[event_name] ? events[event_name]["general_info"]["duration_1"] : "Not Found";
    document.getElementById("duration_1").innerHTML = duration_1;

    const duration_2 = events[event_name] ? events[event_name]["general_info"]["duration_2"] : "Not Found";
    document.getElementById("duration_2").innerHTML = duration_2;

    const round_1 = events[event_name] ? events[event_name]["round_wise_description"]["round_1"] : "Not Found";
    document.getElementById("round_1").innerHTML = round_1;

    const round_2 = events[event_name] ? events[event_name]["round_wise_description"]["round_2"] : "Not Found";
    document.getElementById("round_2").innerHTML = round_2;

    const name_1 = events[event_name] ? events[event_name]["coordinators_details"]["name_1"] : "Not Found";
    document.getElementById("name_1").innerHTML = name_1;

    const name_2 = events[event_name] ? events[event_name]["coordinators_details"]["name_2"] : "Not Found";
    document.getElementById("name_2").innerHTML = name_2;

    const phone_1 = events[event_name] ? events[event_name]["coordinators_details"]["phone_1"] : "Not Found";
    document.getElementById("phone_1").innerHTML = phone_1;

    const phone_2 = events[event_name] ? events[event_name]["coordinators_details"]["phone_2"] : "Not Found";
    document.getElementById("phone_2").innerHTML = phone_2;

    const ul = document.getElementById("rules");

    var rulesArray = events[event_name] ? events[event_name]["event_rules"] : ["A", "B", "C"];
    rulesArray.forEach(rule => {
        const li = document.createElement("li");
        li.textContent = rule;
        ul.appendChild(li);
    });

}
function registerEvent(event_name) {
    if (!events[event_name]) {
        alert("Event details not found.");
        return;
    }

    // Check user session
    fetch("/session_check")
        .then(response => {
            if (!response.ok) {
                window.location.href = '/login';
            }
            else {
                fetch(`/check_registration?event_name=${events[event_name]["title"]}`)
                    .then(response => response.json())

                    .then(async data => {
                        if (data.message === 'Participant already registered') {
                            alert('Participant already registered for the event');

                        }
                        else {
                            // User is not registered, proceed with registration
                            const isConfirmed = window.confirm("Do you want to proceed?");
                            if (isConfirmed) {

                                const count = events[event_name]["general_info"]["no_participants"];
                                const participantEmails = []; // Array to store participant emails

                                //getting the email from the session in the backend
                                let userEmail = null
                                await fetch('/getUserEmail')
                                    .then(
                                        response => response.json())
                                    .then(async data => {
                                        // console.log(data)
                                        userEmail = data.data;

                                    }
                                    )

                                // Loop to prompt for participant emails
                                // Loop to prompt for participant emails


                                var x
                                var studentsArr = []

                                for (let i = 1; i <= count - 1; i++) {
                                    const participantEmail = prompt(`Enter participant ${i + 1}'s email:`);

                                    //checking whether the participants mails are duplicated
                                    if (!(studentsArr.includes(participantEmail))) {
                                        studentsArr.push(participantEmail)

                                        //checking whether the logged in user mail is duplicated 
                                        if (userEmail && participantEmail != userEmail) {

                                            if (participantEmail) {
                                                // Perform a check against the student collection
                                                x = await fetch(`/check_student?email=${participantEmail}`)
                                                    .then(response => response.json())
                                                    .then(data => {
                                                        if (data.exists) {
                                                            // Email exists in the student collection, add it to the participantEmails array
                                                            participantEmails.push(participantEmail);
                                                        }
                                                        else {
                                                            // Email does not exist in the student collection, prompt the user to sign up
                                                            alert("This email is not registered. Do you want to sign up?");

                                                            return 0

                                                        }
                                                    })


                                                    .catch(error => {
                                                        console.error('Error checking student email:', error);
                                                        alert("An error occurred while checking student email. Please try again later.");
                                                    });


                                            } else {
                                                alert("Please enter valid emails for all participants.");
                                                return; // Exit function if email is not entered
                                            }
                                        }
                                        else {
                                            alert("Please enter other participants emails.");
                                            i--;
                                            continue

                                        }
                                    } else {
                                        alert("Participants mail ids should be unique");
                                        i--;
                                        continue
                                    }
                                }

                                if (x == 0)
                                    window.location.href = '/login'
                                else {
                                    const registrationData = {
                                        event_name: events[event_name]["title"],
                                        participantEmails: participantEmails
                                    };

                                    // Example of sending data to server using fetch
                                    fetch("/register_event", {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(registrationData)
                                    })
                                        .then(response => response.json())
                                        .then(data => {
                                            window.location.reload();
                                            window.scrollTo(0, 0); // Scroll to the top of the page
                                            alert(data.message);  // Display response message from server

                                        })
                                        .catch(error => {
                                            console.error('There was a problem with the fetch operation:', error);
                                            alert("Error occurred while registering for the event. Please try again later.");
                                        });
                                }
                            }
                        }
                    })
                    .catch(error => {
                        console.error('There was a problem with the Already Registration check:', error);
                        alert(error.message);
                    });
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert("Error occurred while registering for the event. Please try again later.");
        });
}


// event_description.js

// Define the events object with event details
const events = {
    event_1: {
        title: "Star of Thiran",
        description: "We present you with yet another excuse to code your brain and heart out - ALGOCODE. Stack skills and queue tricks up your sleeve! This event will surely provide you with an array of problems that will untangle your mind. Fire up your editor and compile your way through this event to reach the root of this tournament tree.",
        general_info: {
            no_participants: 2,
            no_rounds: 2,
            venue: "Skava Lab",
            duration_1: "1 hrs",
            duration_2: "1.5 hrs"
        },
        coordinators_details: {
            name_1: "Kavin S",
            phone_1: "9384397477",
            name_2: "Vijay S",
            phone_2: "638320692"
        },
        round_wise_description: {
            round_1: "The first round is the preliminary round that contains a variety of questions that tests the students on their knowledge of analytical, problem-solving, and programming skills. The round contains a mix of MCQ-type questions and subjective questions. The participants that rank higher in this round advance to the next round.",
            round_2: "The second round is the Final round of this competition, which presents the participants with a set of programming problems with various difficulty levels to compose an interesting competition. The leaderboard is used to monitor the submissions of the participants. The team that solves the most problems will be announced as the winner."
        },
        event_rules: ["Team must contain a maximum of 2 members",
            "The top performing teams in Prelims will be selected for finals",
            "In case of a tie-breaker, the team that solves the problem first wins",
            "The leaderboard is used to determine the winner",
            "The participants should not involve in any unacceptable behavior, it will lead to the disqualification of the team.",
            "Question paper, pen, rough sheets for workout will be provided.",
            "Smartphone usage is not allowed during the events."]

    },
    event_2: {
        title: "Codesprint",
        description: "We present you with yet another excuse to code your brain and heart out - ALGOCODE. Stack skills and queue tricks up your sleeve! This event will surely provide you with an array of problems that will untangle your mind. Fire up your editor and compile your way through this event to reach the root of this tournament tree.",
        general_info: {
            no_participants: 3,
            no_rounds: 2,
            venue: "Skava Lab",
            duration_1: "1 hrs",
            duration_2: "1.5 hrs"
        },
        coordinators_details: {
            name_1: "Kavin S",
            phone_1: "9384397477",
            name_2: "Vijay S",
            phone_2: "638320692"
        },
        round_wise_description: {
            round_1: "The first round is the preliminary round that contains a variety of questions that tests the students on their knowledge of analytical, problem-solving, and programming skills. The round contains a mix of MCQ-type questions and subjective questions. The participants that rank higher in this round advance to the next round.",
            round_2: "The second round is the Final round of this competition, which presents the participants with a set of programming problems with various difficulty levels to compose an interesting competition. The leaderboard is used to monitor the submissions of the participants. The team that solves the most problems will be announced as the winner."
        },
        event_rules: ["Team must contain a maximum of 2 members",
            "The top performing teams in Prelims will be selected for finals",
            "In case of a tie-breaker, the team that solves the problem first wins",
            "The leaderboard is used to determine the winner",
            "The participants should not involve in any unacceptable behavior, it will lead to the disqualification of the team.",
            "Question paper, pen, rough sheets for workout will be provided.",
            "Smartphone usage is not allowed during the event."]

    },
    event_3: {
        title: "Crickbid Auction",
        description: "We present you with yet another excuse to code your brain and heart out - ALGOCODE. Stack skills and queue tricks up your sleeve! This event will surely provide you with an array of problems that will untangle your mind. Fire up your editor and compile your way through this event to reach the root of this tournament tree.",
        general_info: {
            no_participants: 2,
            no_rounds: 2,
            venue: "Skava Lab",
            duration_1: "1 hrs",
            duration_2: "1.5 hrs"
        },
        coordinators_details: {
            name_1: "Kavin S",
            phone_1: "9384397477",
            name_2: "Vijay S",
            phone_2: "638320692"
        },
        round_wise_description: {
            round_1: "The first round is the preliminary round that contains a variety of questions that tests the students on their knowledge of analytical, problem-solving, and programming skills. The round contains a mix of MCQ-type questions and subjective questions. The participants that rank higher in this round advance to the next round.",
            round_2: "The second round is the Final round of this competition, which presents the participants with a set of programming problems with various difficulty levels to compose an interesting competition. The leaderboard is used to monitor the submissions of the participants. The team that solves the most problems will be announced as the winner."
        },
        event_rules: ["Team must contain a maximum of 2 members",
            "The top performing teams in Prelims will be selected for finals",
            "In case of a tie-breaker, the team that solves the problem first wins",
            "The leaderboard is used to determine the winner",
            "The participants should not involve in any unacceptable behavior, it will lead to the disqualification of the team.",
            "Question paper, pen, rough sheets for workout will be provided.",
            "Smartphone usage is not allowed during the events."]
    },
    event_4: {
        title: "Nethunt",
        description: "We present you with yet another excuse to code your brain and heart out - ALGOCODE. Stack skills and queue tricks up your sleeve! This event will surely provide you with an array of problems that will untangle your mind. Fire up your editor and compile your way through this event to reach the root of this tournament tree.",
        general_info: {
            no_participants: 2,
            no_rounds: 2,
            venue: "Skava Lab",
            duration_1: "1 hrs",
            duration_2: "1.5 hrs"
        },
        coordinators_details: {
            name_1: "Kavin S",
            phone_1: "9384397477",
            name_2: "Vijay S",
            phone_2: "638320692"
        },
        round_wise_description: {
            round_1: "The first round is the preliminary round that contains a variety of questions that tests the students on their knowledge of analytical, problem-solving, and programming skills. The round contains a mix of MCQ-type questions and subjective questions. The participants that rank higher in this round advance to the next round.",
            round_2: "The second round is the Final round of this competition, which presents the participants with a set of programming problems with various difficulty levels to compose an interesting competition. The leaderboard is used to monitor the submissions of the participants. The team that solves the most problems will be announced as the winner."
        },
        event_rules: ["Team must contain a maximum of 2 members",
            "The top performing teams in Prelims will be selected for finals",
            "In case of a tie-breaker, the team that solves the problem first wins",
            "The leaderboard is used to determine the winner",
            "The participants should not involve in any unacceptable behavior, it will lead to the disqualification of the team.",
            "Question paper, pen, rough sheets for workout will be provided.",
            "Smartphone usage is not allowed during the events."]
    },
    event_5: {
        title: "Witty mindz",
        description: "We present you with yet another excuse to code your brain and heart out - ALGOCODE. Stack skills and queue tricks up your sleeve! This event will surely provide you with an array of problems that will untangle your mind. Fire up your editor and compile your way through this event to reach the root of this tournament tree.",
        general_info: {
            no_participants: 2,
            no_rounds: 2,
            venue: "Skava Lab",
            duration_1: "1 hrs",
            duration_2: "1.5 hrs"
        },
        coordinators_details: {
            name_1: "Kavin S",
            phone_1: "9384397477",
            name_2: "Vijay S",
            phone_2: "638320692"
        },
        round_wise_description: {
            round_1: "The first round is the preliminary round that contains a variety of questions that tests the students on their knowledge of analytical, problem-solving, and programming skills. The round contains a mix of MCQ-type questions and subjective questions. The participants that rank higher in this round advance to the next round.",
            round_2: "The second round is the Final round of this competition, which presents the participants with a set of programming problems with various difficulty levels to compose an interesting competition. The leaderboard is used to monitor the submissions of the participants. The team that solves the most problems will be announced as the winner."
        },
        event_rules: ["Team must contain a maximum of 2 members",
            "The top performing teams in Prelims will be selected for finals",
            "In case of a tie-breaker, the team that solves the problem first wins",
            "The leaderboard is used to determine the winner",
            "The participants should not involve in any unacceptable behavior, it will lead to the disqualification of the team.",
            "Question paper, pen, rough sheets for workout will be provided.",
            "Smartphone usage is not allowed during the events."]
    },
    event_6: {
        title: "Ctrl + Alt + Qode",
        description: "We present you with yet another excuse to code your brain and heart out - ALGOCODE. Stack skills and queue tricks up your sleeve! This event will surely provide you with an array of problems that will untangle your mind. Fire up your editor and compile your way through this event to reach the root of this tournament tree.",
        general_info: {
            no_participants: 2,
            no_rounds: 2,
            venue: "Skava Lab",
            duration_1: "1 hrs",
            duration_2: "1.5 hrs"
        },
        coordinators_details: {
            name_1: "Kavin S",
            phone_1: "9384397477",
            name_2: "Vijay S",
            phone_2: "638320692"
        },
        round_wise_description: {
            round_1: "The first round is the preliminary round that contains a variety of questions that tests the students on their knowledge of analytical, problem-solving, and programming skills. The round contains a mix of MCQ-type questions and subjective questions. The participants that rank higher in this round advance to the next round.",
            round_2: "The second round is the Final round of this competition, which presents the participants with a set of programming problems with various difficulty levels to compose an interesting competition. The leaderboard is used to monitor the submissions of the participants. The team that solves the most problems will be announced as the winner."
        },
        event_rules: ["Team must contain a maximum of 2 members",
            "The top performing teams in Prelims will be selected for finals",
            "In case of a tie-breaker, the team that solves the problem first wins",
            "The leaderboard is used to determine the winner",
            "The participants should not involve in any unacceptable behavior, it will lead to the disqualification of the team.",
            "Question paper, pen, rough sheets for workout will be provided.",
            "Smartphone usage is not allowed during the events."]
    },
    event_7: {
        title: "Fortress",
        description: "We present you with yet another excuse to code your brain and heart out - ALGOCODE. Stack skills and queue tricks up your sleeve! This event will surely provide you with an array of problems that will untangle your mind. Fire up your editor and compile your way through this event to reach the root of this tournament tree.",
        general_info: {
            no_participants: 2,
            no_rounds: 2,
            venue: "Skava Lab",
            duration_1: "1 hrs",
            duration_2: "1.5 hrs"
        },
        coordinators_details: {
            name_1: "Kavin S",
            phone_1: "9384397477",
            name_2: "Vijay S",
            phone_2: "638320692"
        },
        round_wise_description: {
            round_1: "The first round is the preliminary round that contains a variety of questions that tests the students on their knowledge of analytical, problem-solving, and programming skills. The round contains a mix of MCQ-type questions and subjective questions. The participants that rank higher in this round advance to the next round.",
            round_2: "The second round is the Final round of this competition, which presents the participants with a set of programming problems with various difficulty levels to compose an interesting competition. The leaderboard is used to monitor the submissions of the participants. The team that solves the most problems will be announced as the winner."
        },
        event_rules: ["Team must contain a maximum of 2 members",
            "The top performing teams in Prelims will be selected for finals",
            "In case of a tie-breaker, the team that solves the problem first wins",
            "The leaderboard is used to determine the winner",
            "The participants should not involve in any unacceptable behavior, it will lead to the disqualification of the team.",
            "Question paper, pen, rough sheets for workout will be provided.",
            "Smartphone usage is not allowed during the events."]
    },
    event_8: {
        title: "Last stand",
        description: "We present you with yet another excuse to code your brain and heart out - ALGOCODE. Stack skills and queue tricks up your sleeve! This event will surely provide you with an array of problems that will untangle your mind. Fire up your editor and compile your way through this event to reach the root of this tournament tree.",
        general_info: {
            no_participants: 2,
            no_rounds: 2,
            venue: "Skava Lab",
            duration_1: "1 hrs",
            duration_2: "1.5 hrs"
        },
        coordinators_details: {
            name_1: "Kavin S",
            phone_1: "9384397477",
            name_2: "Vijay S",
            phone_2: "638320692"
        },
        round_wise_description: {
            round_1: "The first round is the preliminary round that contains a variety of questions that tests the students on their knowledge of analytical, problem-solving, and programming skills. The round contains a mix of MCQ-type questions and subjective questions. The participants that rank higher in this round advance to the next round.",
            round_2: "The second round is the Final round of this competition, which presents the participants with a set of programming problems with various difficulty levels to compose an interesting competition. The leaderboard is used to monitor the submissions of the participants. The team that solves the most problems will be announced as the winner."
        },
        event_rules: ["Team must contain a maximum of 2 members",
            "The top performing teams in Prelims will be selected for finals",
            "In case of a tie-breaker, the team that solves the problem first wins",
            "The leaderboard is used to determine the winner",
            "The participants should not involve in any unacceptable behavior, it will lead to the disqualification of the team.",
            "Question paper, pen, rough sheets for workout will be provided.",
            "Smartphone usage is not allowed during the events."]
    },
    event_9: {
        title: "Triple Trouble",
        description: "We present you with yet another excuse to code your brain and heart out - ALGOCODE. Stack skills and queue tricks up your sleeve! This event will surely provide you with an array of problems that will untangle your mind. Fire up your editor and compile your way through this event to reach the root of this tournament tree.",
        general_info: {
            no_participants: 2,
            no_rounds: 2,
            venue: "Skava Lab",
            duration_1: "1 hrs",
            duration_2: "1.5 hrs"
        },
        coordinators_details: {
            name_1: "Kavin S",
            phone_1: "9384397477",
            name_2: "Vijay S",
            phone_2: "638320692"
        },
        round_wise_description: {
            round_1: "The first round is the preliminary round that contains a variety of questions that tests the students on their knowledge of analytical, problem-solving, and programming skills. The round contains a mix of MCQ-type questions and subjective questions. The participants that rank higher in this round advance to the next round.",
            round_2: "The second round is the Final round of this competition, which presents the participants with a set of programming problems with various difficulty levels to compose an interesting competition. The leaderboard is used to monitor the submissions of the participants. The team that solves the most problems will be announced as the winner."
        },
        event_rules: ["Team must contain a maximum of 2 members",
            "The top performing teams in Prelims will be selected for finals",
            "In case of a tie-breaker, the team that solves the problem first wins",
            "The leaderboard is used to determine the winner",
            "The participants should not involve in any unacceptable behavior, it will lead to the disqualification of the team.",
            "Question paper, pen, rough sheets for workout will be provided.",
            "Smartphone usage is not allowed during the events."]
    },
};
// Quiz JavaScript for BloomTots

let currentAgeGroup = '';
let currentQuestion = 0;
let answers = [];

// Quiz questions for different age groups
const quizData = {
    toddler: [
        {
            question: "Does your child respond to their name when called?",
            options: ["Always", "Usually", "Sometimes", "Rarely or Never"]
        },
        {
            question: "Can your child follow simple instructions like 'come here' or 'give me'?",
            options: ["Yes, consistently", "Most of the time", "Sometimes", "Rarely or Never"]
        },
        {
            question: "Does your child make eye contact during interactions?",
            options: ["Yes, regularly", "Usually", "Sometimes", "Rarely"]
        },
        {
            question: "Does your child show interest in playing with other children?",
            options: ["Very interested", "Somewhat interested", "Limited interest", "No interest"]
        },
        {
            question: "Does your child use gestures to communicate (pointing, waving)?",
            options: ["Frequently", "Often", "Sometimes", "Rarely or Never"]
        },
        {
            question: "Does your child have repetitive behaviors (spinning, hand-flapping)?",
            options: ["Never", "Rarely", "Sometimes", "Frequently"]
        },
        {
            question: "Can your child say at least 10-15 words?",
            options: ["Yes, more than 15", "Yes, 10-15 words", "Fewer than 10 words", "No words yet"]
        },
        {
            question: "Does your child become extremely upset with changes in routine?",
            options: ["Rarely", "Sometimes", "Often", "Always"]
        },
        {
            question: "Does your child play pretend games (feeding a doll, talking on toy phone)?",
            options: ["Yes, regularly", "Sometimes", "Rarely", "Never"]
        },
        {
            question: "Does your child show affection appropriately (hugs, smiles)?",
            options: ["Yes, regularly", "Usually", "Sometimes", "Rarely"]
        }
    ],
    children: [
        {
            question: "Does your child have difficulty paying attention in school or during activities?",
            options: ["Rarely", "Sometimes", "Often", "Very Often"]
        },
        {
            question: "Does your child struggle to follow multi-step instructions?",
            options: ["Never", "Occasionally", "Often", "Always"]
        },
        {
            question: "Does your child have frequent tantrums or emotional outbursts?",
            options: ["Rarely", "Sometimes", "Often", "Very Often"]
        },
        {
            question: "Does your child have difficulty making or keeping friends?",
            options: ["No difficulty", "Some difficulty", "Significant difficulty", "Unable to maintain friendships"]
        },
        {
            question: "Does your child show excessive worry or anxiety?",
            options: ["Rarely", "Sometimes", "Often", "Almost Always"]
        },
        {
            question: "Does your child fidget or have trouble sitting still?",
            options: ["Rarely", "Sometimes", "Often", "Constantly"]
        },
        {
            question: "Does your child have trouble completing homework or tasks?",
            options: ["Rarely", "Sometimes", "Often", "Almost Always"]
        },
        {
            question: "Does your child seem to not listen when spoken to directly?",
            options: ["Rarely", "Sometimes", "Often", "Very Often"]
        },
        {
            question: "Does your child avoid social situations or seem withdrawn?",
            options: ["Never", "Rarely", "Sometimes", "Often"]
        },
        {
            question: "Does your child have difficulty understanding social cues?",
            options: ["No difficulty", "Minor difficulty", "Moderate difficulty", "Significant difficulty"]
        }
    ],
    teens: [
        {
            question: "Does your teen experience persistent sadness or mood changes?",
            options: ["Rarely", "Sometimes", "Often", "Almost Always"]
        },
        {
            question: "Has your teen lost interest in activities they used to enjoy?",
            options: ["Not at all", "Somewhat", "Considerably", "Completely"]
        },
        {
            question: "Does your teen have difficulty concentrating on schoolwork?",
            options: ["Rarely", "Sometimes", "Often", "Very Often"]
        },
        {
            question: "Does your teen isolate themselves from family and friends?",
            options: ["Never", "Rarely", "Often", "Most of the time"]
        },
        {
            question: "Does your teen express feelings of worthlessness or excessive guilt?",
            options: ["Never", "Rarely", "Sometimes", "Frequently"]
        },
        {
            question: "Has your teen's sleep pattern changed significantly?",
            options: ["No change", "Slight change", "Moderate change", "Severe change"]
        },
        {
            question: "Does your teen have angry outbursts or irritability?",
            options: ["Rarely", "Sometimes", "Often", "Very Often"]
        },
        {
            question: "Has your teen's academic performance declined recently?",
            options: ["No decline", "Slight decline", "Moderate decline", "Significant decline"]
        },
        {
            question: "Does your teen talk about self-harm or suicide?",
            options: ["Never", "Rarely", "Sometimes", "Yes, this is concerning"]
        },
        {
            question: "Does your teen have difficulty managing stress or anxiety?",
            options: ["Manages well", "Some difficulty", "Considerable difficulty", "Extreme difficulty"]
        }
    ]
};

function startQuiz(ageGroup) {
    currentAgeGroup = ageGroup;
    currentQuestion = 0;
    answers = [];
    
    document.getElementById('quizSelection').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    
    loadQuestion();
}

function loadQuestion() {
    const quiz = quizData[currentAgeGroup];
    const question = quiz[currentQuestion];
    
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('progressText').textContent = `Question ${currentQuestion + 1} of ${quiz.length}`;
    document.getElementById('progressBar').style.width = `${((currentQuestion + 1) / quiz.length) * 100}%`;
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        optionDiv.textContent = option;
        optionDiv.setAttribute('data-testid', `option-${index}`);
        
        if (answers[currentQuestion] === index) {
            optionDiv.classList.add('selected');
        }
        
        optionDiv.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update button states
    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    document.getElementById('nextBtn').textContent = currentQuestion === quiz.length - 1 ? 
        'View Results' : 'Next';
}

function selectOption(optionIndex) {
    answers[currentQuestion] = optionIndex;
    
    // Update UI
    document.querySelectorAll('.quiz-option').forEach((option, index) => {
        if (index === optionIndex) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function nextQuestion() {
    const quiz = quizData[currentAgeGroup];
    
    if (answers[currentQuestion] === undefined) {
        alert('Please select an answer before proceeding.');
        return;
    }
    
    if (currentQuestion < quiz.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    // Calculate score (lower is better)
    const totalQuestions = answers.length;
    const concernScore = answers.reduce((sum, answer) => sum + answer, 0);
    const maxScore = totalQuestions * 3;
    const percentage = (concernScore / maxScore) * 100;
    
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('resultsContainer').style.display = 'block';
    
    let resultMessage = '';
    let resultTitle = '';
    let iconColor = '';
    
    if (percentage < 25) {
        resultTitle = 'Low Concern Level';
        iconColor = '#81C995';
        resultMessage = `
            <p><strong>Based on your responses, your child appears to be developing typically.</strong></p>
            <p>Continue to monitor their development and maintain regular check-ups with their pediatrician. If you notice any changes or have specific concerns, don't hesitate to reach out to a professional.</p>
        `;
    } else if (percentage < 50) {
        resultTitle = 'Moderate Concern Level';
        iconColor = '#F6B93B';
        resultMessage = `
            <p><strong>Your responses suggest some areas that may benefit from attention.</strong></p>
            <p>We recommend scheduling a consultation with a child psychologist for a comprehensive evaluation. Early intervention can be very effective in addressing developmental concerns.</p>
        `;
    } else if (percentage < 75) {
        resultTitle = 'Elevated Concern Level';
        iconColor = '#E97171';
        resultMessage = `
            <p><strong>Your responses indicate several areas of concern that should be evaluated by a professional.</strong></p>
            <p>We strongly recommend scheduling an assessment with our team. Our specialists can provide a thorough evaluation and develop a personalized support plan for your child.</p>
        `;
    } else {
        resultTitle = 'High Concern Level';
        iconColor = '#E97171';
        resultMessage = `
            <p><strong>Your responses suggest significant concerns that require professional attention.</strong></p>
            <p>Please contact us as soon as possible to schedule a comprehensive assessment. Our team is here to provide the support and guidance your family needs. Early intervention is crucial and can make a significant difference.</p>
        `;
    }
    
    document.getElementById('resultsTitle').textContent = resultTitle;
    document.getElementById('resultsScore').textContent = `Assessment completed: ${totalQuestions} questions answered`;
    document.getElementById('resultsMessage').innerHTML = resultMessage;
    document.querySelector('.results-icon').style.backgroundColor = iconColor;
    
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToSelection() {
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('quizSelection').style.display = 'block';
    currentQuestion = 0;
    answers = [];
}

function restartQuiz() {
    document.getElementById('resultsContainer').style.display = 'none';
    document.getElementById('quizSelection').style.display = 'block';
    currentQuestion = 0;
    answers = [];
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

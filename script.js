// Wait for DOM to be fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const welcomeScreen = document.getElementById('welcome-screen');
    const instructionScreen = document.getElementById('instruction-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');

    const playerNameInput = document.getElementById('player-name');
    const startBtn = document.getElementById('start-btn');
    const playerNameDisplay = document.getElementById('player-name-display');
    const difficultyBtns = document.querySelectorAll('.btn-difficulty');

    const questionCounter = document.getElementById('current-question');
    const totalQuestionsEl = document.getElementById('total-questions');
    const difficultyDisplay = document.getElementById('difficulty-display');
    const timeRemainingEl = document.getElementById('time-remaining');
    const questionCode = document.getElementById('question-code');
    const optionBtns = document.querySelectorAll('.option-btn');
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('next-btn');

    const resultPlayerName = document.getElementById('result-player-name');
    const resultDifficulty = document.getElementById('result-difficulty');
    const finalScore = document.getElementById('final-score');
    const correctAnswers = document.getElementById('correct-answers');
    const accuracy = document.getElementById('accuracy');
    const playAgainBtn = document.getElementById('play-again-btn');
    const homeBtn = document.getElementById('home-btn');

    // Game state
    const gameState = {
        playerName: '',
        difficulty: '',
        questions: [],
        currentQuestionIndex: 0,
        score: 0,
        correctAnswers: 0,
        totalQuestions: 0,
        timeRemaining: 30,
        timer: null
    };

    // Question Bank
    const questionBank = {
        junior: [
            {
                code: 'function add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(5, 3));',
                options: ['8', '"53"', 'undefined', 'Error'],
                correctIndex: 0
            },
            {
                code: 'let x = "5";\nlet y = 2;\n\nconsole.log(x + y);',
                options: ['7', '"52"', '52', 'Error'],
                correctIndex: 1
            },
            {
                code: 'const fruits = ["apple", "banana", "orange"];\n\nconsole.log(fruits[1]);',
                options: ['"apple"', '"banana"', '"orange"', 'undefined'],
                correctIndex: 1
            },
            {
                code: 'let num = 10;\n\nif (num > 5) {\n  console.log("Greater");\n} else {\n  console.log("Smaller");\n}',
                options: ['"Greater"', '"Smaller"', 'undefined', 'Error'],
                correctIndex: 0
            },
            {
                code: 'function greet(name) {\n  if (name) {\n    return "Hello, " + name + "!";\n  }\n}\n\nconsole.log(greet());',
                options: ['"Hello, undefined!"', 'undefined', 'null', 'Error'],
                correctIndex: 1
            }
        ],
        mid: [
            {
                code: 'let arr = [1, 2, 3];\nlet newArr = [...arr, 4, 5];\n\nconsole.log(newArr.length);',
                options: ['3', '5', '6', '8'],
                correctIndex: 1
            },
            {
                code: 'const person = {\n  name: "John",\n  age: 30\n};\n\nconst {name, salary = "Unknown"} = person;\n\nconsole.log(salary);',
                options: ['"John"', '30', '"Unknown"', 'undefined'],
                correctIndex: 2
            },
            {
                code: 'function counter() {\n  let count = 0;\n  return function() {\n    return ++count;\n  };\n}\n\nconst increment = counter();\nconsole.log(increment());\nconsole.log(increment());',
                options: ['0, 1', '1, 1', '1, 2', 'Error'],
                correctIndex: 2
            },
            {
                code: 'console.log(typeof typeof 42);',
                options: ['number', 'string', 'undefined', 'object'],
                correctIndex: 1
            },
            {
                code: 'const promise = new Promise(resolve => resolve(1));\n\npromise\n  .then(val => val + 1)\n  .then(val => console.log(val));',
                options: ['1', '2', 'undefined', 'Promise {<fulfilled>: 2}'],
                correctIndex: 1
            },
            {
                code: 'let x = 10;\n\nfunction foo() {\n  console.log(x);\n  let x = 20;\n}\n\ntry {\n  foo();\n} catch (error) {\n  console.log("Error");\n}',
                options: ['10', '20', 'undefined', '"Error"'],
                correctIndex: 3
            },
            {
                code: 'const arr = [1, 2, 3, 4, 5];\nconst result = arr.filter(num => num % 2).map(num => num * 2);\n\nconsole.log(result);',
                options: ['[2, 6, 10]', '[2, 4, 6, 8, 10]', '[2, 4]', '[2, 6]'],
                correctIndex: 0
            },
            {
                code: 'console.log("1" == 1);',
                options: ['true', 'false', 'undefined', 'Error'],
                correctIndex: 0
            },
            {
                code: 'const obj = {a: 1};\nconst newObj = Object.assign({}, obj, {b: 2});\n\nconsole.log(newObj);',
                options: ['{a: 1}', '{b: 2}', '{a: 1, b: 2}', '{...obj, b: 2}'],
                correctIndex: 2
            },
            {
                code: 'function sum(...nums) {\n  return nums.reduce((acc, curr) => acc + curr, 0);\n}\n\nconsole.log(sum(1, 2, 3));',
                options: ['3', '6', '[1, 2, 3]', 'Error'],
                correctIndex: 1
            }
        ],
        senior: [
            {
                code: 'console.log(0.1 + 0.2 === 0.3);',
                options: ['true', 'false', 'undefined', 'Error'],
                correctIndex: 1
            },
            {
                code: 'function* generator() {\n  yield 1;\n  yield 2;\n  return 3;\n}\n\nconst gen = generator();\nconsole.log([...gen]);',
                options: ['[1, 2, 3]', '[1, 2]', '[3]', 'Error'],
                correctIndex: 1
            },
            {
                code: 'const asyncFunc = async () => {\n  return "Hello";\n};\n\nconsole.log(asyncFunc());',
                options: ['"Hello"', 'Promise {<pending>}', 'Promise {<fulfilled>: "Hello"}', 'undefined'],
                correctIndex: 2
            },
            {
                code: 'const sym1 = Symbol("a");\nconst sym2 = Symbol("a");\n\nconsole.log(sym1 === sym2);',
                options: ['true', 'false', 'undefined', 'Error'],
                correctIndex: 1
            },
            {
                code: 'const proto = {greeting: "Hello"};\nconst obj = Object.create(proto);\n\nconsole.log(obj.hasOwnProperty("greeting"));',
                options: ['true', 'false', 'undefined', 'Error'],
                correctIndex: 1
            },
            {
                code: 'function memoize(fn) {\n  const cache = {};\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache[key]) return cache[key];\n    const result = fn.apply(this, args);\n    cache[key] = result;\n    return result;\n  };\n}\n\nlet calls = 0;\nconst factorial = memoize(n => {\n  calls++;\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n});\n\nfactorial(5);\nfactorial(5);\nconsole.log(calls);',
                options: ['5', '6', '10', '12'],
                correctIndex: 1
            },
            {
                code: 'const proxy = new Proxy({}, {\n  get: (target, property) => `Property ${property} does not exist`\n});\n\nconsole.log(proxy.nonExistent);',
                options: ['undefined', 'null', '"Property nonExistent does not exist"', 'Error'],
                correctIndex: 2
            },
            {
                code: 'class Base {\n  constructor() {\n    this.name = "Base";\n    this.getName();\n  }\n  getName() {\n    console.log(this.name);\n  }\n}\n\nclass Derived extends Base {\n  constructor() {\n    super();\n    this.name = "Derived";\n  }\n  getName() {\n    console.log(`Derived: ${this.name}`);\n  }\n}\n\nconst obj = new Derived();',
                options: ['"Base"', '"Derived"', '"Derived: Base"', '"Derived: Derived"'],
                correctIndex: 2
            },
            {
                code: 'const arr = [1, 2, 3];\nconst iterator = arr[Symbol.iterator]();\n\niterator.next();\niterator.next();\nconsole.log(iterator.next());',
                options: ['{value: 1, done: false}', '{value: 2, done: false}', '{value: 3, done: false}', '{value: undefined, done: true}'],
                correctIndex: 2
            },
            {
                code: 'const funcOne = () => ({ a: 1 });\nconst funcTwo = () => { a: 1 };\n\nconsole.log(funcOne(), funcTwo());',
                options: ['{a: 1}, {a: 1}', '{a: 1}, undefined', '{a: 1}, 1', 'Error'],
                correctIndex: 1
            },
            {
                code: 'String.prototype.customTrim = String.prototype.trim;\nconst str = "  Hello  ";\n\nconsole.log(str.customTrim === "Hello".customTrim);',
                options: ['true', 'false', 'undefined', 'Error'],
                correctIndex: 0
            },
            {
                code: 'const WeakObj = new WeakMap();\nlet obj = {data: "important"};\nWeakObj.set(obj, "metadata");\n\nobj = null;\n\nconsole.log(WeakObj.size);',
                options: ['0', '1', 'undefined', 'Error'],
                correctIndex: 2
            },
            {
                code: 'const frozen = Object.freeze({data: {value: 42}});\nfrozen.data.value = 100;\n\nconsole.log(frozen.data.value);',
                options: ['42', '100', 'undefined', 'Error'],
                correctIndex: 1
            },
            {
                code: 'function calculate() {\n  try {\n    return "success";\n  } finally {\n    return "finally";\n  }\n}\n\nconsole.log(calculate());',
                options: ['"success"', '"finally"', '"success" followed by "finally"', 'Error'],
                correctIndex: 1
            },
            {
                code: 'console.log([] + {});',
                options: ['[]{}', '"[object Object]"', '0', 'Error'],
                correctIndex: 1
            }
        ]
    };

    // Helper Functions
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function formatCode(code) {
        // Basic syntax highlighting
        const keywordRegex = /\b(function|return|if|else|let|const|var|new|try|catch|class|extends|super|async|await|yield|for|while|of|in|null|undefined|true|false)\b/g;
        const stringRegex = /(['"`])(?:(?=(\\?))\2.)*?\1/g;
        const numberRegex = /\b(\d+(\.\d+)?)\b/g;
        const functionRegex = /\b([a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\())/g;
        const commentRegex = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)/gm;
        const operatorRegex = /([+\-*/%=!<>&|^~?:]+)/g;
        const propertyRegex = /\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
        const bracketRegex = /[[\]{}()]/g;
        
        let formattedCode = code
            .replace(keywordRegex, '<span class="keyword">$&</span>')
            .replace(stringRegex, '<span class="string">$&</span>')
            .replace(numberRegex, '<span class="number">$&</span>')
            .replace(functionRegex, '<span class="function">$&</span>')
            .replace(commentRegex, '<span class="comment">$&</span>')
            .replace(operatorRegex, '<span class="operator">$&</span>')
            .replace(propertyRegex, '.<span class="property">$1</span>')
            .replace(bracketRegex, '<span class="bracket">$&</span>');
        
        return formattedCode;
    }

    // Function to switch screens
    function showScreen(screen) {
        const screens = [welcomeScreen, instructionScreen, quizScreen, resultScreen];
        screens.forEach(s => s.classList.remove('active'));
        screen.classList.add('active');
    }

    // Function to start timer
    function startTimer() {
        clearInterval(gameState.timer);
        gameState.timeRemaining = 30;
        timeRemainingEl.textContent = gameState.timeRemaining;
        
        gameState.timer = setInterval(() => {
            gameState.timeRemaining--;
            timeRemainingEl.textContent = gameState.timeRemaining;
            
            if (gameState.timeRemaining <= 10) {
                timeRemainingEl.style.color = 'var(--error)';
            } else {
                timeRemainingEl.style.color = 'var(--tertiary)';
            }
            
            if (gameState.timeRemaining <= 0) {
                clearInterval(gameState.timer);
                handleAnswer(null);
            }
        }, 1000);
    }

    // Function to load question
    function loadQuestion() {
        const question = gameState.questions[gameState.currentQuestionIndex];
        
        // Update question counter
        questionCounter.textContent = gameState.currentQuestionIndex + 1;
        totalQuestionsEl.textContent = gameState.totalQuestions;
        
        // Update code
        questionCode.innerHTML = formatCode(question.code);
        
        // Reset options
        optionBtns.forEach((btn, index) => {
            btn.textContent = question.options[index];
            btn.className = 'option-btn';
            btn.disabled = false;
        });
        
        // Hide feedback and next button
        feedback.className = 'feedback';
        nextBtn.style.display = 'none';
        
        // Start timer
        startTimer();
    }

    // Function to handle answer
    function handleAnswer(selectedIndex) {
        clearInterval(gameState.timer);
        
        const question = gameState.questions[gameState.currentQuestionIndex];
        const correctIndex = question.correctIndex;
        
        // Disable all options
        optionBtns.forEach(btn => {
            btn.disabled = true;
        });
        
        // If user selected an answer
        if (selectedIndex !== null) {
            optionBtns[selectedIndex].classList.add('selected');
            
            if (selectedIndex === correctIndex) {
                // Correct answer
                optionBtns[selectedIndex].classList.add('correct');
                feedback.textContent = '✓ Benar! Jawaban tepat.';
                feedback.className = 'feedback correct';
                gameState.score += 10;
                gameState.correctAnswers++;
            } else {
                // Incorrect answer
                optionBtns[selectedIndex].classList.add('incorrect');
                optionBtns[correctIndex].classList.add('correct');
                feedback.textContent = '✗ Salah! Jawaban yang benar adalah: ' + question.options[correctIndex];
                feedback.className = 'feedback incorrect';
            }
        } else {
            // Time's up
            optionBtns[correctIndex].classList.add('correct');
            feedback.textContent = '⏰ Waktu habis! Jawaban yang benar adalah: ' + question.options[correctIndex];
            feedback.className = 'feedback incorrect';
        }
        
        // Show next button
        nextBtn.style.display = 'flex';
    }

    // Function to show results
    function showResults() {
        resultPlayerName.textContent = gameState.playerName;
        resultDifficulty.textContent = gameState.difficulty.charAt(0).toUpperCase() + gameState.difficulty.slice(1);
        finalScore.textContent = gameState.score;
        correctAnswers.textContent = gameState.correctAnswers + '/' + gameState.totalQuestions;
        accuracy.textContent = Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100) + '%';
        
        showScreen(resultScreen);
    }

    // Event Listeners
    // Start button click
    startBtn.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            gameState.playerName = playerName;
            playerNameDisplay.textContent = playerName;
            showScreen(instructionScreen);
        } else {
            playerNameInput.classList.add('error');
            setTimeout(() => {
                playerNameInput.classList.remove('error');
            }, 500);
        }
    });
    
    // Difficulty buttons click
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const difficulty = btn.getAttribute('data-difficulty');
            gameState.difficulty = difficulty;
            gameState.questions = [...questionBank[difficulty]];
            gameState.questions = shuffleArray(gameState.questions);
            gameState.currentQuestionIndex = 0;
            gameState.score = 0;
            gameState.correctAnswers = 0;
            gameState.totalQuestions = gameState.questions.length;
            
            // Update difficulty display
            difficultyDisplay.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
            difficultyDisplay.className = difficulty;
            
            // Start quiz
            showScreen(quizScreen);
            loadQuestion();
        });
    });
    
    // Option buttons click
    optionBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            handleAnswer(index);
        });
    });
    
    // Next button click
    nextBtn.addEventListener('click', () => {
        gameState.currentQuestionIndex++;
        
        if (gameState.currentQuestionIndex < gameState.totalQuestions) {
            loadQuestion();
        } else {
            showResults();
        }
    });
    
    // Play again button click
    playAgainBtn.addEventListener('click', () => {
        showScreen(instructionScreen);
    });
    
    // Home button click
    homeBtn.addEventListener('click', () => {
        playerNameInput.value = '';
        showScreen(welcomeScreen);
    });
    
    // Enter key press on player name input
    playerNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            startBtn.click();
        }
    });
    
    // Add typing effect to player name input
    playerNameInput.addEventListener('focus', () => {
        playerNameInput.classList.add('typing-effect');
    });
    
    playerNameInput.addEventListener('blur', () => {
        playerNameInput.classList.remove('typing-effect');
    });

    // Initialize game - show the welcome screen first
    showScreen(welcomeScreen);
    
    
    
    
    
    const canvas = document.createElement('canvas');
    canvas.id = 'space-background';
    
    // Set canvas styles
    Object.assign(canvas.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: '-1',
        pointerEvents: 'none',
        backgroundColor: '#0d1117' // Dark space background color
    });
    
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions to match window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Initialize particles array
    let particles = [];
    const PARTICLE_COUNT = 150;
    
    // Create particles
    function createParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 0.5,
                speedX: Math.random() * 0.2 - 0.1,
                speedY: Math.random() * 0.2 - 0.1,
                opacity: Math.random() * 0.5 + 0.3,
                color: getRandomColor()
            });
        }
    }
    
    // Get a random star color
    function getRandomColor() {
        const colors = [
            '#ffffff', // White
            '#f7df1e', // JS Yellow
            '#ececec', // Light Grey
            '#8be9fd', // Light Blue
            '#d4d4d4'  // Silver
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Update particles position
    function updateParticles() {
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Wrap particles around screen edges
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
        });
    }
    
    // Draw particles on canvas
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Add a gradient background effect
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#0d1117');
        gradient.addColorStop(1, '#161b22');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw each particle
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        });
        
        // Draw connecting lines between nearby particles
        connectParticles();
    }
    
    // Connect particles with lines if they're close enough
    function connectParticles() {
        const maxDistance = 100;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#f7df1e'; // JS Yellow
                    ctx.globalAlpha = 0.1 * (1 - distance / maxDistance);
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Attract nearby particles to mouse
        particles.forEach(p => {
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                const force = 0.1 * (1 - distance / 100);
                p.speedX += Math.cos(angle) * force;
                p.speedY += Math.sin(angle) * force;
                
                // Limit maximum speed
                const maxSpeed = 2;
                const currentSpeed = Math.sqrt(p.speedX * p.speedX + p.speedY * p.speedY);
                if (currentSpeed > maxSpeed) {
                    p.speedX = (p.speedX / currentSpeed) * maxSpeed;
                    p.speedY = (p.speedY / currentSpeed) * maxSpeed;
                }
            }
        });
    });
    
    // Animation loop
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    // Initialize
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
    
    resizeCanvas();
    createParticles();
    animate();
    
    // Create some special shooting stars
    setInterval(() => {
        const shootingStar = {
            x: Math.random() * canvas.width,
            y: 0,
            length: Math.random() * 80 + 50,
            speed: Math.random() * 10 + 5,
            angle: Math.PI / 4 + (Math.random() * Math.PI / 4),
            opacity: 1
        };
        
        const shootingStarAnimation = setInterval(() => {
            ctx.beginPath();
            ctx.moveTo(shootingStar.x, shootingStar.y);
            
            // Calculate end point based on angle and length
            const endX = shootingStar.x + Math.cos(shootingStar.angle) * shootingStar.length;
            const endY = shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.length;
            
            // Create gradient for shooting star
            const gradient = ctx.createLinearGradient(
                shootingStar.x, shootingStar.y, 
                endX, endY
            );
            gradient.addColorStop(0, `rgba(247, 223, 30, ${shootingStar.opacity})`);
            gradient.addColorStop(1, 'rgba(247, 223, 30, 0)');
            
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Move shooting star
            shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
            shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
            shootingStar.opacity -= 0.02;
            
            // Remove when off screen or faded out
            if (shootingStar.opacity <= 0 || 
                shootingStar.x > canvas.width || 
                shootingStar.y > canvas.height) {
                clearInterval(shootingStarAnimation);
            }
        }, 20);
    }, 3000); 
});
(function () {
    let stage;
    let assets;
    let slotMachineBackground;
    let spinButton;
    let bet1Button;
    let bet10Button;
    let bet100Button;
    let betMaxButton;
    let jackPotLabel;
    let creditLabel;
    let winningsLabel;
    let betLabel;
    let leftReel;
    let middleReel;
    let rightReel;
    let betLine;
    let grapes = 0;
    let bananas = 0;
    let oranges = 0;
    let cherries = 0;
    let bars = 0;
    let bells = 0;
    let sevens = 0;
    let blanks = 0;
    let jackpot = 5000;
    let playerMoney = "1000";
    let winnings = 0;
    let manifest = [
        { id: "background", src: "./Assets/images/background.png" },
        { id: "banana", src: "./Assets/images/banana.gif" },
        { id: "bar", src: "./Assets/images/bar.gif" },
        { id: "bell", src: "./Assets/images/bell.gif" },
        { id: "bet_line", src: "./Assets/images/bet_line.gif" },
        { id: "bet1Button", src: "./Assets/images/bet1Button.png" },
        { id: "bet10Button", src: "./Assets/images/bet10Button.png" },
        { id: "bet100Button", src: "./Assets/images/bet100Button.png" },
        { id: "betMaxButton", src: "./Assets/images/betMaxButton.png" },
        { id: "blank", src: "./Assets/images/blank.gif" },
        { id: "cherry", src: "./Assets/images/cherry.gif" },
        { id: "genericButton", src: "./Assets/images/genericButton.png" },
        { id: "grape", src: "./Assets/images/grapes.gif" },
        { id: "orange", src: "./Assets/images/orange.gif" },
        { id: "seven", src: "./Assets/images/seven.gif" },
        { id: "spinButton", src: "./Assets/images/spinButton.png" },
    ];
    function Preload() {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on("complete", Start);
        assets.loadManifest(manifest);
    }
    function Start() {
        console.log("App started!!");
        let canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);
        Config.Globals.AssetManifest = assets;
        Main();
        stage.enableMouseOver(20);
    }
    window.addEventListener("load", Preload);
    function Update() {
        stage.update();
    }
    function buildInterface() {
        slotMachineBackground = new Core.GameObject("background", Config.Screen.CENTER_X, Config.Screen.CENTER_Y, true);
        stage.addChild(slotMachineBackground);
        spinButton = new UIobjects.Button("spinButton", Config.Screen.CENTER_X + 135, Config.Screen.CENTER_Y + 177, true);
        stage.addChild(spinButton);
        bet1Button = new UIobjects.Button("bet1Button", Config.Screen.CENTER_X + -135, Config.Screen.CENTER_Y + 177, true);
        stage.addChild(bet1Button);
        bet10Button = new UIobjects.Button("bet10Button", Config.Screen.CENTER_X + -68, Config.Screen.CENTER_Y + 177, true);
        stage.addChild(bet10Button);
        bet100Button = new UIobjects.Button("bet100Button", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 177, true);
        stage.addChild(bet100Button);
        betMaxButton = new UIobjects.Button("betMaxButton", Config.Screen.CENTER_X + 68, Config.Screen.CENTER_Y + 177, true);
        stage.addChild(betMaxButton);
        jackPotLabel = new UIobjects.Label("99999999", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, 65, true);
        stage.addChild(jackPotLabel);
        creditLabel = new UIobjects.Label(playerMoney, "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X - 95, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(creditLabel);
        winningsLabel = new UIobjects.Label("0", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X + 95, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(winningsLabel);
        betLabel = new UIobjects.Label("0", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(betLabel);
        leftReel = new Core.GameObject("bell", Config.Screen.CENTER_X - 79, Config.Screen.CENTER_Y - 13, true);
        stage.addChild(leftReel);
        middleReel = new Core.GameObject("banana", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 13, true);
        stage.addChild(middleReel);
        rightReel = new Core.GameObject("bar", Config.Screen.CENTER_X + 77, Config.Screen.CENTER_Y - 13, true);
        stage.addChild(rightReel);
        betLine = new Core.GameObject("bet_line", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 13, true);
        stage.addChild(betLine);
    }
    function resetFruitTally() {
        grapes = 0;
        bananas = 0;
        oranges = 0;
        cherries = 0;
        bars = 0;
        bells = 0;
        sevens = 0;
        blanks = 0;
    }
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        }
        else {
            return !value;
        }
    }
    /* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
    function Reels() {
        var betLine = [" ", " ", " "];
        var outCome = [0, 0, 0];
        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 27): // 41.5% probability
                    betLine[spin] = "blank";
                    blanks++;
                    break;
                case checkRange(outCome[spin], 28, 37): // 15.4% probability
                    betLine[spin] = "grape";
                    grapes++;
                    break;
                case checkRange(outCome[spin], 38, 46): // 13.8% probability
                    betLine[spin] = "banana";
                    bananas++;
                    break;
                case checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "orange";
                    oranges++;
                    break;
                case checkRange(outCome[spin], 55, 59): //  7.7% probability
                    betLine[spin] = "cherry";
                    cherries++;
                    break;
                case checkRange(outCome[spin], 60, 62): //  4.6% probability
                    betLine[spin] = "bar";
                    bars++;
                    break;
                case checkRange(outCome[spin], 63, 64): //  3.1% probability
                    betLine[spin] = "bell";
                    bells++;
                    break;
                case checkRange(outCome[spin], 65, 65): //  1.5% probability
                    betLine[spin] = "seven";
                    sevens++;
                    break;
            }
        }
        return betLine;
    }
    function interfaceLogic() {
        spinButton.on("click", () => {
            let totalMoney = parseInt(playerMoney);
            let bet = parseInt(betLabel.text);
            if (totalMoney === 0) {
                //window.alert("Not enough funds available");
                let clickOK = confirm("Not enough funds available, please enter ok to restart!");
                if (clickOK) {
                    window.location.reload();
                }
            }
            else if (bet > totalMoney) {
                window.alert("Take a look at your funds!!");
            }
            else if (bet == 0) {
                window.alert("Please enter bet amount!");
            }
            else {
                let reels = Reels();
                leftReel.image = assets.getResult(reels[0]);
                middleReel.image = assets.getResult(reels[1]);
                rightReel.image = assets.getResult(reels[2]);
                Credit(playerMoney);
                determineWinnings();
                resetFruitTally();
            }
        });
        bet1Button.on("click", () => {
            betLabel.text = "1";
        });
        bet10Button.on("click", () => {
            betLabel.text = "10";
        });
        bet100Button.on("click", () => {
            betLabel.text = "100";
        });
        betMaxButton.on("click", () => {
            betLabel.text = playerMoney;
        });
    }
    //coverting string playerMoney value to int and then make it reverse to store string value to playerMoney
    function Credit(Money) {
        let money = parseInt(Money, 10);
        let bet = parseInt(betLabel.text, 10);
        money -= bet;
        playerMoney = money.toString();
        creditLabel.text = playerMoney;
    }
    function checkJackPot() {
        /* compare two random values */
        var jackPotTry = Math.floor(Math.random() * 51 + 1);
        var jackPotWin = Math.floor(Math.random() * 51 + 1);
        if (jackPotTry == jackPotWin) {
            alert("You Won the $" + jackpot + " Jackpot!!");
            jackPotLabel.text = "JACKPOT!";
        }
    }
    function Main() {
        buildInterface();
        interfaceLogic();
    }
    function determineWinnings() {
        let playerBet = parseInt(betLabel.text, 10);
        if (blanks == 0) {
            if (grapes == 3) {
                winnings = playerBet * 10;
                winningsLabel.text = winnings.toString();
                checkJackPot();
            }
            else if (bananas == 3) {
                winnings = playerBet * 20;
                winningsLabel.text = winnings.toString();
                checkJackPot();
            }
            else if (oranges == 3) {
                winnings = playerBet * 30;
                winningsLabel.text = winnings.toString();
                checkJackPot();
            }
            else if (cherries == 3) {
                winnings = playerBet * 40;
                winningsLabel.text = winnings.toString();
                checkJackPot();
            }
            else if (bars == 3) {
                winnings = playerBet * 50;
                winningsLabel.text = winnings.toString();
                checkJackPot();
            }
            else if (bells == 3) {
                winnings = playerBet * 75;
                winningsLabel.text = winnings.toString();
                checkJackPot();
            }
            else if (sevens == 3) {
                winnings = playerBet * 100;
                winningsLabel.text = winnings.toString();
                checkJackPot();
            }
            else if (grapes == 2) {
                winnings = playerBet * 2;
                winningsLabel.text = winnings.toString();
            }
            else if (bananas == 2) {
                winnings = playerBet * 2;
                winningsLabel.text = winnings.toString();
            }
            else if (oranges == 2) {
                winnings = playerBet * 3;
                winningsLabel.text = winnings.toString();
            }
            else if (cherries == 2) {
                winnings = playerBet * 4;
                winningsLabel.text = winnings.toString();
            }
            else if (bars == 2) {
                winnings = playerBet * 5;
                winningsLabel.text = winnings.toString();
            }
            else if (bells == 2) {
                winnings = playerBet * 10;
                winningsLabel.text = winnings.toString();
            }
            else if (sevens == 2) {
                winnings = playerBet * 20;
                winningsLabel.text = winnings.toString();
            }
            else if (sevens == 1) {
                winnings = playerBet * 5;
                winningsLabel.text = winnings.toString();
            }
            else {
                winnings = playerBet * 1;
                winningsLabel.text = winnings.toString();
            }
            let total = parseInt(playerMoney);
            total += winnings;
            playerMoney = total.toString();
            creditLabel.text = playerMoney;
            //winNumber++;
            //showWinMessage();
        }
        else {
            //lossNumber++;
            //showLossMessage();
        }
    }
})();
//# sourceMappingURL=app.js.map
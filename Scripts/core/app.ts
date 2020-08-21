(function()
{
    let stage:createjs.Stage;
    let assets:createjs.LoadQueue;
    let slotMachineBackground:Core.GameObject;
    let spinButton:UIobjects.Button;
    let bet1Button:UIobjects.Button;
    let bet10Button:UIobjects.Button;
    let bet100Button:UIobjects.Button;
    let betMaxButton:UIobjects.Button;
    let jackPotLabel:UIobjects.Label;
    let creditLabel:UIobjects.Label;
    let winningsLabel:UIobjects.Label;
    let betLabel:UIobjects.Label;
    let leftReel:Core.GameObject;
    let middleReel:Core.GameObject;
    let rightReel:Core.GameObject;
    let betLine:Core.GameObject;

    let grapes = 0;
    let bananas = 0;
    let oranges = 0;
    let cherries = 0;
    let bars = 0;
    let bells = 0;
    let sevens = 0;
    let blanks = 0;

    let playerMoney="1000";

    let manifest:Core.Item[]=[
        {id:"background",src:"./Assets/images/background.png"},
        {id:"banana",src:"./Assets/images/banana.gif"},
        {id:"bar",src:"./Assets/images/bar.gif"},
        {id:"bell",src:"./Assets/images/bell.gif"},
        {id:"bet_line",src:"./Assets/images/bet_line.gif"},
        {id:"bet1Button",src:"./Assets/images/bet1Button.png"},
        {id:"bet10Button",src:"./Assets/images/bet10Button.png"},
        {id:"bet100Button",src:"./Assets/images/bet100Button.png"},
        {id:"betMaxButton",src:"./Assets/images/betMaxButton.png"},
        {id:"blank",src:"./Assets/images/blank.gif"},
        {id:"cherry",src:"./Assets/images/cherry.gif"},
        {id:"genericButton",src:"./Assets/images/genericButton.png"},
        {id:"grapes",src:"./Assets/images/grapes.gif"},
        {id:"orange",src:"./Assets/images/orange.gif"},
        {id:"seven",src:"./Assets/images/seven.gif"},
        {id:"spinButton",src:"./Assets/images/spinButton.png"},
    ]

    function Preload():void
    {
        assets=new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on("complete",Start);

        assets.loadManifest(manifest);
    }
    function Start():void
    {
        console.log("App started!!");

        let canvas=document.getElementById("canvas") as HTMLCanvasElement;
        stage=new createjs.Stage(canvas);
        createjs.Ticker.framerate=60;
        createjs.Ticker.on("tick",Update);

        Config.Globals.AssetManifest=assets;
        Main();

        stage.enableMouseOver(20);
    }
    window.addEventListener("load",Preload);

    function Update():void
    {
        
        stage.update();
    }

    function buildInterface():void
    {
        slotMachineBackground=new Core.GameObject("background",Config.Screen.CENTER_X,Config.Screen.CENTER_Y,true);
        stage.addChild(slotMachineBackground);
        spinButton=new UIobjects.Button("spinButton",Config.Screen.CENTER_X+135,Config.Screen.CENTER_Y+177,true);
        stage.addChild(spinButton);


        bet1Button=new UIobjects.Button("bet1Button",Config.Screen.CENTER_X+-135,Config.Screen.CENTER_Y+177,true);
        stage.addChild(bet1Button);

        

        bet10Button=new UIobjects.Button("bet10Button",Config.Screen.CENTER_X+-68,Config.Screen.CENTER_Y+177,true);
        stage.addChild(bet10Button);

        bet100Button=new UIobjects.Button("bet100Button",Config.Screen.CENTER_X,Config.Screen.CENTER_Y+177,true);
        stage.addChild(bet100Button);

        betMaxButton=new UIobjects.Button("betMaxButton",Config.Screen.CENTER_X+68,Config.Screen.CENTER_Y+177,true);
        stage.addChild(betMaxButton);

        jackPotLabel=new UIobjects.Label("99999999","20px","Consolas","#FF0000",Config.Screen.CENTER_X,65,true);
        stage.addChild(jackPotLabel);

        creditLabel=new UIobjects.Label(playerMoney,"20px","Consolas","#FF0000",Config.Screen.CENTER_X-95,Config.Screen.CENTER_Y+108,true);
        stage.addChild(creditLabel);

        winningsLabel=new UIobjects.Label("99999999","20px","Consolas","#FF0000",Config.Screen.CENTER_X+95,Config.Screen.CENTER_Y+108,true);
        stage.addChild(winningsLabel);

        betLabel=new UIobjects.Label("0000","20px","Consolas","#FF0000",Config.Screen.CENTER_X,Config.Screen.CENTER_Y+108,true);
        stage.addChild(betLabel);

        leftReel=new Core.GameObject("bell",Config.Screen.CENTER_X-79,Config.Screen.CENTER_Y-13,true);
        stage.addChild(leftReel);

        middleReel=new Core.GameObject("banana",Config.Screen.CENTER_X,Config.Screen.CENTER_Y-13,true);
        stage.addChild(middleReel);

        rightReel=new Core.GameObject("bar",Config.Screen.CENTER_X+77,Config.Screen.CENTER_Y-13,true);
        stage.addChild(rightReel);

        betLine=new Core.GameObject("bet_line",Config.Screen.CENTER_X,Config.Screen.CENTER_Y-13,true);
        stage.addChild(betLine);
    }

    function checkRange(value:number, lowerBounds:number, upperBounds:number):number|boolean {
        if (value >= lowerBounds && value <= upperBounds)
        {
            return value;
        }
        else {
            return !value;
        }
    }

    /* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
    function Reels():string[] {
        var betLine = [" ", " ", " "];
        var outCome = [0, 0, 0];

        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                    betLine[spin] = "blank";
                    blanks++;
                    break;
                case checkRange(outCome[spin], 28, 37): // 15.4% probability
                    betLine[spin] = "grapes";
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

    

    function interfaceLogic():void
    {
        spinButton.on("click",()=>
        {
            let reels=Reels();

            leftReel.image=assets.getResult(reels[0]) as HTMLImageElement;
            middleReel.image=assets.getResult(reels[1]) as HTMLImageElement;
            rightReel.image=assets.getResult(reels[2]) as HTMLImageElement;
            Credit(playerMoney);
        });

        bet1Button.on("click",()=>
        {
            betLabel.text="1";
        });

        bet10Button.on("click",()=>
        {
            betLabel.text="10";
        });

        bet100Button.on("click",()=>
        {
            betLabel.text="100";
        });

        betMaxButton.on("click",()=>
        {
            betLabel.text=playerMoney;
        });
    }
    function Credit(Money:string)
    {
        let money=parseInt(Money,10);
        let bet=parseInt(betLabel.text,10);
        money-=bet;
        playerMoney=money.toString();
        creditLabel.text=playerMoney;
    }

    function Main():void
    {
        buildInterface();
        interfaceLogic();
    }
    
    
    
    
})();
class Food {
    constructor(foodS,lastFed,x){
        x = this.x
        this.BEDROOM = loadImage("images/Bed Room.png")
        this.GARDEN = loadImage("images/Garden.png")
        this.WASHROOM = loadImage("images/Wash Room.png")
        this.LIVINGROOM = loadImage("images/Living Room.png")
        this.VACCINATION = loadImage("images/Vaccination.jpg")
        this.VACCINATION_CHART = loadImage("images/dogVaccination.png")
        this.INJECTION = loadImage("images/Injection.png")
        this.LAZY = loadImage("images/Lazy.png")
        this.RUNNING = loadImage("images/running.png")
        this.RUNNINGOVER = loadImage("images/runningLeft.png")

        this.image = loadImage("Milk.png");
        this.foodS = foodS;        
        this.lastFed = lastFed; 
    }
    
    getFoodStock(){      
        return foodS;
    }
    updateFoodStock(x){
        
        if(x <= 0){
            x=0;
        }else{
            x=x-1;
        }
        foodS = x;
          
    }
    deductFood(){
        if(foodS > 0){
            foodS = foodS -1;
        }else{
            this.foodS = 0
        }
    }
    getFedtime(){
        return lastFed;
    }
    display(){ 
        var x=700,y=100; 
       
        if(foodS!=0){ 
            for(var i=0;i<foodS;i++){
                 if(i%10==0){ 
                    x=80; 
                    y=y+50; 
                } 
                image(this.image,x,y,50,50); 
                x=x+30;
            }
        }
    }
    bedroom(){background(this.BEDROOM)}
    garden(){background(this.GARDEN)}
    washroom(){background(this.WASHROOM)}
    livingroom(){background(this.LIVINGROOM)}
    vaccination(){background(this.VACCINATION)}
    vacci_chart(){background(this.VACCINATION_CHART)}
    injection(){background(this.INJECTION)}
    lazy(){background(this.LAZY)}
    running(){background(this.RUNNING)}
    runningover(){background(this.RUNNINGOVER)}
    
}

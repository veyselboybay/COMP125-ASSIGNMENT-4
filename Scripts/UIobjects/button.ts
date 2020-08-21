module UIobjects
{
    export class Button extends Core.GameObject
    {
        
        constructor(bitmap_asset:string,x:number=0,y:number=0,isCentered:boolean=false)
        {
            super(bitmap_asset,x,y,isCentered);
            this.IsCentered=isCentered;
            this.x=x;
            this.y=y;

            this.on("mouseover",this.m_mouseover);
            this.on("mouseout",this.m_mouseout);
        }

        private m_mouseover():void
        {
            this.alpha=0.7;
        }
        private m_mouseout():void
        {
            this.alpha=1.0;
        }
    }
}
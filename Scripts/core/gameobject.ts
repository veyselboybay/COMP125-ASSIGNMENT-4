module Core
{
    export class GameObject extends createjs.Bitmap
    {
        private m_isCentered:boolean;


        get IsCentered():boolean
        {
            return this.m_isCentered;
        }
        set IsCentered(value:boolean)
        {
            if(value)
            {
               this.m_recalculatesize();
            }
            else
            {
                this.regX=0.0;
                this.regY=0.0;
            }
            this.m_isCentered=value;
        }
        constructor(bitmap_asset:string,x:number=0,y:number=0,isCentered:boolean=false)
        {
            super(Config.Globals.AssetManifest.getResult(bitmap_asset));
            this.IsCentered=isCentered;
            this.x=x;
            this.y=y;

           
        }

        private m_recalculatesize():void
        {
            this.regX=this.getBounds().width*0.5;
            this.regY=this.getBounds().height*0.5;
        }

    }
}
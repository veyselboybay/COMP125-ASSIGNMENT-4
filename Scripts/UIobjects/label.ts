module UIobjects
{
    export class Label extends createjs.Text
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

        constructor(
            text:string="",
            font_size:string="20px",
            font_family:string="Consolas",
            font_color:string="#000000",
            x:number=0,y:number=0,isCentered:boolean=false)
        {
            super(text,font_size+" "+font_family,font_color);

            this.IsCentered=isCentered;
            if(isCentered)
            {
                this.regX=this.getMeasuredWidth()*0.5;
                this.regY=this.getMeasuredHeight()*0.5;
            }
            this.x=x;
            this.y=y;
        }

        private m_recalculatesize():void
        {
            this.regX=this.getMeasuredWidth()*0.5;
            this.regY=this.getMeasuredHeight()*0.5;
        }

        public setText(new_Text:string):void
        {
            this.text=new_Text;
            if(this.IsCentered)
            {
                this.m_recalculatesize();
            }

        }
    }
}